import React, { useRef, useEffect } from 'react';

export const GeometricFluidMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- OVERSCAN CONFIGURATION ---
    const overscanX = 200; 
    const overscanY = 200;
    
    // Mesh Configuration
    const cols = 14; 
    const rows = 10;
    
    // Calculate tile size based on the OVERSCANNED dimensions
    const totalWidth = width + (overscanX * 2);
    const totalHeight = height + (overscanY * 2);
    
    const tileWidth = totalWidth / cols;
    const tileHeight = totalHeight / rows;
    
    // Generate vertices with random offsets
    const vertices: {
        x: number, 
        y: number, 
        originX: number, 
        originY: number, 
        vx: number, 
        vy: number,
        phase: number 
    }[] = [];

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const xOffset = (Math.random() - 0.5) * tileWidth * 0.5;
        const yOffset = (Math.random() - 0.5) * tileHeight * 0.5;
        
        // Start drawing from negative coordinates (off-screen left/top)
        const startX = -overscanX + (j * tileWidth);
        const startY = -overscanY + (i * tileHeight);

        const x = startX + xOffset;
        const y = startY + yOffset;

        vertices.push({
          x: x,
          y: y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.01; 
      ctx.clearRect(0, 0, width, height);
      
      // Update Vertices
      for (let i = 0; i < vertices.length; i++) {
          const v = vertices[i];
          
          // Oscillate
          v.x = v.originX + Math.sin(time + v.phase) * 20; 
          v.y = v.originY + Math.cos(time + v.phase * 0.5) * 20;

          // Mouse Repulsion
          const dx = v.x - mouseX;
          const dy = v.y - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 400) { // Increased interaction radius
              const force = (400 - dist) / 400;
              v.x += dx * force * 0.08;
              v.y += dy * force * 0.08;
          }
      }
      
      // Draw Triangles
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const idx = i * (cols + 1) + j;
          
          drawPoly(ctx, vertices[idx], vertices[idx + 1], vertices[idx + (cols + 1)], time, width, height);
          drawPoly(ctx, vertices[idx + 1], vertices[idx + (cols + 1) + 1], vertices[idx + (cols + 1)], time, width, height);
        }
      }

      requestAnimationFrame(animate);
    };

    const drawPoly = (ctx: CanvasRenderingContext2D, p1: any, p2: any, p3: any, time: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();

      const cx = (p1.x + p2.x + p3.x) / 3;
      const cy = (p1.y + p2.y + p3.y) / 3;

      // Virtual light source moving in a figure-8 pattern for more dynamic shadows
      const lightX = w/2 + Math.sin(time * 0.7) * (w * 0.5);
      const lightY = h/2 + Math.cos(time * 0.3) * (h * 0.5);

      const dx = cx - lightX;
      const dy = cy - lightY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const maxDist = Math.sqrt(w*w + h*h);
      const brightness = Math.max(0, 1 - (dist / (maxDist * 0.7))); 
      
      // HSL mapping: Darker base, higher contrast highlights
      // Base lightness 3%, max 18%
      const l = 8 + (brightness * 15); 
      
      ctx.fillStyle = `hsl(220, 5%, ${l}%)`; 
      ctx.strokeStyle = `hsl(220, 5%, ${l + 4}%)`; 
      ctx.lineWidth = 1;
      
      ctx.fill();
      ctx.stroke();
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Ideally regenerate grid here, but simple resize is okay for prototype
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
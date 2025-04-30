
import { useEffect, useRef } from "react";
import "./Orb.css";

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  className?: string;
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  className = ""
}: OrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    function resizeCanvas() {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Variables for animation
    let time = 0;
    let hoverValue = forceHoverState ? 1 : 0;
    let rotation = 0;
    const rotationSpeed = 0.3;
    const colors = [
      `hsl(${(hue) % 360}, 80%, 70%)`,
      `hsl(${(hue + 30) % 360}, 80%, 60%)`,
      `hsl(${(hue + 60) % 360}, 70%, 50%)`
    ];

    // Animation functions
    function drawGlow(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      if (!canvas || !ctx) return;
      
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      // Center coordinates
      const centerX = width / 2;
      const centerY = height / 2;
      const minDimension = Math.min(width, height);
      const baseRadius = minDimension * 0.35;
      
      // Draw base orb
      drawGlow(ctx, centerX, centerY, baseRadius * 1.5, `hsla(${hue}, 80%, 50%, 0.1)`);
      
      // Inner circles with rotation
      time += 0.01;
      if (rotateOnHover && hoverValue > 0.5) {
        rotation += rotationSpeed * 0.01;
      }
      
      // Outer circle
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner patterns
      for (let i = 0; i < 3; i++) {
        const angle = time * (i + 1) * 0.5 + rotation;
        const distance = baseRadius * 0.6;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        drawGlow(ctx, x, y, baseRadius * 0.3, colors[i]);
      }
      
      // Effect from hover intensity
      const hoverEffect = hoverValue * hoverIntensity;
      if (hoverEffect > 0) {
        const pulseSize = baseRadius * (1 + 0.2 * Math.sin(time * 5) * hoverEffect);
        ctx.strokeStyle = `hsla(${(hue + 40) % 360}, 100%, 70%, ${0.3 * hoverEffect})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Handle mouse interactions
    let targetHoverValue = 0;
    
    function updateHoverEffect() {
      hoverValue += (targetHoverValue - hoverValue) * 0.1;
      requestAnimationFrame(updateHoverEffect);
    }
    
    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      if (distance < Math.min(rect.width, rect.height) * 0.4) {
        targetHoverValue = 1;
      } else {
        targetHoverValue = 0;
      }
    }
    
    function handleMouseLeave() {
      targetHoverValue = 0;
    }

    // Start animations
    animate();
    updateHoverEffect();
    
    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    if (forceHoverState) {
      targetHoverValue = 1;
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return (
    <div ref={containerRef} className={`orb-container ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}

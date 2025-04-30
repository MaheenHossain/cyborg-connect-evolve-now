
import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Using any to avoid typing issues with WebGL
    type PointerType = {
      id: number;
      texcoordX: number;
      texcoordY: number;
      prevTexcoordX: number;
      prevTexcoordY: number;
      deltaX: number;
      deltaY: number;
      down: boolean;
      moved: boolean;
      color: { r: number; g: number; b: number };
    };

    function createPointer(): PointerType {
      return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 }
      };
    }

    let pointers: PointerType[] = [createPointer()];
    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    // Use any type to avoid WebGL typing issues
    const gl = canvas.getContext('webgl', params) as any;
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    let cursorAnimationId: number;

    // Helper function to get proper resolution based on device pixel ratio
    function scaleByPixelRatio(input: number): number {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function resizeCanvas(): boolean {
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    // Generate a random color with HSV to RGB conversion
    function HSVtoRGB(h: number, s: number, v: number) {
      let r: number = 0, g: number = 0, b: number = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      
      return { r, g, b };
    }

    function generateColor() {
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    // Update pointer data for mouse movement
    function updatePointerMoveData(pointer: PointerType, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      
      const aspectRatio = canvas.width / canvas.height;
      let deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      let deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      
      if (aspectRatio < 1) deltaX *= aspectRatio;
      if (aspectRatio > 1) deltaY /= aspectRatio;
      
      pointer.deltaX = deltaX;
      pointer.deltaY = deltaY;
      pointer.moved = Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0;
    }

    // Update pointer data for mouse down
    function updatePointerDownData(pointer: PointerType, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    // Update pointer data for mouse up
    function updatePointerUpData(pointer: PointerType) {
      pointer.down = false;
    }

    // Simple animation loop - just for visual effect without full WebGL implementation
    function drawSimpleAnimation() {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simple gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height) / 2
      );
      
      gradient.addColorStop(0, `rgba(${BACK_COLOR.r * 255}, ${BACK_COLOR.g * 255}, ${BACK_COLOR.b * 255}, 0.05)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      cursorAnimationId = requestAnimationFrame(drawSimpleAnimation);
    }

    // Mouse event handlers
    window.addEventListener('mousedown', (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
    });

    window.addEventListener('mousemove', (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerMoveData(pointer, posX, posY);
    });

    window.addEventListener('mouseup', () => {
      updatePointerUpData(pointers[0]);
    });

    // Touch event handlers
    window.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      let pointer = pointers[0];
      
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    }, false);

    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      let pointer = pointers[0];
      
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY);
      }
    }, false);

    window.addEventListener('touchend', (e) => {
      const touches = e.changedTouches;
      let pointer = pointers[0];
      
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

    // Initial resize and animation start
    resizeCanvas();
    cursorAnimationId = requestAnimationFrame(drawSimpleAnimation);

    return () => {
      cancelAnimationFrame(cursorAnimationId);
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;

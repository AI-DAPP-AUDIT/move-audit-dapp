import { Box, Heading } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const hoverColors = [
  "#3a6880", 
  "#3a8070",
  "#803a70",
  "#807038",
];

const baseColor = "#1f1f1f";
const borderColor = "#777777";
const baseAlpha = 0.1;
const hoverAlpha = 0.8;
const hoverDistanceFactor = 2;

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    
    const gridSize = 40;
    const rows = Math.ceil(canvas.height / gridSize);
    const cols = Math.ceil(canvas.width / gridSize);
    const cells: Array<{
      x: number;
      y: number;
      hoverColor: string;
      currentAlpha: number;
      isHovered: boolean;
    }> = [];

  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
      
        const section = Math.floor((row * cols + col) / (rows * cols / hoverColors.length));
        const hoverColor = hoverColors[section % hoverColors.length];
        
        cells.push({
          x: col * gridSize,
          y: row * gridSize,
          hoverColor: hoverColor,
          currentAlpha: baseAlpha,
          isHovered: false
        });
      }
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      cells.forEach((cell) => {
        ctx.beginPath();
        ctx.rect(cell.x, cell.y, gridSize - 1, gridSize - 1);
        

        const color = cell.isHovered ? cell.hoverColor : baseColor;
        const alphaHex = Math.floor(cell.currentAlpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = color + alphaHex;
        ctx.fill();
        
        ctx.strokeStyle = borderColor;
        ctx.stroke();
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cells.forEach((cell) => {
        const dx = x - (cell.x + gridSize / 2);
        const dy = y - (cell.y + gridSize / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hoverRadius = gridSize * hoverDistanceFactor;

        if (distance < hoverRadius) {
          cell.isHovered = true;
          cell.currentAlpha = baseAlpha + (hoverAlpha - baseAlpha) * (1 - distance / hoverRadius);
        } else {
          cell.isHovered = false;
          cell.currentAlpha = baseAlpha;
        }
      });
    };
    
    const handleMouseLeave = () => {
      cells.forEach((cell) => {
        cell.isHovered = false;
        cell.currentAlpha = baseAlpha;
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      drawGrid();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Box
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#1a1a1a",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 1,
          fontFamily: "'Press Start 2P', monospace",
          cursor: "pointer",
        }}
        onClick={() => navigate("/product")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Heading
          size="9"
          style={{
            color: isHovering ? "var(--teal-7)" : "white",
            fontSize: "3.5rem",
            fontWeight: "bold",
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
            letterSpacing: "0.2em",
            fontFamily: "inherit",
            transition: "color 0.3s ease",
          }}
        >
          AUDIT YOUR
          <br />
          MOVE DAPP
        </Heading>
      </Box>
    </Box>
  );
}; 
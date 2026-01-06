
import React, { useRef, useEffect, useState } from 'react';
import { Brush, Eraser, Palette, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ 
  width = 600, 
  height = 400, 
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#EC4899', // Pink
    '#6B7280', // Gray
    '#000000', // Black
    '#FFFFFF'  // White
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-ai-friend.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drawing Tools */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-kids-blue/10 to-kids-purple/10 rounded-lg border border-kids-blue/20">
        {/* Brush/Eraser Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={!isEraser ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEraser(false)}
            className="flex items-center gap-2"
          >
            <Brush className="w-4 h-4" />
            Brush
          </Button>
          <Button
            variant={isEraser ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEraser(true)}
            className="flex items-center gap-2"
          >
            <Eraser className="w-4 h-4" />
            Eraser
          </Button>
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm w-6">{brushSize}</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setCurrentColor(color);
                  setIsEraser(false);
                }}
                className={cn(
                  "w-8 h-8 rounded border-2 transition-all",
                  currentColor === color && !isEraser
                    ? "border-gray-800 scale-110"
                    : "border-gray-300 hover:scale-105"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadDrawing}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          className="border-2 border-kids-blue/30 rounded-lg shadow-lg cursor-crosshair bg-white"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Drawing Tips */}
      <div className="text-center text-sm text-gray-600 bg-kids-yellow/10 p-3 rounded-lg">
        <p className="font-medium mb-1">🎨 Drawing Tips:</p>
        <p>Think about what your AI friend looks like! Will it be a robot, a friendly creature, or something completely new? Don't forget to give it a face and maybe some special features!</p>
      </div>
    </div>
  );
};

export default DrawingCanvas;

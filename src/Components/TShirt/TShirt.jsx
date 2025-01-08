import  { useState, useRef, useEffect } from "react";

const TShirtDesign = () => {
  const [logo, setLogo] = useState(null); 
  const [logoPosition, setLogoPosition] = useState({ x: 150, y: 200 }); 
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 }); 
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false); 
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); 
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 }); 
  const canvasRef = useRef(null); 
  const tshirtImageUrl = "https://i.ibb.co/Ydzvd1t/tshirt.webp";

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoImage = new Image();
      logoImage.src = URL.createObjectURL(file);
      logoImage.onload = () => {
        setLogo(logoImage);
      };
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const logoImage = new Image();
      logoImage.src = URL.createObjectURL(file);
      logoImage.onload = () => {
        setLogo(logoImage);
      };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - logoPosition.x,
      y: e.clientY - logoPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setLogoPosition({ x: newX, y: newY });
    } else if (isResizing) {
      const newWidth = logoSize.width + (e.clientX - resizeStart.x);
      const newHeight = logoSize.height + (e.clientY - resizeStart.y);
      setLogoSize({ width: newWidth, height: newHeight });
      setResizeStart({ x: e.clientX, y: e.clientY }); 
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e) => {
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tShirtImage = new Image();
    tShirtImage.crossOrigin = "Anonymous"; 
    tShirtImage.src = tshirtImageUrl;
    tShirtImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.drawImage(tShirtImage, 0, 0, canvas.width, canvas.height);
    };

    if (logo) {
      ctx.drawImage(
        logo,
        logoPosition.x,
        logoPosition.y,
        logoSize.width,
        logoSize.height
      ); 
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    const tShirtImage = new Image();
    tShirtImage.crossOrigin = "Anonymous"; 
    tShirtImage.src = tshirtImageUrl;
    tShirtImage.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.drawImage(tShirtImage, 0, 0, canvas.width, canvas.height); 
      if (logo) {
        ctx.drawImage(
          logo,
          logoPosition.x,
          logoPosition.y,
          logoSize.width,
          logoSize.height
        ); 
      }

      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "tshirt-design.png"; 
        link.click(); 
      }, "image/png");
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [logo, logoPosition, logoSize]); 

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={500}
          className="border rounded-lg bg-white shadow"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></canvas>

        {logo && (
          <>
            <div
              style={{
                position: "absolute",
                top: logoPosition.y,
                left: logoPosition.x,
                width: logoSize.width,
                height: logoSize.height,
                cursor: "move",
                border: "2px solid blue", 
              }}
              onMouseDown={handleMouseDown}
              onDragStart={(e) => e.preventDefault()} 
            >
              <img
                src={logo.src}
                alt="logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: logoPosition.y + logoSize.height - 10,
                left: logoPosition.x + logoSize.width - 10,
                width: "20px",
                height: "20px",
                backgroundColor: "blue",
                cursor: "se-resize",
              }}
              onMouseDown={handleResizeMouseDown}
            />
          </>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Drag and drop your logo image or use the file input below
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="mt-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-600"
      >
        Download T-shirt Design
      </button>
    </div>
  );
};

export default TShirtDesign;

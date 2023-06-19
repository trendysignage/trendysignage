import { useEffect, useRef } from "react";

const  ImgDialog = ({ imageUrl, x, y, width, height }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
  
      img.onload = () => {
        // set the canvas dimensions to match the cropped area
        canvas.width = width;
        canvas.height = height;
  
        // draw the cropped area of the image onto the canvas
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      };
  
      img.src = imageUrl;
    }, [imageUrl, x, y, width, height]);
  
    return <canvas ref={canvasRef} />;
  }
  export default ImgDialog
import { ImageProps } from "@/types";
import Image from "next/legacy/image";
import React, { useState } from "react";

const ImageZoom = ({ src, alt, width, height }: ImageProps) => {
  const [zoomProps, setZoomProps] = useState({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.currentTarget;
    const pointer = {
      x: (event.nativeEvent.offsetX * 100) / target.offsetWidth,
      y: (event.nativeEvent.offsetY * 100) / target.offsetHeight,
    };

    setZoomProps({
      display: "block",
      zoomX: `${pointer.x}%`,
      zoomY: `${pointer.y}%`,
    });
  };

  const handleMouseOut = () => {
    setZoomProps({
      display: "none",
      zoomX: "0%",
      zoomY: "0%",
    });
  };

  return (
    <div
      className={`relative w-[${width}px] h-[${height}px]`}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className="object-cover object-top"
      />
      <div
        className="absolute inset-0 bg-black"
        style={{
          display: zoomProps.display,
          backgroundImage: `url(${src})`,
          backgroundSize: "200%",
          backgroundPosition: `${zoomProps.zoomX} ${zoomProps.zoomY}`,
          backgroundRepeat: "no-repeat",
          zIndex: 10,
        }}
      ></div>
    </div>
  );
};

export default ImageZoom;

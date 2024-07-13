"use client";
import React, { useState } from "react";
import Image from "next/image";

const VideoSection: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-full h-96 group overflow-hidden">
      {clicked ? (
        <iframe
          src="https://www.youtube.com/embed/_9VUPq3SxOc?enablejsapi=1"
          frameBorder="0"
          allowFullScreen
          className="w-full h-96"
          loading="lazy"
        />
      ) : (
        <div
          onClick={() => setClicked(true)}
          className="cursor-pointer relative"
        >
          <Image
            src="/image/L01-video.webp"
            alt="Video Thumbnail"
            width={500}
            height={300}
            className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/icon/play-circle.svg"
              height={100}
              width={100}
              alt="Play Icon"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;

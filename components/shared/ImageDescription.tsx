import Image from "next/legacy/image";

const ImageDescription = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/image/L01-slider-01.webp"
        width={1200}
        height={1200}
        alt="media01"
        className="object-fill h-screen w-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <div className="text-base bg-opacity-70 p-2 text-white font-normal">
          EXTRA -10% OFF WITH CODE: HOOKER001
        </div>
        <div className="text-6xl uppercase bg-opacity-70 p-2 text-white font-semibold">
          Limited Edition For Home Interior Design
        </div>
      </div>
    </div>
  );
};

export default ImageDescription;

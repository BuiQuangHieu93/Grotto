import Image from "next/image";
import TextCircleSVG from "./TextCircleSVG";

const AboutusSection = () => {
  return (
    <div className="grid grid-cols-4 w-full bg-[#13392c] py-20 px-4">
      <div className="col-span-2">
        <Image src="/image/L01-cms-01.webp" height={800} width={730} alt="" />
        <div className="text-4xl font-semibold text-white">
          Designed with the modern family in mind, designer Simmons considered
          every aspect.
        </div>
      </div>
      <div className="grid grid-rows-2">
        <div className="w-full flex-1 px-12 text-center flex-center mb-2">
          <TextCircleSVG />
        </div>
        <div className="-translate-y-9">
          <Image src="/image/L01-cms-02.webp" width={335} height={372} alt="" />
          <div className="text-[#cccccc] text-sm">
            A kitchen from Infinite Bespoke Interiors is perfectly designed to
            give you smart innovation with a warm human touch.
          </div>
        </div>
      </div>
      <div>
        <Image src="/image/L01-cms-03.webp" height={372} width={335} alt="" />
        <div className="text-[#cccccc] text-sm">
          A kitchen from Infinite Bespoke Interiors is perfectly designed to
          give you smart innovation with a warm human touch.
        </div>
      </div>
    </div>
  );
};

export default AboutusSection;

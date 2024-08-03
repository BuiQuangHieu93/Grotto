import Image from "next/image";
import TextCircleSVG from "./TextCircleSVG";

const AboutusSection = () => {
  return (
    <div className="grid grid-cols-4 w-full bg-[#13392c] py-20 px-4 gap-4">
      <div className="col-span-2 flex flex-col overflow-hidden">
        <div className="relative flex-grow overflow-hidden w-full h-[200px]">
          <Image
            src="/image/L01-cms-01.webp"
            layout="fill"
            style={{ objectFit: "cover" }}
            alt=""
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="mt-4 text-4xl font-semibold text-white">
          Designed with the modern family in mind, designer Simmons considered
          every aspect.
        </div>
      </div>
      <div className="grid grid-rows-2 gap-4">
        <div className="w-full flex justify-center items-center mb-2 -translate-y-7">
          <TextCircleSVG />
        </div>
        <div className="-translate-y-[59px]">
          <div className="flex-grow overflow-hidden">
            <div className="overflow-hidden">
              <Image
                src="/image/L01-cms-02.webp"
                width={500}
                height={400}
                alt=""
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="mt-4 text-[#cccccc] text-sm">
              A kitchen from Infinite Bespoke Interiors is perfectly designed to
              give you smart innovation with a warm human touch.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden grid-rows-2">
        <div>
          <div className="flex-grow overflow-hidden">
            <Image
              src="/image/L01-cms-03.webp"
              height={500}
              width={500}
              alt=""
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="mt-4 text-[#cccccc] text-sm">
            A kitchen from Infinite Bespoke Interiors is perfectly designed to
            give you smart innovation with a warm human touch.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutusSection;

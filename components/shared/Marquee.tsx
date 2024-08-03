import Image from "next/legacy/image";
import Marquee from "react-fast-marquee";

const MarqueeC = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#a6946b] text-white text-sm">
      <Marquee>
        <Image
          src="/icon/thunderstorms.svg"
          height={50}
          width={50}
          alt="thunderstorm"
          className="text-white"
        />
        <div className="p-2 pr-8">
          GET A $50 GIFT CARD ON A PURCHASE OF $1000
        </div>
        <Image
          src="/icon/thunderstorms.svg"
          height={50}
          width={50}
          alt="thunderstorm"
          className="text-white"
        />
        <div className="p-2 pr-8">
          HURRY UP OFFER RUNNING FOR A LIMITED TIME ONLY
        </div>
        <Image
          src="/icon/thunderstorms.svg"
          height={50}
          width={50}
          alt="thunderstorm"
          className="text-white"
        />
        <div className="p-2 pr-8">
          GET FREE, DISCREET SHIPPING ON ORDERS $60+ IN THE U.S.
        </div>
        <Image
          src="/icon/thunderstorms.svg"
          height={50}
          width={50}
          alt="thunderstorm"
          className="text-white"
        />
        <div className="p-2 pr-8">
          HURRY UP OFFER RUNNING FOR A LIMITED TIME ONLY
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeC;

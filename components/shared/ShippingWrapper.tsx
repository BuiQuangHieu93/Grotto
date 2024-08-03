import Image from "next/legacy/image";

const ShippingWrapper = () => {
  return (
    <div className="bg-[#13392c] w-full flex justify-between p-4 text-white pt-20 pb-20">
      <div className="p-4 text-4xl w-[45%] font-semibold h-[472px] relative">
        <div className="sticky h-[160px] top-0">
          Providing A Wide Range Of Architectural And Interior Design Services.
          Sustainable Trends You'll Love Forever
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 w-[45%] gap-6">
        <div className="group">
          <Image
            width={50}
            height={50}
            src="/icon/services-01.webp"
            alt="services01"
            className="object-contain pb-6 transition-transform duration-500 group-hover:scale-x-[-1]"
          />
          <div className="text-lg font-semibold group-hover:text-[#a6946b] duration-500">
            Free Shipping & Return
          </div>
          <div className="text-sm text-[#cccccc] pt-2">
            Shop with confidence and have your favorite Furniture delivered
            right to your doorstep without any additional cost.
          </div>
        </div>
        <div className="group">
          <Image
            width={50}
            height={50}
            src="/icon/services-02.webp"
            alt="services02"
            className="object-contain pb-6 transition-transform duration-500 group-hover:scale-x-[-1]"
          />
          <div className="text-lg font-semibold group-hover:text-[#a6946b] duration-500">
            Money Back Guarantee
          </div>
          <div className="text-sm text-[#cccccc] pt-2">
            We guarantee to rectify any unsatisfactory experience you may have
            with your purchase. No queries posed.
          </div>
        </div>
        <div className="group">
          <Image
            width={50}
            height={50}
            src="/icon/services-03.webp"
            alt="services03"
            className="object-contain pb-6 transition-transform duration-500 group-hover:scale-x-[-1]"
          />
          <div className="text-lg font-semibold group-hover:text-[#a6946b] duration-500">
            24/7 support
          </div>
          <div className="text-sm text-[#cccccc] pt-2">
            Need help with your electronics? Get in touch with us anytime,
            anywhere, and let's get your tech sorted.
          </div>
        </div>
        <div className="group">
          <Image
            width={50}
            height={50}
            src="/icon/services-04.webp"
            alt="services04"
            className="object-contain pb-6 transition-transform duration-500 group-hover:scale-x-[-1]"
          />
          <div className="text-lg font-semibold group-hover:text-[#a6946b] duration-500">
            Flexible Payment
          </div>
          <div className="text-sm text-[#cccccc] pt-2">
            Don't miss out on our amazing deals with regular sales on our
            top-of-the-line Home Decor Furniture.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingWrapper;

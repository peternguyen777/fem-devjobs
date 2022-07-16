import React from "react";
import Image from "next/image";
import bgHeaderMobile from "../public/assets/mobile/bg-pattern-header.svg";
import bgHeaderTablet from "../public/assets/tablet/bg-pattern-header.svg";
import bgHeaderDesktop from "../public/assets/desktop/bg-pattern-header.svg";

const Banner = () => {
  return (
    <header className='relative'>
      <div className='absolute h-[136px] w-full sm:hidden'>
        <Image
          src={bgHeaderMobile}
          alt='Header background image'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
      <div className='absolute left-0 hidden h-[160px] w-[768px] sm:inline-flex md:w-full lg:hidden'>
        <Image src={bgHeaderTablet} alt='Header background image' priority />
        <div className='hidden grow border-l border-violet bg-violet md:inline-flex' />
      </div>
      <div className='absolute left-0 hidden h-[160px] w-[1440px] lg:inline-flex lg:w-full '>
        <Image src={bgHeaderDesktop} alt='Header background image' priority />
        <div className='hidden grow border-l border-violet bg-violet lg:inline-flex' />
      </div>
    </header>
  );
};

export default Banner;

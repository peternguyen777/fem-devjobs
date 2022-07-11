import React from "react";
import Image from "next/image";
import bgHeaderMobile from "../public/assets/mobile/bg-pattern-header.svg";
import bgHeaderTablet from "../public/assets/tablet/bg-pattern-header.svg";
import bgHeaderDesktop from "../public/assets/desktop/bg-pattern-header.svg";

const Header = () => {
  return (
    <header>
      <div className='absolute top-0 h-[136px] w-full sm:hidden'>
        <Image
          src={bgHeaderMobile}
          alt='Header background image'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='absolute left-0 hidden h-[160px] w-[768px] sm:inline-flex md:w-full lg:hidden'>
        <Image src={bgHeaderTablet} alt='Header background image' />
        <div className='hidden grow border-l border-[#5964E0] bg-[#5964E0] md:inline-flex' />
      </div>
      <div className='absolute left-0 hidden h-[160px] w-[1440px] lg:inline-flex lg:w-full '>
        <Image src={bgHeaderDesktop} alt='Header background image' />
        <div className='hidden grow border-l border-[#5964E0] bg-[#5964E0] lg:inline-flex' />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";
import logo from "../public/assets/desktop/logo.svg";
import iconSun from "../public/assets/desktop/icon-sun.svg";
import iconMoon from "../public/assets/desktop/icon-moon.svg";
import { useRouter } from "next/router";
import ToggleLightDark from "./UI/ToggleLightDark";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <nav className='relative mx-auto max-w-[1190px] px-6 pt-8 sm:px-10 sm:pt-11'>
      <div className='flex items-center justify-between '>
        <Image
          src={logo}
          alt='logo'
          className='cursor-pointer'
          onClick={handleClick}
        />

        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <Image src={iconSun} alt='light mode' />
          </div>
          <ToggleLightDark />
          <div className='flex items-center'>
            <Image src={iconMoon} alt='dark mode' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

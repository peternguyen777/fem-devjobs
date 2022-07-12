import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/assets/desktop/logo.svg";
import iconSun from "../public/assets/desktop/icon-sun.svg";
import iconMoon from "../public/assets/desktop/icon-moon.svg";
import ToggleLightDark from "./UI/ToggleLightDark";
import iconSearch from "../public/assets/desktop/icon-search.svg";
import iconFilter from "../public/assets/mobile/icon-filter.svg";

const Header = (props) => {
  const [filterTitle, setFilterTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(filterTitle);
  };

  return (
    <nav className='relative mx-auto max-w-[1190px] px-6 pt-8 sm:px-10 sm:pt-11'>
      <div className='flex items-center justify-between '>
        <Image src={logo} alt='logo' />
        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <Image src={iconSun} alt='light mode' />
          </div>
          <ToggleLightDark
            enabled={props.enabled}
            setEnabled={props.setEnabled}
          />
          <div className='flex items-center'>
            <Image src={iconMoon} alt='dark mode' />
          </div>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className='mt-8 flex h-20 items-center justify-between rounded-md bg-white pl-6 pr-4 dark:bg-verydarkblue sm:mt-11'>
          <input
            type='text'
            id='title'
            placeholder='Filter by title...'
            className='w-full grow font-kumbhsans text-[16px] font-normal leading-[20px] text-darkgray placeholder:text-darkgray focus:outline-none dark:bg-verydarkblue dark:text-white'
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <div className='ml-4 flex flex-none items-center space-x-4'>
            <Image src={iconFilter} alt='' className='cursor-pointer' />
            <button className='flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-[5px] bg-violet hover:bg-lightviolet'>
              <Image src={iconSearch} alt='' />
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
};

export default Header;

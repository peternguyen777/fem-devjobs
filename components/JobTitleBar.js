import React from "react";
import ButtonSecondary from "./UI/ButtonSecondary";

const JobTitleBar = (props) => {
  const imagePath = props.data.logo;
  const newImagePath = "/" + imagePath.substring(2);

  return (
    <div className='relative mx-auto mt-14 max-w-[1190px] px-6 sm:px-10 '>
      <div
        className='absolute left-0 right-0 mx-auto flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-[15px] md:mx-0 md:ml-10 md:h-[140px] md:w-[140px] md:translate-y-0 md:rounded-[6px] md:rounded-tr-none md:rounded-br-none'
        style={{ backgroundColor: `${props.data.logoBackground}` }}
      >
        <img
          src={newImagePath}
          alt='company logo'
          className='md:h-[80px] md:w-[80px] md:object-contain'
        />
      </div>
      <div className='flex flex-col items-center rounded-md bg-white pb-8 dark:bg-verydarkblue md:ml-[140px] md:h-[140px] md:flex-row md:justify-between md:rounded-tl-none md:rounded-bl-none md:px-10 md:pb-0'>
        <div className='flex flex-col items-center md:items-start'>
          <h3 className='mt-12 md:mt-0'>{props.data.company}</h3>
          <p className='mt-2 mb-6 leading-[20px] text-darkgray md:mb-0'>
            {props.data.website}
          </p>
        </div>
        <ButtonSecondary href={props.data.website}>
          Company Site
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default JobTitleBar;
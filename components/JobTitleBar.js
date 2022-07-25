import React from "react";
import ButtonSecondary from "./UI/ButtonSecondary";
import { urlFor } from "../sanity";

const JobTitleBar = (props) => {
  return (
    <div className='relative mx-auto mt-14 max-w-[810px] px-6 md:px-10 '>
      <div
        className='absolute left-0 right-0 mx-auto flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-[15px] md:mx-0 md:ml-10 md:h-[140px] md:w-[140px] md:translate-y-0 md:rounded-[6px] md:rounded-tr-none md:rounded-br-none'
        style={{ backgroundColor: `${props.data.logoBackground}` }}
      >
        {props.data.logo && (
          <img
            src={urlFor(props.data.logo).url()}
            alt='company logo'
            className='md:h-[80px] md:w-[80px] md:object-contain'
          />
        )}
      </div>
      <div className='flex flex-col items-center rounded-md bg-white pb-8 dark:bg-verydarkblue md:ml-[140px] md:h-[140px] md:flex-row md:justify-between md:rounded-tl-none md:rounded-bl-none md:pl-10 md:pr-12 md:pb-0'>
        <div className='flex flex-col items-center md:items-start'>
          <h3 className='mt-12 md:hidden'>{props.data.company}</h3>
          <h2 className='hidden md:inline-block'>{props.data.company}</h2>
          <p className='mt-2 mb-6 leading-[20px] md:mb-0'>
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

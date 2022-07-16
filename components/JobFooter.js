import React from "react";
import ButtonPrimary from "./UI/ButtonPrimary";

const JobFooter = (props) => {
  return (
    <footer className='flex h-[96px] w-full flex-none flex-col justify-center bg-white px-6 py-6 dark:bg-verydarkblue sm:flex-row md:px-10'>
      <div className='flex w-full max-w-[730px] flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='hidden sm:inline-block'>
          <h3 className='dark:text-white'>{props.data.position}</h3>
          <p className='mt-2 leading-[20px] text-darkgray'>
            {props.data.company}
          </p>
        </div>
        <ButtonPrimary href={props.data.apply}>Apply Now</ButtonPrimary>
      </div>
    </footer>
  );
};

export default JobFooter;

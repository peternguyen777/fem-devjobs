import React from "react";
import Link from "next/link";

const Card = (props) => {
  const imagePath = props.jobData.logo;
  const newImagePath = "/" + imagePath.substring(2);

  return (
    <div className='relative flex flex-col justify-between rounded-md bg-white  px-8 pb-8 pt-12 dark:bg-verydarkblue'>
      <div
        className='absolute top-0 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-[15px]'
        style={{ backgroundColor: `${props.jobData.logoBackground}` }}
      >
        <img src={newImagePath} alt='company logo' />
      </div>
      <div>
        <div className='flex items-center space-x-3'>
          <p className='leading-[20px] text-darkgray'>
            {props.jobData.postedAt}
          </p>
          <div className='h-1 w-1 rounded-full bg-darkgray'></div>
          <p className='leading-[20px] text-darkgray'>
            {props.jobData.contract}
          </p>
        </div>
        <Link href={`/jobs/${props.jobData.id}`}>
          <h3 className='mt-3 cursor-pointer leading-[26px] hover:text-darkgray dark:text-white'>
            {props.jobData.position}
          </h3>
        </Link>
        <p className='mt-3 leading-[20px] text-darkgray '>
          {props.jobData.company}
        </p>
      </div>
      <h4 className='mt-10 text-violet'>{props.jobData.location}</h4>
    </div>
  );
};

export default Card;

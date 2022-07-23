import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { urlFor } from "../../sanity";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = (props) => {
  const timeAgo = dayjs(props.jobData.postedAt).fromNow();

  return (
    <div className='relative flex flex-col justify-between rounded-md bg-white  px-8 pb-8 pt-12 dark:bg-verydarkblue'>
      <div
        className='absolute top-0 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-[15px]'
        style={{ backgroundColor: `${props.jobData.logoBackground}` }}
      >
        <img
          src={urlFor(props.jobData?.logo).url()}
          alt='company logo'
          className='max-h-[40px] max-w-[40px]'
        />
      </div>
      <div>
        <div className='flex items-center space-x-3'>
          <p className='leading-[20px]'>{timeAgo}</p>
          <div className='h-1 w-1 rounded-full bg-darkgray'></div>
          <p className='leading-[20px]'>{props.jobData.contract}</p>
        </div>
        <Link href={`jobs/${props.jobData.id}`}>
          <h3 className='mt-3 cursor-pointer leading-[26px] hover:text-darkgray '>
            {props.jobData.position}
          </h3>
        </Link>
        <p className='mt-3 leading-[20px]'>{props.jobData.company}</p>
      </div>
      <h4 className='mt-10'>{props.jobData.location}</h4>
    </div>
  );
};

export default Card;

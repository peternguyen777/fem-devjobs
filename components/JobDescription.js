import React from "react";
import ButtonPrimary from "./UI/ButtonPrimary";
import dayjs from "dayjs";

const JobDescription = (props) => {
  const timePosted = dayjs(props.data.postedAt).format("ddd DD MMMM YYYY");

  return (
    <main className='mx-auto mt-6 mb-16 max-w-[810px] px-6 md:mb-[52px] md:px-10 lg:mb-20'>
      <div className='rounded-md bg-white p-6 dark:bg-verydarkblue md:p-12'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='mb-[50px] sm:mb-0'>
            <div className='flex items-center space-x-3'>
              <p className='leading-[20px]'>{`Posted ${timePosted}`}</p>
              <div className='h-1 w-1 rounded-full bg-darkgray'></div>
              <p className='leading-[20px]'>{props.data.contract}</p>
            </div>

            <h3 className='mt-2 cursor-pointer md:hidden'>
              {props.data.position}
            </h3>
            <h1 className='mt-2 hidden cursor-pointer md:inline-block '>
              {props.data.position}
            </h1>
            <h4 className='mt-2'>{props.data.location}</h4>
          </div>
          <ButtonPrimary
            href={`mailto:${props.data.apply}?subject=DEVJOBS%20application%20-%20${props.data.position}`}
          >
            Apply Now
          </ButtonPrimary>
        </div>
        <p className='mt-8 md:mt-10'>{props.data.description}</p>
        <h3 className='mt-[66px] md:mt-10'>Requirements</h3>
        <p className='mt-6 mb-8 md:mb-6'>{props.data.requirements.content}</p>
        <ul className='list-outside list-disc space-y-2 pl-4'>
          {props.data.requirements.items.map((item, i) => (
            <li className='pl-5' key={i}>
              {item}
            </li>
          ))}
        </ul>
        <h3 className='mt-10'>What you will do</h3>
        <p className='mt-6 '>{props.data.role.content}</p>
        <ul className='mt-8 list-outside list-disc space-y-2 pl-4 md:mt-6'>
          {props.data.role.items.map((item, i) => (
            <li className='pl-5' key={i}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default JobDescription;

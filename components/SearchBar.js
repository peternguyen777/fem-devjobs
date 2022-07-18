import React from "react";

import Checkbox from "./UI/Checkbox";

const SearchBar = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Filter title:", props.title);
    console.log("Filter location:", props.location);
    console.log("Full time only:", props.fulltime);
  };

  const handleOpen = () => {
    props.setShowModal(true);
  };

  return (
    <form
      onSubmit={submitHandler}
      className='relative mx-auto mt-8 max-w-[1190px] px-6 sm:mt-11 sm:px-10'
    >
      <div className='flex h-20 items-center rounded-md bg-white dark:bg-verydarkblue'>
        <div className='grid h-full w-full grow md:grid-cols-2'>
          <div className='flex w-full grow items-center pl-6 pr-4 sm:border-darkgray sm:border-opacity-20 md:border-r'>
            <svg
              id='icon search'
              xmlns='http://www.w3.org/2000/svg'
              className='mr-4 hidden h-6 w-[30px] fill-current text-violet md:inline-block'
            >
              <path
                d='M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z'
                fillRule='nonzero'
              />
            </svg>
            <input
              type='text'
              id='title'
              placeholder='Filter by title...'
              className='w-full ring-0 focus:ring-0 lg:hidden'
              value={props.title}
              onChange={(e) => {
                props.setTitle(e.target.value);
              }}
            />
            <input
              type='text'
              id='title'
              placeholder='Filter by title, companies, expertise...'
              className='hidden w-full ring-0 focus:ring-0 lg:inline-block'
              value={props.title}
              onChange={(e) => {
                props.setTitle(e.target.value);
              }}
            />
          </div>
          <div className='hidden w-full grow items-center border-r border-darkgray border-opacity-20 pr-4 md:flex'>
            <svg
              id='icon location'
              xmlns='http://www.w3.org/2000/svg'
              className='mx-4 hidden h-6 w-6 fill-current text-violet sm:inline-block'
            >
              <path
                d='M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z'
                fillRule='nonzero'
              />
            </svg>
            <input
              type='text'
              id='location'
              placeholder='Filter by location...'
              className='w-full ring-0 focus:ring-0'
              value={props.location}
              onChange={(e) => {
                props.setLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className='flex h-full flex-none items-center pl-4 pr-4'>
          <div className='mr-6 cursor-pointer md:hidden' onClick={handleOpen}>
            <svg
              id='icon filter'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 fill-current text-darkgray dark:text-white'
            >
              <path
                d='M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z'
                fillRule='nonzero'
              />
            </svg>
          </div>
          <div className='mr-7 hidden items-center md:flex'>
            <Checkbox checked={props.fulltime} setChecked={props.setFulltime} />
            <h5 className='ml-4 select-none dark:text-white'>
              Full Time <span className='hidden lg:inline-flex'>Only</span>
            </h5>
          </div>

          <button className='flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-[5px] bg-violet hover:bg-lightviolet md:w-auto'>
            <svg
              id='icon search'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 fill-current text-white md:hidden'
            >
              <path
                d='M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z'
                fillRule='nonzero'
              />
            </svg>

            <h5 className='hidden px-9 text-white md:flex'>Search</h5>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

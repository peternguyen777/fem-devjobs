import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Checkbox from "./UI/Checkbox";
import { useTheme } from "next-themes";

export default function SearchModal(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Filter title:", props.title);
    console.log("Filter location:", props.location);
    console.log("Full time only:", props.fulltime);
    props.setShowModal(false);
  };

  const handleClose = () => {
    props.setShowModal(false);
  };

  const modalContent = props.showModal ? (
    <div className={`${theme === "dark" && `dark`}`}>
      <div className=' fixed top-1/2 left-0 z-30 mx-auto w-[calc(100%-48px)] -translate-y-1/2 translate-x-6 rounded-lg bg-white dark:bg-midnight sm:w-[calc(100%-80px)] sm:translate-x-10 md:hidden'>
        <div className='flex h-[72px] items-center border-b border-darkgray border-opacity-20 px-6'>
          <svg
            id='icon location'
            xmlns='http://www.w3.org/2000/svg'
            className='mr-4 inline-block h-6 w-6 fill-current text-violet '
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
            className='w-full ring-0 focus:ring-0 '
            value={props.location}
            onChange={(e) => {
              props.setLocation(e.target.value);
            }}
          />
        </div>
        <div className='mt-6 flex items-center px-6'>
          <Checkbox checked={props.fulltime} setChecked={props.setFulltime} />
          <h5 className='ml-4 select-none dark:text-white'>Full Time Only</h5>
        </div>
        <div className='mt-6 px-6 pb-6'>
          <button
            className='h-[48px] w-full rounded-lg bg-violet transition duration-100 hover:opacity-50'
            onClick={submitHandler}
          >
            <h3 className='py-[12px] text-base text-white'>Search</h3>
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  ) : null;

  const underlayContent = props.showModal ? (
    <div
      className='fixed top-0 z-20 h-full w-full bg-black opacity-50 md:hidden'
      onClick={handleClose}
    ></div>
  ) : null;

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          // document.getElementById("underlay-root")
          document.getElementById("modal-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}

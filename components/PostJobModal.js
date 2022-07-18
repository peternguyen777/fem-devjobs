import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Tab1 from "./PostJobForm/Tab1";
import Tab2 from "./PostJobForm/Tab2";
import Tab3 from "./PostJobForm/Tab3";
import Tab4 from "./PostJobForm/Tab4";
import Tab5 from "./PostJobForm/Tab5";
import Tab6 from "./PostJobForm/Tab6";
import Tab7 from "./PostJobForm/Tab7";
import FormDots from "./UI/FormDots";

export default function PostJobModal(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentTab(0);
    props.setShowModal(false);
  };

  const handleClose = () => {
    setCurrentTab(0);
    props.setShowModal(false);
  };

  const modalContent = props.showModal ? (
    <div className='fixed top-1/2 left-0 right-0 z-30 mx-6 flex min-h-[619px] w-[calc(100%-48px)] -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-8 dark:bg-midnight sm:mx-10 sm:w-[calc(100%-80px)] md:mx-auto md:w-[688px]'>
      <form action='' id='postJob'>
        <h3 className='dark:text-white'>Post a Job</h3>

        <div className={`${currentTab !== 0 && `hidden`}`}>
          <Tab1 />
        </div>

        <div className={`${currentTab !== 1 && `hidden`}`}>
          <Tab2 />
        </div>

        <div className={`${currentTab !== 2 && `hidden`}`}>
          <Tab3 />
        </div>

        <div className={`${currentTab !== 3 && `hidden`}`}>
          <Tab4 />
        </div>

        <div className={`${currentTab !== 4 && `hidden`}`}>
          <Tab5 />
        </div>

        <div className={`${currentTab !== 5 && `hidden`}`}>
          <Tab6 />
        </div>

        <div className={`${currentTab !== 6 && `hidden`}`}>
          <Tab7 />
        </div>
      </form>

      {/* BUTTONS */}
      {currentTab !== 6 ? (
        <div>
          <FormDots current={currentTab} />
          <div className='flex justify-end space-x-4'>
            <button
              className={`h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50 ${
                currentTab === 0 && `hidden`
              }`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(currentTab - 1);
              }}
            >
              <h5 className='py-[12px] leading-[24px] text-white'>Back</h5>
            </button>
            <button
              className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(currentTab + 1);
              }}
            >
              <h5 className='py-[12px] leading-[24px] text-white'>Next</h5>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <FormDots current={currentTab} />
          <div className='flex justify-end space-x-4'>
            <button
              className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(currentTab - 1);
              }}
            >
              <h5 className='py-[12px] leading-[24px] text-white'>Back</h5>
            </button>
            <button
              type='submit'
              form='postJob'
              className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
              onClick={submitHandler}
            >
              <h5 className='py-[12px] leading-[24px] text-white'>Post Job</h5>
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;

  const underlayContent = props.showModal ? (
    <div
      className='fixed top-0 z-20 h-full w-full bg-black opacity-50'
      onClick={handleClose}
    ></div>
  ) : null;

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("postjobmodal-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("postjobmodal-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}

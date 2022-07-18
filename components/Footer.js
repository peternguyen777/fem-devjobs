import React from "react";

const Footer = (props) => {
  const handleOpen = () => {
    props.setShowModal(true);
  };

  return (
    <footer className='flex h-[96px] w-full flex-none flex-col justify-center bg-white px-6 py-6 dark:bg-verydarkblue sm:flex-row sm:px-0'>
      <div className='flex w-full max-w-[1190px] flex-col sm:flex-row sm:items-center sm:justify-between sm:px-10'>
        <div className='hidden sm:inline-block'>
          <h3 className='dark:text-white'>Employers</h3>
          <p className='mt-2 leading-[20px] text-darkgray'>
            Looking for world-class tech talent?
          </p>
        </div>
        <button
          className='flex h-12 cursor-pointer items-center justify-center rounded-[5px] bg-violet hover:bg-lightviolet'
          onClick={handleOpen}
        >
          <h5 className='px-9 text-white md:flex'>Post a Job</h5>
        </button>
      </div>
    </footer>
  );
};

export default Footer;

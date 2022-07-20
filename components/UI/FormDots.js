import React from "react";

const FormDots = (props) => {
  return (
    <div className='mb-8 flex justify-center space-x-2 '>
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 0 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(0);
        }}
      />
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 1 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(1);
        }}
      />{" "}
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 2 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(2);
        }}
      />{" "}
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 3 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(3);
        }}
      />{" "}
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 4 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(4);
        }}
      />
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 5 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(5);
        }}
      />
      <div
        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-500 ease-in-out ${
          props.current === 6 ? `bg-violet` : `bg-gray`
        }`}
        onClick={() => {
          props.setCurrentTab(6);
        }}
      />
    </div>
  );
};

export default FormDots;

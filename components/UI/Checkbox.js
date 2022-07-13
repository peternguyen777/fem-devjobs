import React from "react";

const Checkbox = (props) => {
  const handleChange = () => {
    if (props.checked === false) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    props.setChecked(!props.checked);
  };

  return (
    <div
      className={`flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[3px] duration-75 ${
        props.checked ? `bg-violet` : `bg-darkgray opacity-10 dark:bg-white`
      }`}
      onClick={handleChange}
    >
      <svg
        width='15'
        height='12'
        xmlns='http://www.w3.org/2000/svg'
        className={`${!props.checked && `hidden`}`}
      >
        <path
          d='M1 6.57l3.572 3.572L13.714 1'
          stroke='#FFF'
          strokeWidth='2'
          fill='none'
          fillRule='evenodd'
        />
      </svg>
    </div>
  );
};

export default Checkbox;

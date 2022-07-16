import React from "react";
import Link from "next/link";

const ButtonSecondary = (props) => {
  return (
    <Link href={props.href}>
      <button className='h-12 rounded-[5px] bg-[#EEEFFC] px-5 hover:bg-[#C4C9F4] dark:bg-[#303641] dark:hover:bg-[#6a6e76]'>
        <h5 className='text-violet dark:text-white'>{props.children}</h5>
      </button>
    </Link>
  );
};

export default ButtonSecondary;

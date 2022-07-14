import React from "react";
import Link from "next/link";

const ButtonSecondary = (props) => {
  return (
    <Link href={props.href}>
      <button className='h-12 rounded-[5px] bg-[#EEEFFC] px-10 hover:bg-[#C4C9F4]'>
        <h5 className='text-violet'>{props.children}</h5>
      </button>
    </Link>
  );
};

export default ButtonSecondary;

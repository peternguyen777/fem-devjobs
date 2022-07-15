import React from "react";
import Link from "next/link";

const ButtonPrimary = (props) => {
  return (
    <Link href={props.href}>
      <button className='h-12 rounded-[5px] bg-violet px-7 hover:bg-lightviolet'>
        <h5 className='text-white'>{props.children}</h5>
      </button>
    </Link>
  );
};

export default ButtonPrimary;

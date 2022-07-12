import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const ToggleLightDark = (props) => {
  return (
    <Switch
      checked={props.enabled}
      onChange={props.setEnabled}
      className='relative inline-flex h-6 w-12 items-center rounded-full bg-white'
    >
      <span className='sr-only'>Enable notifications</span>
      <span
        aria-hidden='true'
        className={`${
          props.enabled ? "translate-x-[30px]" : "translate-x-[5px]"
        } inline-block h-[14px] w-[14px] transform rounded-full bg-violet transition duration-100 ease-in-out hover:bg-lightviolet`}
      />
    </Switch>
  );
};

export default ToggleLightDark;

import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";

const FormSuccess = () => {
  const containerLight = useRef(null);
  const containerDark = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: containerLight.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../../public/assets/animation/tick-light.json"),
    }).setSpeed(0.7);

    Lottie.loadAnimation({
      container: containerDark.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../../public/assets/animation/tick-dark.json"),
    }).setSpeed(0.7);
  }, []);

  return (
    <section className='flex flex-1 flex-col justify-center'>
      <div
        className='mx-auto max-h-[400px] max-w-[400px] dark:hidden'
        ref={containerLight}
      />
      <div
        className='mx-auto hidden max-h-[400px] max-w-[400px] dark:flex'
        ref={containerDark}
      />
      <div className='text-center'>
        <h3>Thanks for Submitting a Job!</h3>
        <p className='mt-4'>
          Your post is currently being reviewed and should be approved within
          24hrs.
        </p>
      </div>
    </section>
  );
};

export default FormSuccess;

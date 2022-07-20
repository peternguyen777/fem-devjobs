import { motion } from "framer-motion";

export default function Tab1({ register, formState }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Company name */}
      <label htmlFor='company'>
        <h5 className='mt-6'>Company</h5>
      </label>
      <input
        type='text'
        id='company'
        {...register("company", { required: "Company name is required." })}
        placeholder='eg. Coinbase'
        className='formInput mt-3 w-full'
      />

      {/* Position */}
      <label htmlFor='position'>
        <h5 className='mt-4'>Position</h5>
      </label>
      <input
        type='text'
        id='position'
        {...register("position", { required: "Position is required." })}
        placeholder='eg. Front-end Engineer'
        className='formInput mt-3 w-full'
      />

      {/* Location */}
      <label htmlFor='location'>
        <h5 className='mt-4'>Country</h5>
      </label>
      <input
        type='text'
        id='location'
        {...register("location", { required: "Location is required." })}
        placeholder='eg. Australia'
        className='formInput mt-3 w-full '
      />

      {/* Contract */}
      <label htmlFor='contract'>
        <h5 className='mt-4'>Contract</h5>
      </label>
      <select
        id='contract'
        {...register("contract", { required: "Contract type is required." })}
        className='formInput mt-3 w-full rounded-lg py-2.5 px-4 font-kumbhsans text-[16px] font-normal leading-[26px] text-darkgray outline-none ring-1 ring-[#EAECF1] transition duration-200 ease-in-out focus:ring-2 focus:ring-violet dark:bg-verydarkblue dark:ring-darkgray focus:dark:ring-2 focus:dark:ring-violet'
      >
        <option defaultValue>Choose an Option</option>
        <option value='Full Time'>Full Time</option>
        <option value='Part Time'>Part Time</option>
        <option value='Casual'>Casual</option>
      </select>
      {/* <p>{JSON.stringify(watch(), 2, null)}</p> */}
    </motion.section>
  );
}

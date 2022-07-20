import { motion } from "framer-motion";

export default function Tab6({ register }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Role */}
      <label htmlFor='role'>
        <h5 className='mt-6'>Role</h5>
      </label>
      <textarea
        type='text'
        id='role'
        {...register("role")}
        rows={6}
        placeholder='What does the role entail?'
        className='mt-3 w-full'
      />
      {/* <p>{JSON.stringify(watch(), 2, null)}</p> */}
    </motion.section>
  );
}

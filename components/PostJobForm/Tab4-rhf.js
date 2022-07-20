import { motion } from "framer-motion";

export default function Tab4({ register }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Requirements */}
      <label htmlFor='requirements'>
        <h5 className='mt-6'>Requirements</h5>
      </label>
      <textarea
        type='text'
        id='requirements'
        {...register("requirements")}
        rows={6}
        placeholder='What is your ideal candidate?'
        className='mt-3 w-full'
      />
      {/* <p>{JSON.stringify(watch(), 2, null)}</p> */}
    </motion.section>
  );
}

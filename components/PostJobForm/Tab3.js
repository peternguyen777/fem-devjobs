import { motion } from "framer-motion";

export default function Tab3({ handleChange, details }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Description */}
      <label htmlFor='description'>
        <h5 className='mt-6'>Description</h5>
      </label>
      <textarea
        type='text'
        id='description'
        name='description'
        rows={6}
        placeholder='What type of candidate are you looking for?'
        value={details.description}
        className='mt-3 w-full'
        onChange={handleChange}
      />
    </motion.div>
  );
}

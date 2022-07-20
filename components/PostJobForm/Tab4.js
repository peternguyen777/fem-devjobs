import { motion } from "framer-motion";

export default function Tab4({ handleChange, details }) {
  return (
    <motion.div
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
        name='requirements'
        rows={6}
        placeholder='What is your ideal candidate?'
        value={details.requirements.content}
        className='mt-3 w-full'
        onChange={handleChange}
      />
    </motion.div>
  );
}

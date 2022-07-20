import { motion } from "framer-motion";

export default function Tab6({ handleChange, details }) {
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
        name='role'
        rows={6}
        placeholder='What does the role entail?'
        value={details.role.content}
        className='mt-3 w-full'
        onChange={handleChange}
      />
    </motion.section>
  );
}

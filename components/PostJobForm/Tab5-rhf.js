import { motion } from "framer-motion";
import { useCallback } from "react";

export default function Tab5({ handleReqChange, subReqs, setSubReqs }) {
  const removeReq = useCallback(
    (event) => {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10);
      setSubReqs((subReqs) => {
        const newSubReqs = [...subReqs];
        newSubReqs.splice(index, 1);
        return newSubReqs;
      });
    },
    [setSubReqs]
  );

  const addReq = useCallback(
    (event) => {
      event.preventDefault();
      setSubReqs((subReqs) => [...subReqs, ""]);
    },
    [setSubReqs]
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Sub requirements */}
      <label>
        <h5 className='mt-6'>List of Requirements</h5>
      </label>

      <div>
        {subReqs.map((req, index) => (
          <div key={index} className='mt-3 flex items-center'>
            <input
              value={req}
              data-index={index}
              onChange={handleReqChange}
              // placeholder='eg. 3+ years of React experience'

              className='formInput mr-4 w-full '
            />
            <button onClick={removeReq} data-index={index}>
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* + Add new requirement Button  */}
      <div className='my-6'>
        <button
          className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
          onClick={addReq}
        >
          <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
            + Add New Requirement
          </h5>
        </button>
      </div>
    </motion.section>
  );
}

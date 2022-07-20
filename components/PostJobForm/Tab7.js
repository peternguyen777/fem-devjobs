import { motion } from "framer-motion";
import { useCallback } from "react";

export default function Tab7({ handleRoleChange, subRoles, setSubRoles }) {
  const removeRole = useCallback(
    (event) => {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10);
      setSubRoles((subRoles) => {
        const newSubRoles = [...subRoles];
        newSubRoles.splice(index, 1);
        return newSubRoles;
      });
    },
    [setSubRoles]
  );

  const addRole = useCallback(
    (event) => {
      event.preventDefault();
      setSubRoles((subRoles) => [...subRoles, ""]);
    },
    [setSubRoles]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.1,
      }}
    >
      {/* Sub roles */}
      <label>
        <h5 className='mt-6'>List of Roles</h5>
      </label>

      <div>
        {subRoles.map((role, index) => (
          <div key={index} className='mt-3 flex items-center '>
            <input
              value={role}
              data-index={index}
              onChange={handleRoleChange}
              // placeholder='eg. Collaborating with product and design to increase conversions and improve user experience'
              className='formInput mr-4 w-full'
            />
            <button onClick={removeRole} data-index={index}>
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* + Add new role Button  */}
      <div className='my-6'>
        <button
          className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
          onClick={addRole}
        >
          <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
            + Add New Role
          </h5>
        </button>
      </div>
    </motion.div>
  );
}

import { useState } from "react";

export default function Tab5() {
  const [requirements, setRequirements] = useState([]);
  const [task, setTask] = useState("");

  const taskChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitTaskHandler = (e) => {
    e.preventDefault();
    setRequirements([...requirements, task]);
    setTask("");
  };

  const removeTaskHandler = (e) => {
    const taskText = e.target.innerHTML;
    const newRequirements = requirements.filter((item) => {
      return item !== taskText;
    });
    setRequirements(newRequirements);
  };

  return (
    <>
      {/* Sub requirements */}
      <label htmlFor='listrequirements'>
        <h5 className='mt-6'>List of Requirements</h5>
      </label>

      <ul className='mt-3 list-outside list-disc space-y-2 pl-4'>
        {requirements.map((item, i) => (
          <li className='pl-5' key={i} indexKey={i} onClick={removeTaskHandler}>
            {item}
          </li>
        ))}
      </ul>

      <input
        type='text'
        id='listrequirements'
        name='listrequirements'
        value={task}
        placeholder='eg. Expertise with React required'
        className={`mt-3 w-full ${requirements.length > 4 && `hidden`}`}
        onChange={taskChangeHandler}
      />

      {/* + Add new requirement Button  */}
      <div className={`mt-6 ${requirements.length > 4 && `hidden`}`}>
        <button
          className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
          onClick={submitTaskHandler}
        >
          <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
            + Add New Requirement
          </h5>
        </button>
      </div>
    </>
  );
}

import { useState } from "react";

export default function Tab7() {
  const [role, setRole] = useState([]);
  const [task, setTask] = useState("");

  const taskChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitTaskHandler = (e) => {
    e.preventDefault();
    setRole([...role, task]);
    setTask("");
  };

  return (
    <>
      {/* Role Task */}
      {/* Sub roles */}
      <label htmlFor='listroles'>
        <h5 className='mt-6'>List of Requirements</h5>
      </label>

      <ul className='mt-3 list-outside list-disc space-y-2 pl-4'>
        {role?.map((item, i) => (
          <li className='yolo pl-5' key={i}>
            {item}
          </li>
        ))}
      </ul>

      <input
        type='text'
        id='listroles'
        name='listroles'
        value={task}
        placeholder='eg. Provide guidance and direction on technical issues'
        className='mt-6 w-full'
        onChange={taskChangeHandler}
      />

      {/* + Add new role task Button  */}
      <div className='mt-6'>
        <button
          className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
          onClick={submitTaskHandler}
        >
          <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
            + Add New Task
          </h5>
        </button>
      </div>
    </>
  );
}

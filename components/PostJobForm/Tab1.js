export default function Tab1() {
  return (
    <>
      {/* Company name */}
      <label htmlFor='company'>
        <h5 className='mt-6'>Company</h5>
      </label>
      <input
        type='text'
        id='company'
        name='company'
        placeholder='eg. Coinbase'
        className='mt-3 w-full'
      />

      {/* Position */}
      <label htmlFor='position'>
        <h5 className='mt-4'>Position</h5>
      </label>
      <input
        type='text'
        id='position'
        name='position'
        placeholder='eg. Front-end Engineer'
        className='mt-3 w-full'
      />

      {/* Location */}
      <label htmlFor='location'>
        <h5 className='mt-4'>Country</h5>
      </label>
      <input
        type='text'
        id='location'
        name='location'
        placeholder='eg. Australia'
        className='mt-3 w-full '
      />

      {/* Contract */}
      <label htmlFor='contract'>
        <h5 className='mt-4'>Contract</h5>
      </label>
      <select
        id='contract'
        className='mt-3 w-full rounded-lg py-2.5 px-4 font-kumbhsans text-[16px] font-normal leading-[26px] text-darkgray outline-none ring-1 ring-[#EAECF1] transition duration-200 ease-in-out focus:ring-2 focus:ring-violet dark:bg-verydarkblue dark:ring-midnight focus:dark:ring-2 focus:dark:ring-violet'
      >
        <option selected>Choose an Option</option>
        <option value='Full Time'>Full Time</option>
        <option value='Part Time'>Part Time</option>
        <option value='Casual'>Casual</option>
      </select>
    </>
  );
}

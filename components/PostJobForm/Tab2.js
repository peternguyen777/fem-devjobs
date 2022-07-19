export default function Tab2({ handleChange }) {
  return (
    <>
      {/* Website */}
      <label htmlFor='website'>
        <h5 className='mt-6'>Website</h5>
      </label>
      <input
        type='text'
        id='website'
        name='website'
        placeholder='eg. www.coinbase.com'
        className='formInput mt-3 w-full'
        onChange={handleChange}
      />

      {/* Apply Link */}
      <label htmlFor='apply'>
        <h5 className='mt-4'>Email Applications To</h5>
      </label>
      <input
        type='text'
        id='apply'
        name='apply'
        placeholder='eg. careers@coinbase.com'
        className='formInput mt-3 w-full'
        onChange={handleChange}
      />

      <div className='mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='flex flex-col'>
          {/* Company Logo Upload */}
          <label htmlFor='myFile'>
            <h5>Company Logo (.svg)</h5>
          </label>
          <input
            type='file'
            id='myFile'
            name='filename'
            className='mt-4 rounded-none py-0 px-0 font-kumbhsans ring-0 focus:ring-0 dark:bg-midnight dark:ring-0 focus:dark:ring-0'
          />
        </div>
        <div className='flex flex-col'>
          {/* Company Logo Background Color HSL */}
          <label>
            <h5>Logo Background Color</h5>
          </label>
          <div className='mt-3 flex space-x-4'>
            <input
              type='text'
              name='logoBgH'
              placeholder='H'
              className='formInput w-12 px-2'
              onChange={handleChange}
            />
            <input
              type='text'
              name='logoBgS'
              placeholder='S'
              className='formInput w-12 px-2'
              onChange={handleChange}
            />
            <input
              type='text'
              name='L'
              placeholder='L'
              className='formInput w-12 px-2'
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Tab3() {
  return (
    <>
      {/* Description */}
      <label htmlFor='description'>
        <h5 className='mt-6'>Description</h5>
      </label>
      <textarea
        type='text'
        id='description'
        name='description'
        rows={10}
        placeholder='What type of candidate are you looking for?'
        className='mt-3 w-full'
      />
    </>
  );
}

export default function Tab3({ handleChange }) {
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
        rows={6}
        placeholder='What type of candidate are you looking for?'
        className='mt-3 w-full'
        onChange={handleChange}
      />
    </>
  );
}

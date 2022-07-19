export default function Tab4({ handleChange }) {
  return (
    <>
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
        className='mt-3 w-full'
        onChange={handleChange}
      />
    </>
  );
}

export default function Tab4() {
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
        rows={10}
        placeholder='What type of requirements are you looking for?'
        className='mt-3 w-full'
      />
    </>
  );
}
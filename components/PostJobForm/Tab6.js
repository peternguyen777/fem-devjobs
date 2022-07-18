export default function Tab6() {
  return (
    <>
      {/* Role */}
      <label htmlFor='role'>
        <h5 className='mt-6'>Role</h5>
      </label>
      <textarea
        type='text'
        id='role'
        name='role'
        rows={10}
        placeholder='What does the role entail?'
        className='mt-3 w-full'
      />
    </>
  );
}

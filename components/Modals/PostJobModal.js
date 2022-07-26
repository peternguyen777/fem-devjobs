import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import FormDots from "../UI/FormDots";

//RHF IMPORT
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PostJobValidation from "../../validation/PostJobValidation";
import FormSuccess from "../UI/FormSuccess";

export default function PostJobModal(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  //image upload state
  const [loading, setLoading] = useState(false);
  const [imageAssetId, setImageAssetId] = useState();

  //GET USEFORM HOOKS
  const { register, control, handleSubmit, reset, getValues, formState } =
    useForm({
      resolver: yupResolver(PostJobValidation),
      mode: "all",
      defaultValues: {
        reqItems: [{ items: "" }, { items: "" }, { items: "" }],
        roleItems: [{ items: "" }, { items: "" }, { items: "" }],
      },
    });

  const { errors, isValid } = formState;
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      setCurrentTab(7);
    }
  }, [formState, reset]);

  const handleClose = () => {
    reset();
    setCurrentTab(0);
    props.setShowModal(false);
  };

  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
  } = useFieldArray({ control, name: "reqItems" });

  const {
    fields: roleFields,
    append: roleAppend,
    remove: roleRemove,
  } = useFieldArray({ control, name: "roleItems" });

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    // uploading asset to sanity
    if (
      selectedFile &&
      (selectedFile.type === "image/svg+xml" ||
        selectedFile.type === "image/svg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/png+xml")
    ) {
      setLoading(true);
      console.log("passes if test");
      const formData = new FormData();
      formData.append("image", selectedFile);
      fetch("/api/createLogoPost", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImageAssetId(data._id);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (isValid) {
      data["logoId"] = imageAssetId;

      fetch("/api/createJobPost", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const modalContent = (
    <AnimatePresence>
      {props.showModal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={`fixed top-1/2 left-0 right-0 z-30 mx-6 flex min-h-[619px] w-[calc(100%-48px)] -translate-y-1/2 flex-col rounded-lg bg-white p-6 dark:bg-verydarkblue sm:mx-10 sm:w-[calc(100%-80px)] sm:p-8 md:mx-auto md:w-[688px] ${
            currentTab === 7 ? `justify-between` : `justify-between`
          }`}
        >
          <form action='' id='postJob' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='dark:text-white'>Post a Job</h3>

            {/* TAB1 */}

            {currentTab === 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Company name */}
                <div className='relative mt-6 flex justify-between'>
                  <label htmlFor='company'>
                    <h5>Company *</h5>
                  </label>
                  {errors.company && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block '>
                      {errors.company.message}
                    </h6>
                  )}
                </div>
                <input
                  type='text'
                  id='company'
                  {...register("company")}
                  placeholder='eg. Coinbase'
                  className={`formInput mt-3 w-full ${
                    errors.company &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />

                {/* Position */}
                <div className='relative mt-4 flex justify-between'>
                  <label htmlFor='position'>
                    <h5>Position *</h5>
                  </label>
                  {errors.position && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.position.message}
                    </h6>
                  )}
                </div>
                <input
                  type='text'
                  id='position'
                  {...register("position")}
                  placeholder='eg. Front-end Engineer'
                  className={`formInput mt-3 w-full ${
                    errors.position &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />

                {/* Location */}
                <div className='relative mt-4 flex justify-between'>
                  <label htmlFor='location'>
                    <h5>Country *</h5>
                  </label>
                  {errors.location && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.location.message}
                    </h6>
                  )}
                </div>
                <input
                  type='text'
                  id='location'
                  {...register("location")}
                  placeholder='eg. Australia, Anywhere'
                  className={`formInput mt-3 w-full ${
                    errors.location &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />

                {/* Contract */}
                <div className='relative mt-4 flex justify-between'>
                  <label htmlFor='contract'>
                    <h5>Contract *</h5>
                  </label>
                  {errors.contract && (
                    <h6 className='absolute top-10 right-8 hidden sm:inline-block'>
                      {errors.contract.message}
                    </h6>
                  )}
                  <svg
                    className='absolute right-2 top-11 -z-10 h-5 w-5 cursor-pointer fill-current text-darkgray'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='flex items-center'>
                  <select
                    id='contract'
                    {...register("contract")}
                    className={`formInput mt-3 w-full cursor-pointer appearance-none rounded-lg bg-transparent py-2 px-4 font-kumbhsans text-[16px] font-normal leading-[26px] text-darkgray outline-none transition duration-200 ease-in-out focus:ring-2 ${
                      errors.contract
                        ? `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                        : `ring-1 ring-[#EAECF1] focus:ring-violet dark:ring-darkgray focus:dark:ring-2 focus:dark:ring-violet `
                    }`}
                  >
                    <option disabled value='' selected>
                      Select an option
                    </option>
                    <option value='Full Time'>Full Time</option>
                    <option value='Part Time'>Part Time</option>
                    <option value='Freelance'>Freelance</option>
                  </select>
                </div>
              </motion.section>
            )}

            {/* TAB2 */}
            {currentTab === 1 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Website */}
                <div className='relative mt-6 flex justify-between'>
                  <label htmlFor='website'>
                    <h5>Website *</h5>
                  </label>
                  {errors.website && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.website.message}
                    </h6>
                  )}
                </div>
                <input
                  type='text'
                  id='website'
                  {...register("website")}
                  placeholder='eg. https://www.coinbase.com'
                  className={`formInput mt-3 w-full ${
                    errors.website &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />

                {/* Apply Link */}
                <div className='relative mt-4 flex justify-between'>
                  <label htmlFor='apply'>
                    <h5>Email Applications To *</h5>
                  </label>
                  {errors.apply && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.apply.message}
                    </h6>
                  )}
                </div>
                <input
                  type='text'
                  id='apply'
                  {...register("apply")}
                  placeholder='eg. careers@coinbase.com'
                  className={`formInput mt-3 w-full ${
                    errors.apply &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />

                <div className='mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                  <div className='flex w-full flex-col'>
                    {/* Company Logo Upload */}
                    <h5>Company Logo (.svg or .png)*</h5>
                    <label className='mt-4 block'>
                      <span className='sr-only'>Choose File</span>
                      <input
                        type='file'
                        {...register("logo", {
                          onChange: uploadImage,
                        })}
                        className={`${
                          errors.logo
                            ? `file:border-red-500 file:bg-red-500 file:text-white`
                            : `file:border-[#EEEFFC] file:bg-[#EEEFFC] file:text-violet`
                        } block w-full px-0 py-0 text-[16px] leading-[26px] text-darkgray file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:py-2 file:px-4 file:text-[16px] file:font-normal file:leading-[26px] `}
                      />
                    </label>

                    {errors.logo && (
                      <div className='mt-4 text-left'>
                        <h6 className='hidden sm:inline-block'>
                          {errors.logo.message}
                        </h6>
                      </div>
                    )}
                  </div>
                  <div className='flex w-full flex-col sm:items-end'>
                    {/* Company Logo Background Color HSL */}
                    <label>
                      <h5>Logo Background Color*</h5>
                    </label>
                    <div className='mt-4 flex space-x-4'>
                      <input
                        type='number'
                        {...register("logoBgH")}
                        placeholder='H'
                        className={`formInput w-16 px-2 ${
                          errors.logoBgH &&
                          `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                        }`}
                      />
                      <input
                        type='number'
                        {...register("logoBgS")}
                        placeholder='S%'
                        className={`formInput w-16 px-2 ${
                          errors.logoBgS &&
                          `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                        }`}
                      />
                      <input
                        type='number'
                        {...register("logoBgL")}
                        placeholder='L%'
                        className={`formInput w-16 px-2 ${
                          errors.logoBgL &&
                          `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                        }`}
                      />
                    </div>
                    {(errors.logoBgH || errors.logoBgS || errors.logoBgL) && (
                      <div className='mt-4 text-right'>
                        {errors.logoBgH && (
                          <h6 className='hidden sm:inline-block'>{`H: ${errors.logoBgH?.message}`}</h6>
                        )}
                        {errors.logoBgS && (
                          <h6 className='hidden sm:inline-block'>{`S: ${errors.logoBgS?.message}`}</h6>
                        )}
                        {errors.logoBgL && (
                          <h6 className='hidden sm:inline-block'>{`L: ${errors.logoBgL?.message}`}</h6>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* TAB3 */}
            {currentTab === 2 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Description */}
                <div className='relative mt-6 flex justify-between'>
                  <label htmlFor='description'>
                    <h5>Description *</h5>
                  </label>
                  {errors.description && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.description.message}
                    </h6>
                  )}
                </div>
                <textarea
                  type='text'
                  id='description'
                  {...register("description")}
                  rows={6}
                  placeholder='What type of candidate are you looking for?'
                  className={`mt-3 w-full ${
                    errors.description &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />
              </motion.section>
            )}

            {/* TAB4 */}
            {currentTab === 3 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Requirements */}
                <div className='relative mt-6 flex justify-between'>
                  <label htmlFor='requirements'>
                    <h5>Requirements *</h5>
                  </label>
                  {errors.reqContent && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.reqContent.message}
                    </h6>
                  )}
                </div>
                <textarea
                  type='text'
                  id='requirements'
                  {...register("reqContent")}
                  rows={6}
                  placeholder='What is your ideal candidate?'
                  className={`mt-3 w-full ${
                    errors.reqContent &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />
              </motion.section>
            )}

            {/* TAB5 */}
            {currentTab === 4 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Sub requirements */}
                <div className='relative mt-6 flex justify-between'>
                  <label>
                    <h5>List of Requirements</h5>
                  </label>
                  {errors.reqItems && (
                    <h6 className='hidden sm:inline-block '>
                      {errors.reqItems.message}
                    </h6>
                  )}
                </div>

                <div>
                  {reqFields.map((item, index) => {
                    return (
                      <div key={item.id} className='mt-3 flex items-center'>
                        <input
                          {...register(`reqItems.${index}.items`)}
                          placeholder='eg. 2+ years ReactJS.'
                          className='formInput mr-4 w-full'
                        />

                        <button type='button' onClick={() => reqRemove(index)}>
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* + Add new requirement Button  */}
                <div className='my-6 flex justify-between space-x-4'>
                  <button
                    type='button'
                    className='h-[48px] flex-1 rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={() => {
                      reqAppend({ items: "" });
                    }}
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      + Add
                    </h5>
                  </button>
                  <button
                    type='button'
                    className='h-[48px] flex-1 rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={() =>
                      reset({
                        ...getValues(),
                        reqItems: [{ items: "" }, { items: "" }, { items: "" }],
                      })
                    }
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      Reset
                    </h5>
                  </button>
                </div>
              </motion.section>
            )}

            {/* TAB6 */}
            {currentTab === 5 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Role */}
                <div className='relative mt-6 flex justify-between'>
                  <label htmlFor='role'>
                    <h5>Role *</h5>
                  </label>
                  {errors.roleContent && (
                    <h6 className='absolute top-10 right-4 hidden sm:inline-block'>
                      {errors.roleContent.message}
                    </h6>
                  )}
                </div>
                <textarea
                  type='text'
                  id='role'
                  {...register("roleContent")}
                  rows={6}
                  placeholder='What does the role entail?'
                  className={`mt-3 w-full ${
                    errors.roleContent &&
                    `bg-red-50 ring-2 ring-red-500 focus:ring-red-500  dark:ring-red-500`
                  }`}
                />
              </motion.section>
            )}

            {/* TAB7 */}
            {currentTab === 6 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {/* Sub roles */}

                <div className='relative mt-6 flex items-center justify-between'>
                  <label>
                    <h5>List of Roles</h5>
                  </label>
                  {errors.roleItems && (
                    <h6 className='hidden sm:inline-block '>
                      {errors.roleItems.message}
                    </h6>
                  )}
                </div>

                <div>
                  {roleFields.map((item, index) => {
                    return (
                      <div key={item.id} className='mt-3 flex items-center'>
                        <input
                          {...register(`roleItems.${index}.items`)}
                          placeholder='eg. Mentor junior developers.'
                          className='formInput mr-4 w-full'
                        />

                        <button type='button' onClick={() => roleRemove(index)}>
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className='my-6 flex justify-between space-x-4'>
                  <button
                    type='button'
                    className='h-[48px] flex-1 rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={() => {
                      roleAppend({ items: "" });
                    }}
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      + Add
                    </h5>
                  </button>
                  <button
                    type='button'
                    className='h-[48px] flex-1 rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={() =>
                      reset(
                        {
                          ...getValues(),
                          roleItems: [
                            { items: "" },
                            { items: "" },
                            { items: "" },
                          ],
                        },
                        { keepErrors: true }
                      )
                    }
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      Reset
                    </h5>
                  </button>
                </div>
              </motion.section>
            )}
          </form>

          {currentTab === 7 && <FormSuccess />}

          {/* BUTTONS */}

          {currentTab !== 6 && currentTab !== 7 && (
            <div>
              <FormDots current={currentTab} setCurrentTab={setCurrentTab} />
              <div className='flex justify-end space-x-4'>
                <button
                  type='button'
                  className={`h-[48px] flex-1 rounded-lg bg-violet transition duration-100 hover:opacity-50 sm:w-[120px] sm:flex-none ${
                    currentTab === 0 && `hidden`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(currentTab - 1);
                  }}
                >
                  <h5 className='py-[12px] leading-[24px] text-white'>Back</h5>
                </button>
                <button
                  type='button'
                  className={`${
                    currentTab === 0 ? `w-[120px]` : `flex-1`
                  } h-[48px] rounded-lg bg-violet transition duration-100 hover:opacity-50 disabled:bg-darkgray disabled:opacity-50 sm:w-[120px] sm:flex-none`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(currentTab + 1);
                  }}
                >
                  <h5 className='py-[12px] leading-[24px] text-white'>Next</h5>
                </button>
              </div>
            </div>
          )}
          {currentTab === 6 && currentTab !== 7 && (
            <div>
              {Object.keys(errors).length !== 0 && (
                <h6 className='mb-6 text-center sm:hidden'>
                  Invalid or Missing Fields.
                </h6>
              )}
              <FormDots current={currentTab} setCurrentTab={setCurrentTab} />
              <div
                className={`flex items-center justify-end ${
                  Object.keys(errors).length !== 0 && `md:justify-between`
                }`}
              >
                {Object.keys(errors).length !== 0 && (
                  <h6 className='hidden w-full sm:inline-block'>
                    Invalid or Missing Fields.
                  </h6>
                )}
                <div className='flex w-full justify-end space-x-4'>
                  <button
                    type='button'
                    className='h-[48px] flex-1 rounded-lg bg-violet transition duration-100 hover:opacity-50 sm:w-[120px] sm:flex-none'
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentTab(currentTab - 1);
                    }}
                  >
                    <h5 className='py-[12px] leading-[24px] text-white'>
                      Back
                    </h5>
                  </button>
                  <button
                    type='submit'
                    form='postJob'
                    className={`h-[48px] flex-1 cursor-pointer rounded-lg transition duration-100 focus:ring-2 focus:ring-offset-2 sm:w-[120px] sm:flex-none ${
                      Object.keys(errors).length === 0 && isValid
                        ? `bg-violet hover:opacity-50 focus:ring-violet`
                        : `bg-darkgray opacity-50 focus:ring-darkgray`
                    }`}
                  >
                    <h5 className='py-[12px] leading-[24px] text-white '>
                      Post Job
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const underlayContent = (
    <AnimatePresence>
      {props.showModal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className='fixed top-0 z-20 h-full w-full bg-black opacity-50'
          onClick={handleClose}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("postjobmodal-root")
        )}
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("postjobmodal-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}

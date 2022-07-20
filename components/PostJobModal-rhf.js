import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import FormDots from "./UI/FormDots";

//RHF IMPORT
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PostJobValidation from "../validation/PostJobValidation";

//VALIDATION SCHEMA

export default function PostJobModal(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [subReqs, setSubReqs] = useState(["", "", ""]);
  const [subRoles, setSubRoles] = useState(["", "", ""]);

  //GET USEFORM HOOKS
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(PostJobValidation),
    mode: "all",
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    props.setShowModal(false);
    reset();
    setCurrentTab(0);
  };

  const removeReq = useCallback(
    (event) => {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10);
      setSubReqs((subReqs) => {
        const newSubReqs = [...subReqs];
        newSubReqs.splice(index, 1);
        return newSubReqs;
      });
    },
    [setSubReqs]
  );

  const addReq = useCallback(
    (event) => {
      event.preventDefault();
      setSubReqs((subReqs) => [...subReqs, ""]);
    },
    [setSubReqs]
  );

  const removeRole = useCallback(
    (event) => {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10);
      setSubRoles((subRoles) => {
        const newSubRoles = [...subRoles];
        newSubRoles.splice(index, 1);
        return newSubRoles;
      });
    },
    [setSubRoles]
  );

  const addRole = useCallback(
    (event) => {
      event.preventDefault();
      setSubRoles((subRoles) => [...subRoles, ""]);
    },
    [setSubRoles]
  );

  const onSubmit = async (data) => {
    // console.log(data);
    if (isValid) {
      const transformedDetails = data;

      //TRANSFORM HSL DATA
      const { logoBgH, logoBgS, logoBgL } = transformedDetails;
      const logoBackgroundColor = `hsl(${logoBgH}, ${logoBgS}%, ${logoBgL}%)`;
      delete transformedDetails.logoBgH;
      delete transformedDetails.logoBgS;
      delete transformedDetails.logoBgL;
      transformedDetails["logoBackground"] = logoBackgroundColor;

      //ADD DATE DATA
      transformedDetails["postedAt"] = new Date();

      //REMOVE EMPTY STRINGS FROM REQUIREMENT ITEMS ARRAY
      const parsedSubReqs = data.requirements.items.filter((item) => {
        if (item !== "") {
          return item;
        }
      });
      transformedDetails.requirements.items = parsedSubReqs;

      //REMOVE EMPTY STRINGS FROM ROLE ITEMS ARRAY
      const parsedSubRoles = data.role.items.filter((item) => {
        if (item !== "") {
          return item;
        }
      });
      transformedDetails.role.items = parsedSubRoles;

      console.log(transformedDetails);

      setCurrentTab(0);
      reset();
      props.setShowModal(false);
    }
  };
  // console.log(errors, isValid);

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
          className='fixed top-1/2 left-0 right-0 z-30 mx-6 flex min-h-[619px] w-[calc(100%-48px)] -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-8 dark:bg-verydarkblue sm:mx-10 sm:w-[calc(100%-80px)] md:mx-auto md:w-[688px]'
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
                <div className='mt-6 flex justify-between'>
                  <label htmlFor='company'>
                    <h5>Company</h5>
                  </label>
                  {errors.company && <h6>{errors.company.message}</h6>}
                </div>
                <input
                  type='text'
                  id='company'
                  {...register("company")}
                  placeholder='eg. Coinbase'
                  className='formInput mt-3 w-full'
                />

                {/* Position */}
                <div className='mt-4 flex justify-between'>
                  <label htmlFor='position'>
                    <h5>Position</h5>
                  </label>
                  {errors.position && <h6>{errors.position.message}</h6>}
                </div>
                <input
                  type='text'
                  id='position'
                  {...register("position")}
                  placeholder='eg. Front-end Engineer'
                  className='formInput mt-3 w-full'
                />

                {/* Location */}
                <div className='mt-4 flex justify-between'>
                  <label htmlFor='location'>
                    <h5>Country</h5>
                  </label>
                  {errors.location && <h6>{errors.location.message}</h6>}
                </div>
                <input
                  type='text'
                  id='location'
                  {...register("location")}
                  placeholder='eg. Australia'
                  className='formInput mt-3 w-full '
                />

                {/* Contract */}
                <div className='mt-4 flex justify-between'>
                  <label htmlFor='contract'>
                    <h5>Contract</h5>
                  </label>
                  {errors.contract && <h6>{errors.contract.message}</h6>}
                </div>
                <select
                  id='contract'
                  {...register("contract")}
                  className='formInput mt-3 w-full rounded-lg py-2.5 px-4 font-kumbhsans text-[16px] font-normal leading-[26px] text-darkgray outline-none ring-1 ring-[#EAECF1] transition duration-200 ease-in-out focus:ring-2 focus:ring-violet dark:bg-verydarkblue dark:ring-darkgray focus:dark:ring-2 focus:dark:ring-violet'
                >
                  <option disabled value='' selected>
                    --select an option--
                  </option>
                  <option value='Full Time'>Full Time</option>
                  <option value='Part Time'>Part Time</option>
                  <option value='Casual'>Casual</option>
                </select>
                {/* <h6>{JSON.stringify(watch(), 2, null)}</h6> */}
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
                <div className='mt-6 flex justify-between'>
                  <label htmlFor='website'>
                    <h5>Website</h5>
                  </label>
                  {errors.website && <h6>{errors.website.message}</h6>}
                </div>
                <input
                  type='text'
                  id='website'
                  {...register("website")}
                  placeholder='eg. https://www.coinbase.com'
                  className='formInput mt-3 w-full'
                />

                {/* Apply Link */}
                <div className='mt-4 flex justify-between'>
                  <label htmlFor='apply'>
                    <h5>Email Applications To</h5>
                  </label>
                  {errors.apply && <h6>{errors.apply.message}</h6>}
                </div>
                <input
                  type='text'
                  id='apply'
                  {...register("apply")}
                  placeholder='eg. careers@coinbase.com'
                  className='formInput mt-3 w-full'
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
                      className='mt-4 rounded-none py-0 px-0 font-kumbhsans ring-0 focus:ring-0 dark:bg-verydarkblue dark:ring-0 focus:dark:ring-0'
                    />
                  </div>
                  <div className='flex flex-col'>
                    {/* Company Logo Background Color HSL */}
                    <label>
                      <h5>Logo Background Color</h5>
                    </label>
                    <div className='mt-3 flex space-x-4'>
                      <input
                        type='number'
                        {...register("logoBgH")}
                        placeholder='H'
                        className='formInput w-16 px-2'
                      />
                      <input
                        type='number'
                        {...register("logoBgS")}
                        placeholder='S'
                        className='formInput w-16 px-2'
                      />
                      <input
                        type='number'
                        {...register("logoBgL")}
                        placeholder='L'
                        className='formInput w-16 px-2'
                      />
                    </div>
                    {(errors.logoBgH || errors.logoBgS || errors.logoBgL) && (
                      <div className='mt-4'>
                        {errors.logoBgH && (
                          <h6>{`H: ${errors.logoBgH?.message}`}</h6>
                        )}
                        {errors.logoBgS && (
                          <h6>{`S: ${errors.logoBgS?.message}`}</h6>
                        )}
                        {errors.logoBgL && (
                          <h6>{`L: ${errors.logoBgL?.message}`}</h6>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <h6>{JSON.stringify(watch(), 2, null)}</h6> */}
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
                <div className='mt-6 flex justify-between'>
                  <label htmlFor='description'>
                    <h5>Description</h5>
                  </label>
                  {errors.description && <h6>{errors.description.message}</h6>}
                </div>
                <textarea
                  type='text'
                  id='description'
                  {...register("description")}
                  rows={6}
                  placeholder='What type of candidate are you looking for?'
                  className='mt-3 w-full'
                />
                {/* <h6>{JSON.stringify(watch(), 2, null)}</h6> */}
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
                <div className='mt-6 flex justify-between'>
                  <label htmlFor='requirements'>
                    <h5>Requirements</h5>
                  </label>
                  {errors.requirements && (
                    <h6>{errors.requirements.content.message}</h6>
                  )}
                </div>
                <textarea
                  type='text'
                  id='requirements'
                  {...register("requirements.content")}
                  rows={6}
                  placeholder='What is your ideal candidate?'
                  className='mt-3 w-full'
                />
                {/* <p>{JSON.stringify(watch(), 2, null)}</p> */}
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
                <label>
                  <h5 className='mt-6'>List of Requirements</h5>
                </label>

                <div>
                  {subReqs.map((req, index) => (
                    <div key={index} className='mt-3 flex items-center'>
                      <input
                        // value={req}
                        data-index={index}
                        placeholder='eg. 3+ years of React experience'
                        {...register(`requirements.items.${index}`)}
                        className='formInput mr-4 w-full '
                      />
                      <button onClick={removeReq} data-index={index}>
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* + Add new requirement Button  */}
                <div className='my-6'>
                  <button
                    className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={addReq}
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      + Add New Requirement
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
                <div className='mt-6 flex justify-between'>
                  <label htmlFor='role'>
                    <h5>Role</h5>
                  </label>
                  {errors.role && <h6>{errors.role.content.message}</h6>}
                </div>
                <textarea
                  type='text'
                  id='role'
                  {...register("role.content")}
                  rows={6}
                  placeholder='What does the role entail?'
                  className='mt-3 w-full'
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
                <label>
                  <h5 className='mt-6'>List of Roles</h5>
                </label>

                <div>
                  {subRoles.map((role, index) => (
                    <div key={index} className='mt-3 flex items-center'>
                      <input
                        // value={role}
                        data-index={index}
                        // onChange={handleRoleChange}
                        {...register(`role.items.${index}`)}
                        // placeholder='eg. Collaborating with product and design to increase conversions and improve user experience'
                        className='formInput mr-4 w-full'
                      />
                      <button onClick={removeRole} data-index={index}>
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* + Add new role Button  */}
                <div className='my-6'>
                  <button
                    className='h-[48px] w-full rounded-lg bg-[#EEEFFC] transition duration-100 hover:bg-[#C4C9F4] hover:opacity-50 dark:bg-[#303641] dark:hover:bg-[#6a6e76]'
                    onClick={addRole}
                  >
                    <h5 className='py-[12px] leading-[24px] text-violet dark:text-white'>
                      + Add New Role
                    </h5>
                  </button>
                </div>
              </motion.section>
            )}
          </form>

          {/* BUTTONS */}
          {currentTab !== 6 ? (
            <div>
              <FormDots current={currentTab} setCurrentTab={setCurrentTab} />
              <div className='flex justify-end space-x-4'>
                <button
                  className={`h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50 ${
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
                  className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50 disabled:bg-darkgray disabled:opacity-50'
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(currentTab + 1);
                  }}
                >
                  <h5 className='py-[12px] leading-[24px] text-white'>Next</h5>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <FormDots current={currentTab} setCurrentTab={setCurrentTab} />
              <div
                className={`flex items-center ${
                  isValid ? `justify-end` : `justify-between`
                }`}
              >
                {!isValid && <h6>Invalid or Missing Fields.</h6>}
                <div className='flex space-x-4'>
                  <button
                    className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
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
                    className={`h-[48px] w-[120px] cursor-pointer rounded-lg transition duration-100  ${
                      isValid
                        ? `bg-violet hover:opacity-50`
                        : `bg-darkgray opacity-50`
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

{
  /* <h6>{JSON.stringify(watch(), 2, null)}</h6> */
}

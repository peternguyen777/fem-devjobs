import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import Tab1 from "./PostJobForm/Tab1";
import Tab2 from "./PostJobForm/Tab2";
import Tab3 from "./PostJobForm/Tab3";
import Tab4 from "./PostJobForm/Tab4";
import Tab5 from "./PostJobForm/Tab5";
import Tab6 from "./PostJobForm/Tab6";
import Tab7 from "./PostJobForm/Tab7";
import FormDots from "./UI/FormDots";

const initialState = {
  company: "",
  position: "",
  contract: "",
  location: "",
  logoBgH: "",
  logoBgS: "",
  logoBgL: "",
  website: "",
  apply: "",
  description: "",
  requirements: {
    content: "",
    items: [],
  },
  role: {
    content: "",
    items: [],
  },
};

export default function PostJobModal(props) {
  const [submittedJob, setSubmittedJob] = useState([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const [details, setDetails] = useState(initialState);
  const [subReqs, setSubReqs] = useState(["", "", ""]);
  const [subRoles, setSubRoles] = useState(["", "", ""]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const parsedSubReqs = subReqs.filter((item) => {
      if (item !== "") {
        return item;
      }
    });

    setDetails((prev) => {
      return {
        ...prev,
        requirements: { ...prev.requirements, items: parsedSubReqs },
      };
    });
  }, [subReqs]);

  useEffect(() => {
    const parsedSubRoles = subRoles.filter((item) => {
      if (item !== "") {
        return item;
      }
    });

    setDetails((prev) => {
      return {
        ...prev,
        role: { ...prev.role, items: parsedSubRoles },
      };
    });
  }, [subRoles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "requirements") {
      setDetails((prev) => {
        return {
          ...prev,
          requirements: { ...prev.requirements, content: value },
        };
      });
    } else if (name === "role") {
      setDetails((prev) => {
        return {
          ...prev,
          role: { ...prev.role, content: value },
        };
      });
    } else {
      setDetails((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleReqChange = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    setSubReqs((subReqs) => {
      const newSubReqs = [...subReqs];
      newSubReqs[index] = event.target.value;
      return newSubReqs;
    });
  }, []);

  const handleRoleChange = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    setSubRoles((subRoles) => {
      const newSubRoles = [...subRoles];
      newSubRoles[index] = event.target.value;
      return newSubRoles;
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.setShowModal(false);
    setCurrentTab(0);
    setDetails(initialState);
    setSubReqs(["", "", ""]);
    setSubRoles(["", "", ""]);
    setSubmittedJob(details);
  };

  const handleClose = () => {
    props.setShowModal(false);
    setCurrentTab(0);
    setDetails(initialState);
    setSubReqs(["", "", ""]);
    setSubRoles(["", "", ""]);
    setSubmittedJob([]);
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
          className='fixed top-1/2 left-0 right-0 z-30 mx-6 flex min-h-[619px] w-[calc(100%-48px)] -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-8 dark:bg-midnight sm:mx-10 sm:w-[calc(100%-80px)] md:mx-auto md:w-[688px]'
        >
          <form action='' id='postJob' onSubmit={submitHandler}>
            <h3 className='dark:text-white'>Post a Job</h3>

            <div className={`${currentTab !== 0 && `hidden`}`}>
              <Tab1 handleChange={handleChange} />
            </div>
            <div className={`${currentTab !== 1 && `hidden`}`}>
              <Tab2 handleChange={handleChange} />
            </div>
            <div className={`${currentTab !== 2 && `hidden`}`}>
              <Tab3 handleChange={handleChange} />
            </div>
            <div className={`${currentTab !== 3 && `hidden`}`}>
              <Tab4 handleChange={handleChange} />
            </div>
            <div className={`${currentTab !== 4 && `hidden`}`}>
              <Tab5
                handleReqChange={handleReqChange}
                subReqs={subReqs}
                setSubReqs={setSubReqs}
              />
            </div>
            <div className={`${currentTab !== 5 && `hidden`}`}>
              <Tab6 handleChange={handleChange} />
            </div>
            <div className={`${currentTab !== 6 && `hidden`}`}>
              <Tab7
                handleRoleChange={handleRoleChange}
                subRoles={subRoles}
                setSubRoles={setSubRoles}
              />
            </div>
          </form>

          {/* BUTTONS */}
          {currentTab !== 6 ? (
            <div>
              <FormDots current={currentTab} />
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
                  className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
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
              <FormDots current={currentTab} />
              <div className='flex justify-end space-x-4'>
                <button
                  className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(currentTab - 1);
                  }}
                >
                  <h5 className='py-[12px] leading-[24px] text-white'>Back</h5>
                </button>
                <button
                  type='submit'
                  form='postJob'
                  className='h-[48px] w-[120px] rounded-lg bg-violet transition duration-100 hover:opacity-50'
                >
                  <h5 className='py-[12px] leading-[24px] text-white'>
                    Post Job
                  </h5>
                </button>
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

import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Card from "../components/UI/Card";

import SearchModal from "../components/Modals/SearchModal";
import PostJobModal from "../components/Modals/PostJobModal";
import { sanityClient } from "../sanity";

export default function Home({ posts }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  const [jobData, setJobData] = useState([]);
  const [filteredJobData, setFilteredJobData] = useState([]);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterFulltime, setFilterFulltime] = useState(false);

  const [jobsDisplay, setJobsDisplay] = useState(12);

  const fetchJobsHandler = useCallback(async () => {
    setIsLoading(true);

    const transformedJobsData = posts.map((job) => {
      return {
        id: job._id,
        company: job.company,
        logo: job.logo,
        position: job.position,
        postedAt: job.postedAt,
        logoBackground: job.logoBackground,
        contract: job.contract,
        location: job.location,
      };
    });

    setJobData(transformedJobsData);

    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    fetchJobsHandler();
  }, [fetchJobsHandler, errorMsg, posts]);

  useEffect(() => {
    let jobsByContract = jobData.filter((job) => {
      if (filterFulltime) {
        return job.contract === "Full Time";
      } else if (!filterFulltime) {
        return job;
      }
    });

    let jobsByTitle = jobsByContract.filter((job) => {
      if (
        job.position.toLowerCase().includes(filterTitle.toLowerCase()) ||
        job.company.toLowerCase().includes(filterTitle.toLowerCase())
      ) {
        return job;
      }
    });

    let jobsByLocation = jobsByTitle.filter((job) => {
      if (job.location.toLowerCase().includes(filterLocation.toLowerCase())) {
        return job;
      }
    });

    let finalFilteredJobs = jobsByLocation.slice(0, jobsDisplay);

    setFilteredJobData(finalFilteredJobs);
  }, [jobData, filterTitle, filterLocation, filterFulltime, jobsDisplay]);

  return (
    <div className='flex h-screen flex-col'>
      <div className='bg-lightgray transition-colors duration-300 ease-in-out dark:bg-midnight'>
        <Head>
          <title>devjobs</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='theme-color' content='#5964E0' />
          <link rel='icon' href='/assets/favicon-32x32.png' />
        </Head>
        <SearchModal
          showModal={showModal}
          setShowModal={setShowModal}
          location={filterLocation}
          setLocation={setFilterLocation}
          fulltime={filterFulltime}
          setFulltime={setFilterFulltime}
        />
        <PostJobModal showModal={showJobModal} setShowModal={setShowJobModal} />
        <Banner />
        <Header />
        <SearchBar
          title={filterTitle}
          setTitle={setFilterTitle}
          location={filterLocation}
          setLocation={setFilterLocation}
          fulltime={filterFulltime}
          setFulltime={setFilterFulltime}
          showModal={showModal}
          setShowModal={setShowModal}
        />

        {/* SEARCH RESULTS */}
        {!isLoading ? (
          <main className='mx-6 mb-8 mt-14 grid max-w-[1190px] grid-cols-1 gap-y-12 sm:mx-auto sm:mb-14 sm:mt-[70px] sm:grid-cols-2 sm:gap-x-3 sm:gap-y-16 sm:px-10 lg:mt-[105px] lg:grid-cols-3 lg:gap-x-[30px]'>
            {filteredJobData.map((job) => {
              return <Card key={job.id} jobData={job} />;
            })}
          </main>
        ) : (
          <div className='my-14 flex justify-center sm:mt-[70px] lg:mt-[105px]'>
            <LoadingSpinner />
          </div>
        )}
      </div>

      {/* FILLER DIV AT BOTTOM */}
      <div className='flex-auto bg-lightgray transition-colors duration-300 ease-in-out dark:bg-midnight'>
        {!isLoading && (
          <button
            className={`${
              jobsDisplay > filteredJobData.length && `hidden`
            } mx-auto mb-[62px] flex h-12 cursor-pointer items-center rounded-[5px] bg-violet hover:bg-lightviolet`}
            onClick={() => {
              setJobsDisplay(jobsDisplay + 12);
            }}
          >
            <h5 className='px-9 text-white md:flex'>Load More</h5>
          </button>
        )}
      </div>

      <Footer showModal={showJobModal} setShowModal={setShowJobModal} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "jobPost" && (approved == true)] | order(postedAt desc) {
    _id,
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    contract,
    location
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

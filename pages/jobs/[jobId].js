import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Banner from "../../components/Banner";
import Header from "../../components/Header";

import JobTitleBar from "../../components/JobTitleBar";
import JobDescription from "../../components/JobDescription";
import JobFooter from "../../components/JobFooter";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { sanityClient } from "../../sanity";

const Page = (props) => {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
    console.log("Route is changing..");
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    console.log("Route is changing is complete..");
  });

  return (
    <div className='flex h-screen flex-col'>
      <div className='bg-lightgray transition-colors duration-300 ease-in-out dark:bg-midnight'>
        <Head>
          <title>{`devjobs - ${props.projectData.company}`}</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='theme-color' content='#5964E0' />
          <link rel='icon' href='/assets/favicon-32x32.png' />
        </Head>
        <Banner />
        <Header />
        {!loading ? (
          <>
            <JobTitleBar data={props.projectData} />
            <JobDescription data={props.projectData} />
          </>
        ) : (
          <div className='mt-[168px] flex justify-center sm:mt-[194px] lg:mt-[229px]'>
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div className='w-full flex-auto bg-lightgray transition-colors duration-300 ease-in-out dark:bg-midnight'></div>
      {/* JOB SPECIFIC FOOTER */}
      {!loading && <JobFooter data={props.projectData} />}
    </div>
  );
};

export default Page;

export const getStaticPaths = async () => {
  const query = `*[_type == "jobPost"]{
    _id    
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      jobId: post._id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params }) {
  const query = `*[_type == "jobPost" && _id == $jobId && (approved == true)][0] {
    _id,
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    website,
    description,
    apply,
    contract,
    location,
    requirements,
    role
  }`;

  const post = await sanityClient.fetch(query, {
    jobId: params?.jobId,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectData: post,
    },
    revalidate: 60, //after 60s it will update the old cached version.
  };
}

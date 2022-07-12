import { useState } from "react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className={`${enabled && `dark`}`}>
      <div className='h-screen bg-lightgray dark:bg-midnight'>
        <Head>
          <title>devjobs</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/assets/favicon-32x32.png' />
        </Head>
        <Banner />
        <Header enabled={enabled} setEnabled={setEnabled} />
        <main></main>
      </div>
    </div>
  );
}

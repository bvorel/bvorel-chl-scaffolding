import { gql, useQuery } from "@apollo/client";
import { useEffect, useState, useRef } from 'react';
import Head from "next/head";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import { getNextStaticProps } from "@faustwp/core";
import Accordion from '../components/Accordion';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page() {
  const { data } = useQuery(Page.query);

  const { title: siteTitle, description: siteDescription } =
    data.generalSettings;
  const menuItems = data.primaryMenuItems.nodes;

  const [list, setList] = useState([
    {
      title: "Brand Strategy",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      active: 1
    },
    {
      title: "SEO",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Analytics",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ]);

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main>
        <section className="hero w-screen min-h-3/6 h-3/6 flex items-center justify-center bg-[url('https://source.unsplash.com/rNQ-xlJj_EM')] bg-cover bg-center">
          <div className="absolute container">
            <h1 data-aos="fade-up" data-aos-duration="1000" className="text-white text-center w-8/12 mx-auto pt-20">Strategy</h1>
          </div>
        </section>
        <section className="container">
          <div className='h-screen'>
            <div className='accordion py-20'>
            {
                list.map((item, key) => (
                  <Accordion key={key} datas={item} />
                ))
              }
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

Page.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
  });
}

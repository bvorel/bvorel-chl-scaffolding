import { gql, useQuery } from "@apollo/client";
import { useEffect, useState, useRef } from 'react';
import Head from "next/head";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import { getNextStaticProps } from "@faustwp/core";

import Rellax from "rellax";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page() {
  useEffect(() => {
    var rellax = new Rellax('.headline-animate', {
      speed: -2,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
  }, []);

  const { data } = useQuery(Page.query);

  const { title: siteTitle, description: siteDescription } =
    data.generalSettings;
  const menuItems = data.primaryMenuItems.nodes;

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
        <section className="hero w-screen min-h-screen h-screen flex items-center justify-center bg-[url('https://source.unsplash.com/aswEuoFaH-M')] bg-cover bg-center">
          <div className="headline-animate absolute container">
            <h1 data-aos="fade-up" data-aos-duration="1000" className="text-click-here-dark text-center w-8/12 mx-auto">We Like Building Things That Stand Out</h1>
          </div>
        </section>
        <section className="our-services flex min-h-screen h-screen items-center justify-center bg-click-here-dark sticky top-0">
          <div className="container">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-12 sm:gap-y-16 lg:gap-x-8">
              <div className="col-start-1 col-end-5">
                <h2 data-aos="fade-up" data-aos-duration="1000" className="mb-[0px] thin">Creating Connections</h2>
              </div>
              <div className="col-start-6 col-end-12">
                <p data-aos="fade-up" data-aos-duration="1000" className="mb-[56px]"><b>Strategy, design & build.</b> We value our people, our clients, and the integrity of the work we do. </p>
                <div className="grid grid-cols-12 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-y-16 lg:gap-x-8">
                  <div data-aos="fade-up" data-aos-duration="1000" className="services-col">
                    <div className="link-title">Strategy</div>
                    <ul>
                      <li><a href="#">Brand Strategy</a></li>
                      <li><a href="#">Analytics</a></li>
                      <li><a href="#">SEO</a></li>
                    </ul>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" className="services-col">
                    <div className="link-title">Digital Design</div>
                    <ul>
                      <li><a href="#">Visual Identity</a></li>
                      <li><a href="#">Brand Guidelines</a></li>
                      <li><a href="#">Web Design</a></li>
                    </ul>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" className="services-col">
                    <div className="link-title">Development</div>
                    <ul>
                      <li><a href="#">Web Design</a></li>
                      <li><a href="#">Ecommerce</a></li>
                      <li><a href="#">App Development</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="split-card w-screen min-h-screen h-screen relative flex bg-click-here-dark rounded-t-[5rem] overflow-hidden sticky top-[106px]">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-start-1 col-end-7 p-24 bg-click-here-services-t1">
              <h2 className="mb-[50px]">Strategy</h2>
              <p className="w-9/12 mb-[50px]">Creativity follows strategy. Click Here Labs approaches all projects by aiming at your core values. Our objective is to align values, personnel, brand and product.</p>
              <div className="flex flex-col"><a href="#" className="ch-btn block hover:bg-click-here-dark hover:text-white ease-in-out duration-300">Learn More &nbsp; →</a></div>
            </div>
            <div className="h-min mb-4 relative group col-start-7 col-end-13">
              <img className="" src="https://source.unsplash.com/random/1200x2000" alt="" />
            </div>
          </div>
        </section>
        <section className="split-card w-screen min-h-screen h-screen relative flex bg-click-here-dark rounded-t-[5rem] overflow-hidden sticky top-[106px]">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-start-1 col-end-7 p-24 bg-click-here-services-t2">
              <h2 className="mb-[50px]">Digital Design</h2>
              <p className="w-9/12 mb-[50px]">The internet is becoming boring and stale. Click Here Labs aims to put the enjoyment of people first. It’s an absolute must that your product or website has an impact for all the right reasons.</p>
              <div className="flex flex-col"><a href="#" className="ch-btn block hover:bg-click-here-dark hover:text-white ease-in-out duration-300">Learn More &nbsp; →</a></div>
            </div>
            <div className="h-min mb-4 relative group col-start-7 col-end-13">
              <img className="" src="https://source.unsplash.com/random/1200x2001" alt="" />
            </div>
          </div>
        </section>
        <section className="split-card w-screen min-h-screen h-screen relative flex bg-click-here-dark rounded-t-[5rem] overflow-hidden sticky top-[106px]">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-start-1 col-end-7 p-24 bg-click-here-services-t3">
              <h2 className="mb-[50px]">Development</h2>
              <p className="w-9/12 mb-[50px]">Your website is the shop window for all customers. You often see good designs poorly implemented. We pride ourselves on providing quality builds which are easy to maintain and manage.</p>
              <div className="flex flex-col"><a href="#" className="ch-btn block hover:bg-click-here-dark hover:text-white ease-in-out duration-300">Learn More &nbsp; →</a></div>
            </div>
            <div className="h-min mb-4 relative group col-start-7 col-end-13">
              <img className="" src="https://source.unsplash.com/random/1200x2002" alt="" />
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

import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useState, useRef } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  const textRef = useRef([]);
  const imageRef = useRef([]);
  const triggerRef = useRef(null);

  textRef.current = [];
  imageRef.current = [];

  const addToImageRefs = el => {
    if (el && !imageRef.current.includes(el)) {
      imageRef.current.push(el);
    }
  };

  const addToTextRefs = el => {
    if (el && !textRef.current.includes(el)) {
      textRef.current.push(el);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    textRef.current.forEach((el, index) => {
      const tl = gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          delay: .5,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "center center",
            scrub: true,
            markers: false,
            onUpdate: ({ progress }) => {
              // console.log(progress);
            }
          }
        }
      )
      return () => {
        tl.kill();
      };
    });
  }, []);

  useEffect(() => {
    imageRef.current.forEach((el, index) => {
      const tl = gsap.fromTo(
        el,
        { y: 50, scale: .9 },
        {
          duration: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
            onUpdate: ({ progress }) => {
              // console.log(progress);
            }
          }
        }
      )
      return () => {
        tl.kill();
      };
    });
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
      <section ref={triggerRef}>
      	<div className="dark:bg-teal-400">
      		<div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
      			<h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-gray-900">Provident blanditiis cum exercitationem</h1>
      			<p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
      			<div className="flex flex-wrap justify-center">
      				<button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50">Get started</button>
      				<button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-700 dark:text-gray-900">Learn more</button>
      			</div>
      		</div>
      	</div>
      	<img ref={addToImageRefs} src="https://source.unsplash.com/random/1400x600" alt="" className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-gray-500" />
        <article className="container max-w-1xl px-6 py-24 mx-auto space-y-16 text-gray-900">
        	<div className="w-full mx-auto space-y-4">
        		<h1 ref={addToTextRefs} className="text-5xl font-bold leadi">Interdum et malesuada fames ac ante ipsum primis in faucibus?</h1>
        		<div ref={addToTextRefs} className="flex flex-wrap space-x-2 text-sm text-gray-400">
        			<a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#MambaUI</a>
        			<a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#TailwindCSS</a>
        			<a rel="noopener noreferrer" href="#" className="p-1 hover:underline">#Angular</a>
        		</div>
        		<p ref={addToTextRefs} className="text-sm text-gray-900">by
        			<a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline text-violet-900">
        				<span>Leroy Jenkins</span>
        			</a>on
        			<time dateTime="2021-02-12 15:34:18-0200">Feb 12th 2021</time>
        		</p>
        	</div>
        	<div ref={addToTextRefs} className="text-gray-900">
        		<p>Insert the actual text content here...</p>
        	</div>
        </article>
      </section>
      <section className="py-14">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <img data-aos="fade" data-aos-delay="100" data-aos-duration="1000" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="md:max-w-lg sm:rounded-lg" alt="" />
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="text-indigo-600 font-semibold">
                            Professional services
                        </h3>
                        <p data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Build your SaaS solution with help from our experts
                        </p>
                        <p data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" className="mt-3 text-gray-600">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                        </p>
                        <a data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000" href="#" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section>
          <div className="relative overflow-hidden bg-white mb-5">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
              <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                  <h1 data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Summer styles are finally here
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className="mt-4 text-xl text-gray-500">
                    This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                    if you live or die.
                  </p>
                </div>
                <div>
                  <div className="mt-10">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"  className="flex items-center space-x-6 lg:space-x-8">
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000"
                      href="#"
                      className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Shop Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-14" id="fixed-elements">
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className="items-start gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div data-aos="fade-up" data-aos-duration="1000" className="flex-1 lg:block lg:sticky top-[50px] mb-[50px]">
                <img id="professionalImage" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="md:max-w-lg sm:rounded-lg" alt="" />
              </div>
              <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <h3 data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="text-teal-400 font-semibold">
                    Professional services
                </h3>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Build your SaaS solution with help from our experts
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" className="mt-3 text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </p>
                <a data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" href="#" className="inline-flex gap-x-1 items-center text-teal-400 hover:text-teal-500 duration-150 font-medium">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      <Footer />
    </>
  );
}

Component.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;

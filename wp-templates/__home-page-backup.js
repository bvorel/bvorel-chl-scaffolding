import { useEffect, useState, useRef, Suspense } from 'react';
import { gql } from "@apollo/client";
// import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";

import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, useTexture, shaderMaterial, GradientTexture, useCursor  } from "@react-three/drei"
import { easing } from 'maath';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import AOS from 'aos';
import 'aos/dist/aos.css';


export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
)

extend({ ImageFadeMaterial });



function FadingImage() {
  const ref = useRef()
  const [texture1, texture2, dispTexture] = useTexture(["/assets/DP_grayscale.jpg", "/assets/DP_maroon.jpg", "/assets/14.jpg"])
  const [hovered, setHover] = useState(false)
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.1)
  })
  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[16, 9]} />
      <imageFadeMaterial ref={ref} tex={texture1} tex2={texture2} disp={dispTexture} toneMapped={false} />
    </mesh>
  )
}

function ThumbImage({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const texture = useTexture(url)

  useFrame((state, delta) => {
    easing.damp(ref.current.material, 'distort', hovered ? 0.25 : 0, 0.25, delta)
    easing.damp(ref.current.material, 'speed', hovered ? 4 : 0, 0.25, delta)
    // easing.damp(ref.current.material.grayscale, hovered ? 1 : 0, 4, delta)
    easing.dampE(ref.current.rotation, [0, 0, 0], 0.25, delta)
    easing.damp3(ref.current.scale, 10, 0.25, delta)
    //easing.dampC(ref.current.material.color, hovered ? '#ef2060' : 'white', 1, delta)
    // ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 1 : 0, delta)
  })

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={(e) => (e.stopPropagation(), hover(false))}
      {...props}>
      <planeGeometry args={[16, 9]} />
      <MeshDistortMaterial map={texture} speed={2} toneMapped={false} />
    </mesh>
  )
}

function Flag({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const texture = useTexture(url)
  useCursor(hovered)
  useFrame(() => {
    ref.current.distort = THREE.MathUtils.lerp(ref.current.distort, hovered ? 0.25 : 0, hovered ? 0.05 : 0.01)
    // ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, delta)
  })
  return (
    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}  {...props}>
      <planeGeometry args={[16, 9]} />
      <MeshDistortMaterial ref={ref} speed={5} map={texture} />
    </mesh>
  )
}

export default function Component(props) {

  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  const textRef = useRef([]);
  const imageRef = useRef([]);
  const workImageRef = useRef([]);
  const triggerRef = useRef(null);
  const bannerRef = useRef([]);

  textRef.current = [];
  imageRef.current = [];
  workImageRef.current = [];

  const addToImageRefs = el => {
    if (el && !imageRef.current.includes(el)) {
      imageRef.current.push(el);
    }
  };

  const addToWorkImageRefs = el => {
    if (el && !workImageRef.current.includes(el)) {
      workImageRef.current.push(el);
    }
  };

  const addToTextRefs = el => {
    if (el && !textRef.current.includes(el)) {
      textRef.current.push(el);
    }
  };

  const addToBannerRefs = el => {
    if (el && !bannerRef.current.includes(el)) {
      bannerRef.current.push(el);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  {/*useEffect(() => {
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
  }, []);*/}

  {/*useEffect(() => {
    imageRef.current.forEach((el, index) => {
      const tl = gsap.fromTo(
        el,
        { y: 50, scale: 1 },
        {
          duration: 1,
          y: 0,
          scale: .9,
          scrollTrigger: {
            trigger: el,
            start: "top 20%",
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
  }, []);*/}

  {/*useEffect(() => {
    gsap.set('.work-image', {yPercent:100});
    gsap.to(".work-image", {
      yPercent:-100,
      stagger: 2,
      duration: 1,
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 0%",
        end: "+=90%",
        scrub: true,
        markers: true,
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-image',
        scrub: true
      }
    })
    .to('.work-image', {
      stagger: .9,
      y: -800,
      scrub: true
    })
  }, []);*/}


  useEffect(() => {
    bannerRef.current.forEach((el, index) => {
      const tl = gsap.fromTo(
        el,
        { x: 0 },
        {
          duration: 1,
          ease: "linear",
          x: '-50%',
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            end: "bottom top",
            scrub: 3,
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

      {/*<section className="work-section bg-click-here-dark flex min-h-screen h-screen">
      <Canvas camera={{ position: [0, 0, 50], fov: 100 }}>
        <ambientLight intensity={1} />
        <ThumbImage url="/assets/DP_maroon.jpg" position={[0, 0, 0]} />
      </Canvas>
      </section>*/}

      <section className="hero w-screen min-h-screen h-screen flex items-center justify-start bg-click-here-medium">
        <div className="absolute container">
          <h1 data-aos="fade-up" data-aos-duration="1000" className="text-white text-start uppercase w-11/12 px-10">We Champion Design, Collaboration, and Creativity.</h1>
        </div>
      </section>
      <section id="textBanner" className="text-banner py-5 bg-click-here-teal">
        <div ref={addToBannerRefs} className="flex flex-nowrap whitespace-nowrap">
          <p>Full-service digital agency</p>
          <p>All in-house disciplines</p>
          <p>local and national work</p>
          <p>Full-service digital agency</p>
          <p>All in-house disciplines</p>
          <p>local and national work</p>
        </div>
      </section>
      <section className="about-us flex min-h-screen h-screen items-center justify-center bg-click-here-dark">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="flex flex-col">
              <h2 data-aos="fade-up" data-aos-duration="1000" className="mb-[0px] thin">We are</h2>
              <h2 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="500" className="mb-[50px] thick">Click Here Labs.</h2>
            </div>
            <div className="flex flex-col">
              <h3 data-aos="fade-up" data-aos-duration="1000" className="mb-[47px]">An Innovative Digital Design & Marketing Agency.</h3>
              <p data-aos="fade-up" data-aos-duration="1000" className="mb-[56px]">We are a creative team of designers and developers, crafting transformative solutions in the heart of Dallas. We believe a successful brand is the combination of different elements. As a production lab, we use a multi-disciplined approach to achieve enduring results.</p>
              <a data-aos="fade-up" data-aos-duration="1000" href="#" className="ch-btn block hover:bg-click-here-teal ease-in-out duration-300">
                More About Us &nbsp; →
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="our-services flex min-h-screen h-screen items-center justify-center bg-click-here-dark">
        <div className="container">
          <div data-aos="fade-in" data-aos-duration="1000" className="headline border-b-2 border-click-here-teal mb-[35px]">
            <h2 className="services-headline">Our Services</h2>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="col-start-1 col-end-4 flex flex-col">
              <h3  data-aos="fade-up" data-aos-duration="1000"className="mb-[30px] thin text-click-here-teal">There’s no one-size-fits-all.</h3>
              <p  data-aos="fade-up" data-aos-duration="1000"className="mb-[56px]">We adapt our services to the problem we’re solving. We have our in-house production team to get the results you’re looking for.</p>
              <a  data-aos="fade-up" data-aos-duration="1000"href="#" className="ch-btn block hover:bg-click-here-teal ease-in-out duration-300">
                See All Capabilities &nbsp; →
              </a>
            </div>
            <div className="col-start-6 col-end-13">
              <div className="grid grid-cols-12 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8 sm:ps-[65px]">
                <ul className="services">
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">Websites</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">Online Advertising</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">Web-Based Applications</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">Digital Analytics</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">New & Emerging Tech</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="250">Mobile</li>
                </ul>
                <ul className="services">
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Search/SEO</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Digital Design</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Motion Graphics</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Branding</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Email Marketing</li>
                  <li data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">Maintenance & Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="work-section bg-click-here-dark">
        <div className="px-10 py-32 flex items-center justify-center">
        <Canvas className="aspect-video" camera={{ position: [0, 0, 5], fov: 100 }}>
          <FadingImage />
        </Canvas>
        </div>
      </section>*/}

      <section className="work-section bg-click-here-dark">
        <div className="px-10 py-32 flex items-center justify-center">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-start-1 col-end-9">
              <div className="my-32">
                <div className="h-min overflow-hidden rounded-[1rem] mb-4 relative group;
">
                  {/*<img className="group-hover:scale-105 transition-all duration-700 cursor-pointer grayscale group-hover:grayscale-0" src="https://cms.clickherelabs.com/wp-content/uploads/2020/05/DP_maroon.jpg" alt="" />*/}
                  <Canvas className="aspect-video" camera={{ position: [0, 0, 3], fov: 100 }}>
                    <FadingImage />
                  </Canvas>
                  <a href="#" className="absolute bottom-0 left-0 m-4 opacity-0 group-hover:opacity-100 ch-btn block hover:bg-click-here-teal ease-in-out duration-700">
                    See Case Study &nbsp; →
                  </a>
                </div>
                <span className="text-lg text-gray-700">Website</span>
                <h3 className="text-3xl py-3">Dr Pepper</h3>
              </div>
            </div>

            <div className="col-start-5 col-end-13">
              <div className="my-32">
                {/*<Canvas className="aspect-video" camera={{ position: [0, 0, 40], fov: 100 }}>
                  <ambientLight intensity={1} />
                  <ThumbImage url="/assets/DP_maroon.jpg" position={[-2, 0, 0]} />
                </Canvas>*/}
                <Canvas className="aspect-video" camera={{ position: [0, 0, 4], fov: 100 }}>
                  <ambientLight />
                  <Flag url="/assets/DP_maroon.jpg" position={[0, 0, 0]}/>
                </Canvas>
                <div className="h-min overflow-hidden rounded-[1rem] mb-4 relative group">
                  {/*<img className="group-hover:scale-105 transition-all duration-700 cursor-pointer grayscale group-hover:grayscale-0" src="https://cms.clickherelabs.com/wp-content/uploads/2020/01/Choctaw_dark.jpg" alt="" />*/}
                  <a href="#" className="absolute bottom-0 left-0 m-4 opacity-0 group-hover:opacity-100 ch-btn block hover:bg-click-here-teal ease-in-out duration-700">
                    See Case Study &nbsp; →
                  </a>
                </div>
                <span className="text-lg text-gray-700">Website</span>
                <h3 className="text-3xl py-3">Choctaw Casinos</h3>
              </div>
            </div>
            <div className="col-start-1 col-end-9">
              <div className="my-32">
                <div className="h-min overflow-hidden rounded-[1rem] mb-4 relative group">
                  <img className="group-hover:scale-105 transition-all duration-700 cursor-pointer grayscale group-hover:grayscale-0" src="https://cms.clickherelabs.com/wp-content/uploads/2020/01/7upHeroImage_dark.jpg" alt="" />
                  <a href="#" className="absolute bottom-0 left-0 m-4 opacity-0 group-hover:opacity-100 ch-btn block hover:bg-click-here-teal ease-in-out duration-700">
                    See Case Study &nbsp; →
                  </a>
                </div>
                <span className="text-lg text-gray-700">Website</span>
                <h3 className="text-3xl py-3">Digital Bartender</h3>
              </div>
            </div>
            <div className="col-start-5 col-end-13">
              <div className="my-32">
                <div className="h-min overflow-hidden rounded-[1rem] mb-4 relative group">
                  <img className="group-hover:scale-105 transition-all duration-700 cursor-pointer grayscale group-hover:grayscale-0" src="https://cms.clickherelabs.com/wp-content/uploads/2020/01/Raytheon.jpg" alt="" />
                  <a href="#" className="absolute bottom-0 left-0 m-4 opacity-0 group-hover:opacity-100 ch-btn block hover:bg-click-here-teal ease-in-out duration-700">
                    See Case Study &nbsp; →
                  </a>
                </div>
                <span className="text-lg text-gray-700">Website</span>
                <h3 className="text-3xl py-3">Raytheon</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="more-projects-banner bg-click-here-dark">
        <div className="container">
          <div className="flex items-center justify-center">
            <h3>Wait, there’s more!</h3>
            <div className="flex grow items-center justify-center">
              <hr className="ms-10"/>
              <a href="#" className="ms-10 ch-btn block hover:bg-click-here-teal ease-in-out duration-300 flex flex-nowrap w-[270px]">
                See More Projects&nbsp;→
              </a>
            </div>
          </div>
        </div>
      </section>
      {/*<section className="work-section flex items-center justify-center bg-click-here-dark">
        <div className="">
          <div className="min-h-screen h-screen headline text-white text-center text-[16vw] whitespace-nowrap px-0 lg:block lg:sticky top-1/3">Our Work</div>
          <div className="container">
            <div className="px-4 space-y-3 mt-6 sm:px-0 md:mt-0 pb-[100px]">
              <div className="lg:col-span-12">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-start-1 col-end-5">
                    <Image ref={addToWorkImageRefs} className="work-image my-[200px]" width="1200" height="2000" src="https://source.unsplash.com/random/1200x2000" alt="Pic"/>
                  </div>
                  <div className="col-start-4 col-end-9">
                    <Image ref={addToWorkImageRefs} className="work-image my-[200px]" width="1200" height="2000" src="https://source.unsplash.com/random/1200x2000" alt="Pic"/>
                  </div>
                  <div className="col-start-8 col-end-13">
                    <Image ref={addToWorkImageRefs} className="work-image my-[200px]" width="1200" height="2000" src="https://source.unsplash.com/random/1200x2000" alt="Pic"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}
      {/*<div id="orangeDiv" className="fixed top-0 left-0 bottom-0 right-0 h-screen bg-click-here-dark -z-50"></div>*/}

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

import { gql } from "@apollo/client";
import Image from 'next/image';
import Link from "next/link";
import style from "./header.module.css";

export default function Header({ siteTitle, siteDescription, menuItems }) {
  return (
    <>
    <section aria-labelledby="navigation" id="navigation" className="fixed z-50 w-full overflow-hidden border-b relatve bg-click-here-dark/75 border-white/5 backdrop-blur-2xl lg:bg-click-here-dark/75">
      <div className="relative w-full mx-auto px-10">
        <div x-data="{ open: false }" className="relative flex flex-col w-full py-5 mx-auto items-center md:justify-between md:flex-row">
          <div className="flex flex-row items-center justify-between text-white lg:justify-start">
            <a href="/" className="lg:pr-8 flex items-center">
              <div className="inline-flex items-center gap-3">
                <Image width='278' height='25' src="/assets/CHL_Logo.png" alt="" className="" />
              </div>
            </a>
            <button className="inline-flex items-center justify-center p-2 text-white hover:text-indigo-400 focus:outline-none focus:text-white md:hidden">
              <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex-col items-center flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row">
            <ul className="flex-col items-center flex-grow md:flex md:justify-end md:flex-row">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link className="link px-2 py-2 text-sm font-normal text-white lg:px-6 md:px-3 hover:text-white/50" href={item.uri}>{item.label}</Link>
                </li>
              ))}
              
            </ul>



            <div className="flex flex-col">
              <a href="#" className="ch-btn block hover:bg-click-here-teal ease-in-out duration-300">
                Let's Connect &nbsp; →
              </a>
            </div>

          </nav>
        </div>
      </div>
    </section>


      {/*<header className={style.header}>
        <div className="container">
          <Link href="/" className={style.brand}>strokeLinecap
            <h2 className={style.siteTitle}>{siteTitle}</h2>
            <p className={style.siteDescription}>{siteDescription}</p>
          </Link>

          <nav className={style.nav}>
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.uri}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>*/}
    </>
  );
}

Header.fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
};

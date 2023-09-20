import styles from "./footer.module.css";
import { faInstagram, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image';
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  return (
    <footer className="px-4 py-8 mt-[50px]">
      <div className="container pt-[75px] mb-[30px]">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div className="sm:pe-[180px] border-e-[1px] border-[#262626]">
            <h2 className="mb-[50px]">Let's work together</h2>
            <p>We are ready with expertise, ideas, and advice. Contact us on how to start your project.</p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8 sm:ps-[65px]">
            <div>
              <div className="link-title">The Company</div>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Work</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="link-title">The Services</div>
              <ul>
                <li><a href="#">Strategy</a></li>
                <li><a href="#">Digital Design</a></li>
                <li><a href="#">Motion Design</a></li>
                <li><a href="#">Development</a></li>
                <li><a href="#">SEO</a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Web Accessibility</a></li>
              </ul>
            </div>
            <div>
              <div className="link-title">Follow </div>
              <div className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faXTwitter} />
                <FontAwesomeIcon icon={faLinkedinIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-[30px] mb-[30px] pb-[115px]">
        <div className="flex items-center grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div className="flex flex-col">
            <a href="#" className="ch-btn block hover:bg-click-here-teal ease-in-out duration-300 flex flex-row flex-nowrap content-center justify-center">
              Let's Connect &nbsp; <ArrowRightIcon className="h-6 w-6 text-click-here-dark" />
            </a>
          </div>
          <div className="sm:ps-[65px]">
            <a href="/" className="lg:pr-8 flex items-center">
              <div className="inline-flex items-center gap-3">
                <Image width='278' height='25' src="/assets/CHL_Logo.png" alt="" className="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0 pt-[30px] border-t-[1px] border-[#262626]">
    		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
    			<div className="flex items-center justify-center ">
    				<p className="copywrite">© 2023 Click Here Labs </p>
    			</div>
    		</div>
    	</div>
    </footer>
  );
}

import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import "../styles/globals.css";
import "../styles/main.scss";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </ReactLenis>

  );
}

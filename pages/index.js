'use client';
import Head from 'next/head'
import { useEffect } from 'react';
import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { ThemeProvider } from "next-themes"

export default function Page(props) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <>
      <ThemeProvider attribute="class">
        <WordPressTemplate {...props} />
      </ThemeProvider>
      {/*<ReactLenis root>
        <WordPressTemplate {...props} />;
      </ReactLenis>*/}
    </>
  )
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}

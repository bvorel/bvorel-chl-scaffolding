import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/sxi8aju.css" />
      </Head>
      <body className="overflow-x-hidden">
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}

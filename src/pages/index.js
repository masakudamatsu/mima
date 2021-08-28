import Head from 'next/head';
import {index} from 'src/utils/metadata';
import Map from 'src/components/Map';
import Noscript from 'src/components/Noscript';

function HomePage() {
  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <Map />
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;

import "../styles/globals.css"; // Import global styles
import Layout from "../components/Layout";

export default function Home({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}


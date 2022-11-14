import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";
import DAO from "../components/DAO";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DAO</title>
        <meta name="description" content="DAO contracat" />
      </Head>
      <Header />
      <DAO />
      <Footer />
    </div>
  );
}

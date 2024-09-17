import React from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from '../../components/Layout/layout';
import Macadam from '@/components/list/macadam/macadam';
import Delivery from '@/components/list/delivery/delivery';
import Dump from '@/components/list/dump/dump'
import styles from './styled.module.css';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

function ProductPage() {
  const router = useRouter();
  const category = router.query.category || 'default';

  const components = {
    'щебень': Macadam,
    'доставка': Delivery,
    'самосвал': Dump
    // Здесь можно добавить другие компоненты
  };

  const Component = components[category.toLowerCase()] || (() => <div>Компонент не найден</div>);

  return (
    <>
      <Head>
        <title>TechnoGroup</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={inter.className}>
          <Component />
        </div>
      </Layout>
    </>
  );
}

export default ProductPage;

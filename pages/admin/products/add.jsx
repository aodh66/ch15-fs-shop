// import { useContext } from 'react'
import Head from "next/head";
import { useRouter } from 'next/navigation';
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import { Button, EditIcon } from '@/components/mui'
import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import QueryBoundaries from "@/components/QueryBoundaries";
import ProductList from "@/components/ProductList";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";


import ProductForm from "@/components/forms/ProductForm";
import { useAdd } from "@/lib/tq/products/mutations"

// const inter = Inter({ subsets: ['latin'] })
export default function AddProduct() {
  const router = useRouter();
  const addMutation = useAdd();

  const submitHandler = (data) => {
    addMutation.mutate(data);
    router.push("/admin/products/");
  };
  //   const {
  //     showMessage
  //   } = useContext(UIContext)
  return (
    <>
      <Head>
        <title>Aidan Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h1">Add Product</Heading>
        
        <ProductForm submitHandler={submitHandler} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
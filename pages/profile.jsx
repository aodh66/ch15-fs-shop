// import { useContext } from 'react'
import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button, EditIcon } from '@/components/mui'
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import QueryBoundaries from "@/components/QueryBoundaries";
// import ProductList from "@/components/ProductList";
import UserDisplay from "@/components/UserDisplay";
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";
// import { UIContext } from '@/components/contexts/UI.context';


// const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  // const {
  //   showMessage
  // } = useContext(UIContext)
  return (
    <>
      <Head>
        <title>Aidan Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component='h2'>Profile</Heading>
        
        {/* <Button variant="contained" onClick={() => showMessage({
          type: 'error',
          string: 'You clicked the toast test button.'
        })}><EditIcon />Toast Test Button</Button> */}
        <QueryBoundaries>
          <UserDisplay />
        </QueryBoundaries>
        <Paragraph>There should be products above here, or you borked the DB connection.</Paragraph>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const products = await fetchProducts().catch((err) => console.log(err));
  const queryClient = new QueryClient();

  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
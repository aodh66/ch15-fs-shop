// import {useContext} from 'react'
import Head from "next/head";

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getUserBasketQuery } from "@/lib/api-functions/server/baskets/queries";
import { useRemoveFromBasket } from "@/lib/tq/baskets/mutations";
import { USER_BASKET_STORAGE_KEY } from "@/lib/tq/baskets/settings";

import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import QueryBoundaries from "@/components/QueryBoundaries";
import BasketList from "@/components/BasketList";
import BasketTotal from "@/components/BasketTotal";
import backgroundImg from "@/images/mountain_color.jpg";

export default function BasketPage({ basket }) {
  const mutation = useRemoveFromBasket();
  const deleteHandler = (id) => mutation.mutate(id);
  return (
    <div style={{
      backgroundImage: `url(${backgroundImg.src})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100vw",
      height: "100vh"}}>
      <Head>
        <title>Eclectic Shop | Your Basket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h1" sx={{ color: "white" }} >Your Basket</Heading>

        <QueryBoundaries>
          <BasketTotal />
        </QueryBoundaries>

        <QueryBoundaries>
          <BasketList deleteHandler={deleteHandler} />
        </QueryBoundaries>
      </Layout>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const { user } = await getSession(context.req, context.res);
    const basket = await getUserBasketQuery(user.sub, false);

    const queryClient = new QueryClient();

    await queryClient.setQueryData(
      [USER_BASKET_STORAGE_KEY],
      JSON.parse(JSON.stringify(basket))
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
});
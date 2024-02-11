import Head from 'next/head'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading';
import ContactForm from '@/components/forms/ContactForm';
import { sendEmail } from '@/lib/api-functions/client/';
import backgroundImg from "@/images/mountain_med.jpg";
  
export default function Contact() {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImg.src})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100vw",
      height: "100vh"}}>
      <Head>
        <title>Contact Eclectic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component='h2'>Contact Us</Heading>
        <ContactForm submitHandler={sendEmail}/>
      </Layout>
    </div>
  )
}

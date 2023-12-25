import React from 'react';
import Hero from './../components/Hero';
import OurProduct from './../components/OurProduct';
import Footer from './../components/Footer';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero/> 
      <About img="/img/ilham-rendi.jpeg">
      Kami didirikan dengan tujuan untuk mempromosikan kebiasaan membaca dan menciptakan ruang yang nyaman bagi semua orang yang mencintai dunia literatur. Dengan lebih dari satu dekade pengalaman dalam industri ini, kami telah menjadi bagian integral dari komunitas pembaca lokal.
      </About>
      <OurProduct/>
      <Contact width="100%" inputHeight="4rem" textAreaHeight="12rem" text="Hubungi kami untuk bantuan atau pertanyaan. Kami ingin mendengar dari Anda!" buttonText="Kirim"/> 
      <Footer/>
    </>
  );
}

export default Home;
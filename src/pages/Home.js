import React from 'react';
import Hero from './../components/Hero';
import OurProduct from './../components/OurProduct';
import Footer from './../components/Footer';
import { About } from '../components/About';

const Home = () => {
  return (
    <>
      <Hero/> 
      <About img="/img/ilham-rendi.jpeg">
      Kami didirikan dengan tujuan untuk mempromosikan kebiasaan membaca dan menciptakan ruang yang nyaman bagi semua orang yang mencintai dunia literatur. Dengan lebih dari satu dekade pengalaman dalam industri ini, kami telah menjadi bagian integral dari komunitas pembaca lokal.
      </About>
      <OurProduct/>
      <Footer/>
    </>
  );
}

export default Home;
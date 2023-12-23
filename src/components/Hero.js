import React, { useContext } from 'react';
import './../styles/hero.css';
import './../styles/reset.css';
import { FunctionsContext } from '../App';

const Hero = () => {  
  const {ourProductsRef} = useContext(FunctionsContext)

  const scrollToElement = () => {
    if (ourProductsRef.current) {
      ourProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-container">
        <div className="info">
          <h1>Jelajahi, Baca, Temukan</h1>
          <p>Sambut Petualangan Literer di Toko Buku kami. Temukan Cerita Penuh Misteri dan Keajaiban.</p>
          <div className="buttons">
             <button onClick={scrollToElement}>Shop Now</button>
          </div>
        </div>
        <figure className="hero-image">
           <img src="/img/image4.jpg" alt="Laptop"/> 
        </figure>
      </div>
    </section>
  );
}

export default Hero;
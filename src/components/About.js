import React from 'react'
import aboutStyles from '../styles/about.module.css'

export const About = ({children, img}) => {
  return (
    <section className={aboutStyles.about} id='about-us'>
       <div className={aboutStyles.texts}>
          <h2>About Us</h2>
          <p>{children}</p>
       </div>
       <img src={img} alt="about us" className={aboutStyles.image}/>
    </section>
  )
}

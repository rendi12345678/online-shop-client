import React from "react";
import contactStyles from "../styles/contact.module.css";

export const Contact = ({
  width,
  inputHeight,
  text,
  buttonText,
  textAreaHeight,
}) => {
  const inputStyle = {
    height: inputHeight,
  };

  return (
    <section className={contactStyles.contact} style={{ width: width }}>
      <div className={contactStyles["contact-title"]}>
        <h2>Contact Us</h2>
        <p>{text}</p>
      </div>
      <form action="http://localhost:5000/api/send-email" method="POST">
        <label htmlFor="nama">
          Nama <br />
          <input
            type="text"
            name="nama"
            id="nama"
            required
            style={inputStyle}
          />
        </label>
        <label htmlFor="email">
          Email <br />
          <input
            type="text"
            name="email"
            id="email"
            required
            style={inputStyle}
          />
        </label>
        <label htmlFor="pesan">
          Pesan <br />
          <textarea
            required
            name="pesan"
            id="pesan"
            style={{ height: textAreaHeight }}
          ></textarea>
        </label>
        <button>{buttonText}</button>
      </form>
    </section>
  );
};

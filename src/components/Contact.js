import React, {useState} from "react";
import contactStyles from "../styles/contact.module.css";
import axios from "axios"

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
  
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: ""
  })
  
  const [errors, setErrors] = useState({
    errorNama: "",
    errorEmail: "",
    errorPesan: ""
  })
  
  const [sendDataMsg, setSendDataMsg] = useState("")
  
  const [status, setStatus] = useState("pending")
  
  const handleInputChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
    
    setStatus("pending")
    setSendDataMsg("")
    
    setErrors(prevErrors => ({...prevErrors, errorNama: "", errorEmail: "", errorPesan: ""}))
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
    const response = await axios.post("https://lovely-tan-dove.cyclic.app/api/send-email", formData)
      
      if(!response.data.success) {
          response.data.errors.map(error =>
          setErrors(prevErrors => (
          {...prevErrors, [`error${error.path.charAt(0).toUpperCase()}${error.path.slice(1)}`]: error.msg}
        )))
        
        setStatus("error")
        return
      }
      
      setSendDataMsg("Pesan terkirim!")
      setStatus("success")
      console.log("Sended data to server successfully!")
    } catch(err) {
      setStatus("gagal")
      setSendDataMsg("Pesan gagal terkirim!")
      console.log("Failed send data ro server:", err)
    }
  }

  return (
    <section className={contactStyles.contact} style={{ width: width }} id="contact-us">
      <div className={contactStyles["contact-title"]}>
        <h2>Contact Us</h2>
        <p>{text}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nama">
          Nama <br />
          <input
            type="text"
            name="nama"
            id="nama"
            onChange={handleInputChange}
            required
            value={formData.nama}
            style={inputStyle}
          /> <br/>
          {
            errors.errorNama !== "" && (<p>{errors.errorNama}</p>)
          }
        </label>
        <label htmlFor="email">
          Email <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={formData.email}
            required
            style={inputStyle} 
          />
          <br/>
          {
            errors.errorEmail !== "" && (<p>{errors.errorEmail}</p>)
          }
        </label>
        <label htmlFor="pesan">
          Pesan <br />
          <textarea
            required
            value={formData.pesan}
            onChange={handleInputChange}
            name="pesan"
            id="pesan"
            style={{ height: textAreaHeight }}
          ></textarea> 
          <br/>
          {
            errors.errorPesan !== "" && (<p>{errors.errorPesan}</p>)
          }
        </label>
        <button style={(sendDataMsg !== "" && status === "success") ? {background: "green", color: "#fff", opacity: "1"} : status === "gagal" ? {background: "red", opacity: "1", color: "#fff"} : {background: "var(--blue-color)", opacity: "1", color: "#fff"}}>{sendDataMsg !== "" ? sendDataMsg : buttonText}</button>
      </form>
    </section>
  );
};

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_gd8r88l',      // Replace with your EmailJS Service ID
        'template_xi6r4sf',     // Replace with your EmailJS Template ID
        form.current,
        'VRJ2YpUTWt7NOJhae'       // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          console.log(result.text);
        },
        (error) => {
          alert('Failed to send message. Try again.');
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact">
      <h4>CONTACT US</h4>
      <h2>Get in Touch</h2>
      <div className="contact-wrapper">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <h4>Raynex Power Solution Pvt. Ltd.</h4> 
          <p>📍 806, Sarthana Business Hub,<br />near Taxshila classes, surat-395006</p>
          <p>📞 +91 82001 97199</p>
          <p>✉ info@raynex.com</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;

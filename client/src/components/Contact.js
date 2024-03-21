import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import '../styles/ContactStyle.css';
import Navbar from './Navbar';
import Footer from './Footer';

export const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        const requiredFields = ['user_name', 'user_email', 'message'];
        for (const fieldName of requiredFields) {
            if (!form.current[fieldName].value) {
                // Display an error notification if any required field is empty
                toast.error(`Please fill in the required fields`, {
                    position: 'top-right',
                    style: {
                        marginTop: '70px',
                        cursor: 'pointer',
                        transition: 'opacity 2s ease-in',
                    }
                });
                return;
            }
        }

        try {
            // Displaying a notification while sending the message
            toast.info('Sending message...', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                }
            });

            const result = await emailjs.sendForm('service_ProjektiLab1', 'template_wdwnt9j', form.current, 'SUFff_EJ-PNqCxJ92');

            // Close the previous notification
            toast.dismiss();

            // Display a success notification
            toast.success('Email sent successfully!', {
                position: 'top-right',
                style: {
                    marginTop: '70px',
                    cursor: 'pointer',
                    transition: 'opacity 2s ease-in',
                }
            });

            // Reset the form
            form.current.reset();

            console.log(result.text);
        } catch (error) {
            // Close the previous notification
            toast.dismiss();

            // Display an error notification
            toast.error('Failed to send email. Please try again.');

            console.error(error.text);
        }
    };

    return (
        <>
            <Navbar />
            <div className='emailContainer'>
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    <h2 className='title'>Contact Us</h2>
                    <div className="form-group">
                        <label className='label' htmlFor="user_name">Name</label>
                        <input type="text" id="user_name" name="user_name" />
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="user_email">Email</label>
                        <input type="email" id="user_email" name="user_email" />
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="4" />
                    </div>
                    <button className='button' type="submit">Send Message</button>
                </form>
            </div>
            <Footer />
        </>
    );
};
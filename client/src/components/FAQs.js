import React, { useState } from "react"
import "../styles/FAQsStyle.css"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function FAQItem() {
    const [faqs, setFaqs] = useState([
        {
            question: "What products does Ruby offer?",
            answer: "Ruby offers a wide range of clothing items, including jackets, shirts, pants, accessories, and more.",
            open: true,
        },
        {
            question: "Does Ruby provide international shipping?",
            answer: "Yes, Ruby provides international shipping services to customers worldwide.",
            open: false,
        },
        {
            question: "How can I contact customer support?",
            answer: "You can contact Ruby's customer support team via email at support@ruby.com or through the Contact Us page on the website.",
            open: false
        },
        {
            question: "What payment methods does Ruby accept?",
            answer: "Ruby accepts various payment methods, including credit/debit cards (via Stripe) and Cash App.",
            open: false,
        },
        {
            question: "Is there a return or exchange policy?",
            answer: "Yes, Ruby has a hassle-free return and exchange policy. Please refer to the Returns & Exchanges page on the website for more details.",
            open: false,
        }
    ])

    const toggleFAQ = index => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    return { ...faq, open: !faq.open };
                } else {
                    return { ...faq, open: false };
                }
            })
        )
    }

    return (
        <div className="FAQItem">
            <div className="faqs">
                <h2 className="faqs-header">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                ))}
            </div>

            <div style={{ marginTop: "250px" }}></div>
            <Footer />
        </div>
    )
}

const FAQ = ({ faq, index, toggleFAQ }) => {
    return (
        <div
            className={"faq " + (faq.open ? "open" : "")}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <Navbar />
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
        </div>
    )
}
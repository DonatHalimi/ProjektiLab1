import React from 'react'
import '../styles/TestimonialStyle.css'

const Testimonials = () => {
    return (
        <div className="testimonials-container">
            <h1 className="testimonials-header">Discover Customer Stories</h1>
            <p className="testimonials-subheader">Explore the joy of stylish clothing through our customers' experiences at Ruby.</p>
            <div className="testimonials-grid">
                <div className="testimonial testimonial-small">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">Ella James</h3>
                        <p className="testimonial-quote">"Ruby has the most beautiful collection of dresses! I recently bought a stunning evening gown, and I felt like a princess at my friend's wedding. Thank you, Ruby!"</p>
                    </div>
                </div>
                <div className="testimonial testimonial-large">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">Oliver Smith</h3>
                        <p className="testimonial-quote">"I'm impressed by the quality of clothing at Ruby. Their shirts fit perfectly, and the fabric feels amazing. I'll definitely be coming back for more!"</p>
                    </div>
                </div>
                <div className="testimonial testimonial-small">
                    <img src="https://i.pravatar.cc/100?img=3" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">John Doe</h3>
                        <p className="testimonial-quote">"Ruby is my go-to store for trendy outfits. I love their range of pants and jackets. Every piece I buy from Ruby becomes my new favorite!"</p>
                    </div>
                </div>
                <div className="testimonial testimonial-large">
                    <img src="https://i.pravatar.cc/100?img=10" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">Emma Brown</h3>
                        <p className="testimonial-quote">"I adore Ruby's selection of accessories! Their scarves and handbags add the perfect finishing touch to any outfit. Ruby has become my fashion sanctuary!"</p>
                    </div>
                </div>
                <div className="testimonial testimonial-small">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">Noah Wilson</h3>
                        <p className="testimonial-quote">"I'm a loyal customer of Ruby because of their excellent customer service. The staff is always friendly and helpful, making my shopping experience delightful every time."</p>
                    </div>
                </div>
                <div className="testimonial testimonial-large">
                    <img src="https://i.pravatar.cc/100?img=9" alt="Customer" className="testimonial-img" />
                    <div className="testimonial-content">
                        <h3 className="testimonial-name">Ava Johnson</h3>
                        <p className="testimonial-quote">"Ruby's clothing quality is unmatched! I've purchased several outfits for different occasions, and they've all exceeded my expectations. Thank you for keeping me stylish, Ruby!"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials

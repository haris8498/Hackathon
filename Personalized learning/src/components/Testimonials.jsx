import React from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah K.',
            title: 'Free name',
            quote: 'Saving time to reinvest back my business another this year, could and learn 2x faster.',
            delay: 1.1
        },
        {
            name: 'Alex M.',
            title: 'Free name',
            quote: 'finally understanding React I saw! Learn staying tip to see more conversions, bit a people reintervention again.',
            delay: 1.3
        },
        {
            name: 'Sarah P.',
            title: 'Free name',
            quote: '',
            delay: 1.5
        }
    ];

    return (
        <section className="testimonials">
            <div className="container">
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            name={testimonial.name}
                            title={testimonial.title}
                            quote={testimonial.quote}
                            delay={testimonial.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

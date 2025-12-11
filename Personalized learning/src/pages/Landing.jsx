import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import CTAButton from '../components/CTAButton';

const Landing = () => {
    return (
        <div className="landing-page">
            <Header />
            <main>
                <Hero />
                <Testimonials />
                <CTAButton />
            </main>
        </div>
    );
};

export default Landing;

import React from 'react';
import ArtifactCarousel from './ArtifactCarousel';
import MuseumPartners from './MuseumPartners';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    return (
        <div>
            <ArtifactCarousel></ArtifactCarousel>
            <MuseumPartners></MuseumPartners>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;
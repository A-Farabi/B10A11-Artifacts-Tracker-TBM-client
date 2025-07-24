import React from 'react';
import ArtifactCarousel from './ArtifactCarousel';
import MuseumPartners from './MuseumPartners';
import TestimonialsSection from './TestimonialsSection';
import FeaturedArtifacts from './FeaturedArtifacts';

const Home = () => {
    return (
        <div>
            <ArtifactCarousel></ArtifactCarousel>
            <FeaturedArtifacts></FeaturedArtifacts>
            <MuseumPartners></MuseumPartners>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;
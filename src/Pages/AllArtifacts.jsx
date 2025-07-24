import React from 'react';
import { useLoaderData } from "react-router";
import FeaturedArtifacts from '../Components/FeaturedArtifacts';
import { ToastContainer, toast } from 'react-toastify';

const AllArtifacts = () => {
    const artifacts = useLoaderData();
    
    // If artifacts is undefined or not an array
    if (!artifacts || !Array.isArray(artifacts)) {
        toast.error('Failed to load artifacts');
        return <div className="text-center py-12">No artifacts found</div>;
    }

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default AllArtifacts;
import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Artifacts Tracker`;
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Artifacts Tracker';
    };
  }, [title]); // Only re-run if title changes
};

export default useDocumentTitle;
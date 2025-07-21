import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "This platform has revolutionized how we document and share archaeological findings. The collaborative features are exceptional.",
      author: "Dr. Eleanor Chen",
      role: "Archaeology Professor, Cambridge University",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      quote: "As a museum curator, I appreciate how Artifact Tracker helps us digitize and contextualize our collections for global audiences.",
      author: "Marcus Johnson",
      role: "Senior Curator, Metropolitan Museum",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      quote: "Finding detailed information about obscure artifacts used to take weeks of research. Now it's just a few clicks away.",
      author: "Sarah Al-Mansoori",
      role: "PhD Candidate, Art History",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      id: 4,
      quote: "The community verification system ensures accuracy while allowing for diverse scholarly perspectives.",
      author: "Prof. David Müller",
      role: "Classical Studies, Heidelberg University",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Historians & Institutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from academics, curators, and contributors about their experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 text-indigo-400">
                <FaQuoteLeft className="text-3xl opacity-70" />
              </div>
              
              <p className="text-lg text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i}
                        className={`text-sm ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={()=>{
            alert('This Will be Available Soon')
          }} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
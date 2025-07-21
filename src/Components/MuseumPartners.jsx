import { FaUniversity, FaLandmark, FaMonument } from 'react-icons/fa';

const MuseumPartners = () => {
  const partners = [
    {
      id: 1,
      name: "British Museum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/British_Museum_logo.svg/1200px-British_Museum_logo.svg.png",
      url: "https://www.britishmuseum.org"
    },
    {
      id: 2,
      name: "Louvre Museum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_logo_%282015%29.svg/1200px-Louvre_Museum_logo_%282015%29.svg.png",
      url: "https://www.louvre.fr"
    },
    {
      id: 3,
      name: "Metropolitan Museum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Metropolitan_Museum_of_Art_Logo.svg/1200px-Metropolitan_Museum_of_Art_Logo.svg.png",
      url: "https://www.metmuseum.org"
    },
    {
      id: 4,
      name: "Egyptian Museum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Egyptian_Museum_logo.svg/1200px-Egyptian_Museum_logo.svg.png",
      url: "https://egyptianmuseumcairo.eg"
    },
    {
      id: 5,
      name: "Acropolis Museum",
      logo: "https://www.theacropolismuseum.gr/sites/default/files/logo_0.png",
      url: "https://www.theacropolismuseum.gr"
    },
    {
      id: 6,
      name: "National Museum of China",
      logo: "https://en.chnmuseum.cn/static/resources/custom/images/en_logo.png",
      url: "https://en.chnmuseum.cn"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Museum Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading institutions worldwide to bring you authentic historical artifacts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              title={partner.name}
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-12 object-contain max-w-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.classList.add('justify-center');
                    e.target.parentElement.innerHTML = `
                      <div class="text-gray-400 text-center">
                        <span class="text-3xl block mb-1">${partner.name.charAt(0)}</span>
                        <span class="text-xs">${partner.name}</span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <span className="text-3xl block mb-1">{partner.name.charAt(0)}</span>
                  <span className="text-xs">{partner.name}</span>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={()=>{
            alert('New Partnership Are not Available Currently, Try Later')
          } } className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Become a Partner
            <FaUniversity className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MuseumPartners;
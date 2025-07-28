import { FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1A3A6F] text-[#D4AF37] py-8 text-center font-sans">
      {/* Logo/Title */}
      <h3 className="text-xl mb-4">Artifacts Tracker</h3>

      {/* Divider */}
      <hr className="border-dashed border-[#D4AF37] w-1/2 mx-auto my-4" />

      {/* Quick Links */}
      <div className="flex justify-center gap-8 mb-4">
        <Link to="/" className="hover:text-[#B35900] hover:underline">Home</Link>
        <Link to="/all-artifacts" className="hover:text-[#B35900] hover:underline">All Artifacts</Link>
        <Link to="/add-artifacts" className="hover:text-[#B35900] hover:underline">Add Artifact</Link>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mb-4">
        <a href="#" className="hover:text-[#B35900]">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="hover:text-[#B35900]">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="hover:text-[#B35900]">
          <FaPinterest size={20} />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm opacity-80">
        © 2025 Artifacts Tracker. Preserving history, one artifact at a time.
      </p>
    </footer>
  );
};

export default Footer;
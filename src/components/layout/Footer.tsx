import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Affi-Liberty</h3>
            <p className="text-gray-300 mb-4">Votre partenaire en web marketing et affiliation depuis 2024. Construisez votre indépendance financière avec nos solutions innovantes.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-liberty-gold">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-liberty-gold">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-liberty-gold">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-liberty-gold">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-liberty-gold">Accueil</Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-gray-300 hover:text-liberty-gold">Opportunités</Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-300 hover:text-liberty-gold">Outils IA</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-liberty-gold">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-liberty-gold">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-liberty-gold">Blog</Link>
              </li>
              <li>
                <Link to="/webinars" className="text-gray-300 hover:text-liberty-gold">Webinaires</Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-300 hover:text-liberty-gold">Tutoriels</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-300 hover:text-liberty-gold">Études de cas</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Email: contact@affi-liberty.fr</p>
            
            <p className="text-gray-300">
              affi-liberty.fr Saas
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} Affi-Liberty. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-liberty-gold text-sm">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-liberty-gold text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-liberty-gold text-sm">
                Politique de cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
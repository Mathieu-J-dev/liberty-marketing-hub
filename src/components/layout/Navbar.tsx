
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text">Affi-Liberty</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-liberty-blue">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-liberty-blue">Accueil</Link>
          <Link to="/opportunities" className="text-gray-600 hover:text-liberty-blue">Opportunités</Link>
          <Link to="/affiliate-programs" className="text-gray-600 hover:text-liberty-blue">Programmes</Link>
          <Link to="/action-plan" className="text-gray-600 hover:text-liberty-blue">Plan d'action</Link>
          <Link to="/tools" className="text-gray-600 hover:text-liberty-blue">Outils IA</Link>
          <Link to="/contact" className="text-gray-600 hover:text-liberty-blue">Contact</Link>
          <Link to="/login">
            <Button variant="outline" className="border-liberty-blue text-liberty-blue hover:bg-liberty-blue hover:text-white">
              Espace Membre
            </Button>
          </Link>
          <Link to="/capture">
            <Button className="bg-liberty-gold hover:bg-liberty-gold/90 text-white">
              Démarrer
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-4 md:hidden animate-fade-in">
            <Link to="/" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Accueil</Link>
            <Link to="/opportunities" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Opportunités</Link>
            <Link to="/affiliate-programs" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Programmes</Link>
            <Link to="/action-plan" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Plan d'action</Link>
            <Link to="/tools" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Outils IA</Link>
            <Link to="/contact" className="text-gray-600 hover:text-liberty-blue py-2 border-b" onClick={toggleMenu}>Contact</Link>
            <Link to="/login" className="w-full" onClick={toggleMenu}>
              <Button variant="outline" className="w-full border-liberty-blue text-liberty-blue hover:bg-liberty-blue hover:text-white">
                Espace Membre
              </Button>
            </Link>
            <Link to="/capture" className="w-full" onClick={toggleMenu}>
              <Button className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white">
                Démarrer
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

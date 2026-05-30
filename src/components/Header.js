/**
 * Portfolio — Modern Header with Particle Background
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Header({ data }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['contact', 'portfolio', 'resume', 'office', 'about', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) return null;

  const name = data.name;
  const description = data.description;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'office', label: '3D Office' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Works' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <header id="home" className="modern-header">
      {/* Animated particle background */}
      <div className="header-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="header-gradient" />

      {/* Navigation */}
      <nav className={`modern-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">{name?.split(' ')[0] || 'Sam'}</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Desktop nav */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
                <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div className="nav-indicator" layoutId="navIndicator" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button className="nav-mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="nav-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero content */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            🏗️ Software Migration & Integration Architect
          </motion.div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hello, I{'\''}m</span>
            <span className="hero-name">{name}</span>
          </h1>

          <div className="hero-roles">
            {description?.split('/').map((role, i) => (
              <motion.span
                key={i}
                className="hero-role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                {role.trim()}
              </motion.span>
            ))}
          </div>

          <motion.div className="hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <button className="btn-primary" onClick={() => scrollTo('office')}>
              🏢 Visit My Virtual Office
            </button>
            <button className="btn-outline" onClick={() => scrollTo('resume')}>
              📋 View Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
          <FiChevronDown size={28} />
        </a>
      </motion.div>
    </header>
  );
}

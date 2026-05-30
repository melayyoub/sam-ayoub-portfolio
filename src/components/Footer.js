/**
 * Portfolio — Modern Footer
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiHeart, FiArrowUp } from 'react-icons/fi';

export default function Footer({ data }) {
  if (!data) return null;

  const { social, name } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              {name?.split(' ')[0] || 'Sam'}
              <span className="logo-bracket">/&gt;</span>
            </span>
            <p>Software Migration & Integration Architect</p>
          </div>

          <div className="footer-social">
            {social?.map((network) => (
              <motion.a
                key={network.name}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {network.name === 'linkedin' ? <FiLinkedin size={18} /> :
                 network.name === 'github' ? <FiGithub size={18} /> :
                 <span>{network.name}</span>}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {name}. Built with <FiHeart className="heart-icon" /> & AI
          </p>
          <p className="footer-tech">
            React • Three.js • AI
          </p>
        </div>
      </div>

      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
}

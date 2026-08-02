/**
 * Portfolio — Modern About Section
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiDownload, FiGithub, FiLinkedin, FiCpu } from 'react-icons/fi';
import ProfileJpg from '../assets/images/profilepic.jpeg';

export default function About({ data }) {
  if (!data) return null;

  const { name, bio, address, phone, email, resumedownload, resumedownloadPdf, social } = data;
  const profilepic = ProfileJpg;

  const stats = [
    { label: 'Years Experience', value: '15+', icon: '🚀' },
    { label: 'AI Projects', value: '20+', icon: '🤖' },
    { label: 'Certifications', value: '8+', icon: '🏆' },
    { label: 'Open Source', value: '5+', icon: '💻' },
  ];

  return (
    <section id="about" className="modern-about">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">AI/ML Architecture Director & <span className="gradient-text">Engineering Team Lead</span></h2>
        </motion.div>

        <div className="about-grid">
          {/* Profile image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-image-container">
              <img className="about-profile-pic" src={profilepic} alt={name} />
              <div className="about-image-glow" />
              <div className="about-image-ring" />
            </div>
          </motion.div>

          {/* Bio & details */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-bio">{bio}</p>

            {/* Stats */}
            <div className="about-stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact details */}
            <div className="about-details">
              <div className="detail-item">
                <FiMapPin className="detail-icon" />
                <span>{address?.city}, {address?.state}</span>
              </div>
              <div className="detail-item">
                <FiMail className="detail-icon" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </div>

            {/* Social links */}
            <div className="about-social">
              {social?.map((network) => (
                <motion.a
                  key={network.url}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={`${name} on ${network.name}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {network.name === 'linkedin' ? <FiLinkedin /> :
                   network.name === 'github' ? <FiGithub /> :
                   <FiCpu />}
                  <span>{network.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Download buttons */}
            <div className="about-downloads">
              <motion.a
                href={resumedownload}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload /> Download Resume (Docx)
              </motion.a>
              <motion.a
                href={resumedownloadPdf}
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload /> Download Resume (PDF)
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

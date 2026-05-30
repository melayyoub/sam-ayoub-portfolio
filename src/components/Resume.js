/**
 * Portfolio — Modern Resume Section
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagCloud } from 'react-tagcloud';
import { FiBriefcase, FiBookOpen, FiAward, FiCpu, FiTarget } from 'react-icons/fi';

export default function Resume({ data }) {
  const [activeTab, setActiveTab] = useState('work');
  const [selectedSkill, setSelectedSkill] = useState(null);

  if (!data) return null;

  const { work, education, skills, certs, objectives, skillmessage } = data;

  const tabs = [
    { id: 'work', label: 'Experience', icon: <FiBriefcase /> },
    { id: 'education', label: 'Education', icon: <FiBookOpen /> },
    { id: 'skills', label: 'Skills', icon: <FiCpu /> },
    { id: 'certs', label: 'Certifications', icon: <FiAward /> },
    { id: 'objectives', label: 'Objectives', icon: <FiTarget /> },
  ];

  return (
    <section id="resume" className="modern-resume">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Resume</span>
          <h2 className="section-title">My <span className="gradient-text">Professional Journey</span></h2>
        </motion.div>

        {/* Tab navigation */}
        <div className="resume-tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`resume-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div className="tab-indicator" layoutId="tabIndicator" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="resume-tab-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Work Experience */}
            {activeTab === 'work' && (
              <div className="timeline">
                {work?.map((job, i) => (
                  <motion.div
                    key={job.company + i}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="timeline-dot" />
                    <div className="timeline-content glass-card">
                      <div className="timeline-header">
                        <h3>{job.company}</h3>
                        <span className="timeline-date">{job.years}</span>
                      </div>
                      <p className="timeline-role">{job.title || job.role}</p>
                      <p className="timeline-desc">{job.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className="timeline">
                {education?.map((edu, i) => (
                  <motion.div
                    key={edu.school + i}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="timeline-dot" />
                    <div className="timeline-content glass-card">
                      <div className="timeline-header">
                        <h3>{edu.school}</h3>
                        <span className="timeline-date">{edu.graduated}</span>
                      </div>
                      <p className="timeline-role">{edu.degree}</p>
                      <p className="timeline-desc">{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <div className="skills-section">
                <p className="skills-message">{skillmessage}</p>
                {selectedSkill && (
                  <motion.div
                    className="skill-detail glass-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h3>{selectedSkill.value}</h3>
                    <p>{selectedSkill.description}</p>
                  </motion.div>
                )}
                <div className="skills-cloud">
                  <TagCloud
                    minSize={14}
                    maxSize={42}
                    tags={skills}
                    onClick={(tag) => setSelectedSkill(tag)}
                    colorOptions={{
                      luminosity: 'light',
                      hue: 'blue',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Certifications */}
            {activeTab === 'certs' && (
              <div className="certs-grid">
                {certs?.map((cert, i) => (
                  <motion.a
                    key={cert.title + i}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="cert-icon">🏆</div>
                    <h3>{cert.title || cert.name}</h3>
                    <p>{cert.issuer}</p>
                    <span className="cert-date">{cert.date}</span>
                  </motion.a>
                ))}
              </div>
            )}

            {/* Objectives */}
            {activeTab === 'objectives' && (
              <div className="objectives-grid">
                <p className="objectives-message">{skillmessage}</p>
                {objectives?.map((obj, i) => (
                  <motion.div
                    key={obj.name + i}
                    className="objective-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <FiTarget className="objective-icon" />
                    <span>{obj.name}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

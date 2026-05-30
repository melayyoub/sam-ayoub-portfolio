/**
 * Portfolio — Modern Portfolio Section
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

export default function Portfolio({ data }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  if (!data) return null;

  const { projects } = data;

  const categories = ['all', ...new Set(projects?.map(p => p.category?.split(',')[0]?.trim()).filter(Boolean))];

  const filteredProjects = filter === 'all'
    ? projects
    : projects?.filter(p => p.category?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="portfolio" className="modern-portfolio">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured <span className="gradient-text">AI Projects</span></h2>
        </motion.div>

        {/* Filter buttons */}
        <div className="portfolio-filters">
          {categories.slice(0, 6).map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat === 'all' ? '🌐 All' : cat}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filteredProjects?.map((project, i) => (
              <motion.div
                key={project.title + i}
                className="project-card glass-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <FiExternalLink size={24} />
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-tags">
                    {project.category?.split(',').map((tag, j) => (
                      <span key={j} className="project-tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project detail modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-modal glass-card"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedProject(null)}>
                  <FiX size={20} />
                </button>
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                <div className="modal-content">
                  <h2>{selectedProject.title}</h2>
                  <div className="modal-tags">
                    {selectedProject.category?.split(',').map((tag, j) => (
                      <span key={j} className="project-tag">{tag.trim()}</span>
                    ))}
                  </div>
                  <p>{selectedProject.description}</p>
                  <div className="modal-actions">
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <FiExternalLink /> View Project
                    </a>
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <FiGithub /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

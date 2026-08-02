/**
 * Portfolio — Case Studies Section (Flagship AI/ML Architecture Work)
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import ArchitectureFlow from './ArchitectureFlow';

export default function CaseStudies({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="case-studies" className="modern-case-studies">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Case Studies</span>
          <h2 className="section-title">AI/ML Systems I{'\''}ve <span className="gradient-text">Architected</span></h2>
          <p className="section-subtitle">
            Founder &amp; principal architect of the Reallexi LLC product suite — production AI systems
            spanning RAG memory, ML model training, autonomous agents, and infrastructure.
          </p>
        </motion.div>

        <div className="case-studies-list">
          {data.map((project, i) => (
            <motion.article
              key={project.id || project.title}
              className="case-study glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
            >
              <header className="case-study-header">
                <div>
                  <span className="case-study-role">{project.role}</span>
                  <h3>{project.title}</h3>
                  <p className="case-study-tagline">{project.tagline}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline case-study-link"
                >
                  Visit Live Project <FiExternalLink />
                </a>
              </header>

              <p className="case-study-description">{project.description}</p>

              {project.stack && (
                <div className="case-study-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-tag">{tech}</span>
                  ))}
                </div>
              )}

              {project.architecture?.steps && (
                <ArchitectureFlow steps={project.architecture.steps} label={`${project.title} architecture`} />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

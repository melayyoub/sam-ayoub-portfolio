/**
 * Portfolio — Reusable Architecture Flow Diagram
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';

export default function ArchitectureFlow({ steps, label }) {
  if (!steps || steps.length === 0) return null;

  const summary = steps.map((s) => s.label).join(' → ');

  return (
    <div
      className="architecture-flow"
      role="img"
      aria-label={`${label ? label + ': ' : ''}Architecture flow diagram: ${summary}`}
    >
      {steps.map((step, i) => (
        <React.Fragment key={step.label + i}>
          <motion.div
            className="flow-node"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="flow-node-icon" aria-hidden="true">{step.icon}</span>
            <span className="flow-node-label">{step.label}</span>
            {step.sublabel && <span className="flow-node-sublabel">{step.sublabel}</span>}
          </motion.div>
          {i < steps.length - 1 && (
            <span className="flow-connector" aria-hidden="true">
              <FiArrowRight className="flow-arrow-h" />
              <FiArrowDown className="flow-arrow-v" />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

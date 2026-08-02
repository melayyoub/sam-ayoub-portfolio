/**
 * Portfolio — Modern App with 3D Office & AI Chat
 * Built by Sam Ayoub, Reallexi.com
 * https://sam.reallexi.com
 * © Reallexi LLC
 */
import React, { useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import CaseStudies from './components/CaseStudies';

const Office3D = lazy(() => import('./components/Office3D'));
const AIChat = lazy(() => import('./components/AIChat'));

export default function App() {
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch('assets/resume.json')
      .then((res) => res.json())
      .then((data) => setResumeData(data))
      .catch((err) => console.error('Failed to load resume data:', err));
  }, []);

  return (
    <div className="App">
      {resumeData.main && <Header data={resumeData.main} />}
      {resumeData.main && <About data={resumeData.main} />}
      
      <section id="office">
        <Suspense fallback={
          <div className="office-loading">
            <div className="loading-spinner" />
            <p>Loading 3D Office...</p>
          </div>
        }>
          <Office3D resumeData={resumeData.resume} />
        </Suspense>
      </section>

      {resumeData.resume && <Resume data={resumeData.resume} />}
      {resumeData.caseStudies && <CaseStudies data={resumeData.caseStudies} />}
      {resumeData.portfolio && <Portfolio data={resumeData.portfolio} />}
      {resumeData.main && <Contact data={resumeData.main} />}
      {resumeData.main && <Footer data={resumeData.main} />}

      <Suspense fallback={null}>
        <AIChat />
      </Suspense>
    </div>
  );
}

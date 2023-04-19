/**
 * Portfolio, show your resume in different way
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://sam.reallexi.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';

export default function App() {
  const [resumeData, setresumeData] = useState([]);
  const getResumeData = () => {
    fetch('assets/resume.json')
      .then((x) => x.json())
      .then((x) => setresumeData(x));
  };

  useEffect(() => {
    getResumeData();
  }, []);

  return (
    <div className="App">
      {resumeData.main ? <Header data={resumeData.main} /> : []}
      {resumeData.main ? <About data={resumeData.main} /> : []}
      {resumeData.resume ? <Resume data={resumeData.resume} /> : []}
      {resumeData.portfolio ? <Portfolio data={resumeData.portfolio} /> : []}
      {resumeData.main ? <Contact data={resumeData.main} /> : []}
      {resumeData.main ? <Footer data={resumeData.main} /> : []}
    </div>
  );
}

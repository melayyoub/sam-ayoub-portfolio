/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import Zmage from 'react-zmage';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
class Resume extends Component {
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          <p>{work.description}</p>
        </div>
      );
    });

    const skills = this.props.data.skills.map((skills) => {
      const backgroundColor = this.getRandomColor();
      const className = 'bar-expand  border' + skills.name.toLowerCase();
      const width = skills.level;

      return (
        <li key={skills.name}>
          <div style={{ width, backgroundColor }} className={className}>
            <div className="p-2 text-dark ">{width}</div>
          </div>
          <em className="text-dark" style={{ fontSize: '10px' }}>
            {skills.name}
          </em>
        </li>
      );
    });
    const certs = this.props.data.certs.map(function (cert) {
      let certImage = cert.image;

      return (
        <a href={cert.source} key={cert.title} className="columns portfolio-item">
          <div className="item-wrap">
            <Zmage alt={cert.title} src={certImage} />
            <div style={{ textAlign: 'center' }}>{cert.title}</div>
            <div style={{ textAlign: 'center' }}>Certification link</div>
          </div>
        </a>
      );
    });
    return (
      <section id="resume">
        <div>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
            </div>
            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Certifications</span>
              </h1>
            </div>
            <div className="nine columns main-col">
              <Carousel responsive={responsive}>{certs}</Carousel>
            </div>
          </div>
        </div>
        <div>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work</span>
              </h1>
            </div>

            <div className="nine columns main-col">{work}</div>
          </div>
        </div>

        <div>
          <div className="row skill">
            <div className="three columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <p>{skillmessage}</p>
              <br />
              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;

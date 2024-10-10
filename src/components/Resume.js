
/**
 * Portfolio, show your resume in different way
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://sam.reallexi.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
// import Zmage from 'react-zmage';
import { TagCloud } from 'react-tagcloud';

export default function Resume(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  const { data } = props;
  //   function getRandomColor() {
  //     let letters = '0123456789ABCDEF';
  //     let color = '#';
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     return color;
  //   }
  const [message, setMessage] = useState(
    'To learn more about me, click on any skill from my skills cloud'
  );
  const [tagSkill, setTagSkill] = useState('');
  if (!data) return null;
  const skillmessage = props.data.skillmessage;
  const skills = props.data.skills;
  const education = props.data.education.map(function (education) {
    return (
      <div key={education.school + Math.random()}>
        <h3>{education.school}</h3>
        <p className="info">
          {education.degree} <span>&bull;</span>
          <em className="date">{education.graduated}</em>
        </p>
        <p>{education.description}</p>
      </div>
    );
  });

  const work = props.data.work.map(function (work) {
    return (
      <div key={work.company + Math.random()}>
        <h3>{work.company}</h3>
        <p className="info">
          {work.title}
          <span>&bull;</span> <em className="date">{work.years}</em>
        </p>
        <p>{work.description}</p>
      </div>
    );
  });

  // const objectives = props.data.objectives.map((skills) => {
  //   const backgroundColor = getRandomColor();
  //   const className = 'bar-expand  border' + skills.name.toLowerCase();
  //   const width = skills.level;

  //   return (
  //     <li key={skills.name} className="col-6">
  //       <div style={{ width, backgroundColor }} className={className}>
  //         <div className="p-2 text-dark ">{width}</div>
  //       </div>
  //       <em className="text-dark" style={{ fontSize: '10px' }}>
  //         {skills.name}
  //       </em>
  //     </li>
  //   );
  // });
  const objectives = props.data.objectives.map((skills) => {
    //   const backgroundColor = getRandomColor();
    //   const className = 'bar-expand  border' + skills.name.toLowerCase();
    //   const width = skills.level;

    return (
      <li key={skills.name + Math.random()} className="skillsItems">
        {skills.name}
      </li>
    );
  });
  const certs = props.data.certs.map(function (cert) {
    // let certImage = cert.image;

    return (
      <a href={cert.url} key={cert.title + Math.random()} className="columns portfolio-item">
        <div className="item-wrap">
           <div style={{ textAlign: 'center' }}>{cert.title}</div>
          <div style={{ textAlign: 'center' }}>Certification link</div>
        </div>
      </a>
    );
  });
  return (
    <section id="resume">
      <div>
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work History</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>
      </div>
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
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine  columns main-col">
            <div className="alert  header-col">
              <h3>{tagSkill}</h3>
              {message}
            </div>
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={skills}
              onClick={(tag) => {
                setTagSkill(tag.value);
                setMessage(`${tag.description}`);
              }}
            />
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
        <div className="row skills">
          <div className="three columns header-col">
            <h1>
              <span>Skills & Objectives</span>
            </h1>
          </div>

          <div className="nine  columns main-col">
            <p>{skillmessage}</p>
            <br />
            {/* <div className="bars d-flex"> */}
            <ul className="skills row text-start ">{objectives}</ul>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

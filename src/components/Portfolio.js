/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Zmage from 'react-zmage';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
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
    items: 1
  }
};

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = projects.image;

      return (
        <a href={projects.url} key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <Zmage alt={projects.title} src={projectImage} />
            <div style={{ textAlign: 'center' }}>{projects.title}</div>
            <div style={{ textAlign: 'center' }}>Learn more</div>
          </div>
        </a>
      );
    });

    return (
      <section id="portfolio">
        <div>
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check Out Some of My Works.</h1>
              <Carousel responsive={responsive}>{projects}</Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;

/**
 * Portfolio, show your resume in different way
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://sam.reallexi.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Contact extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    // const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    // const phone = this.props.data.phone;

    return (
      <section id="contact" className="text-center">
        {name}
        <br />
        {city}, {state}
        <br />
        <a href={this.props.data.social[0].url} className="button">
          LinkedIn
        </a>
      </section>
    );
  }
}

export default Contact;

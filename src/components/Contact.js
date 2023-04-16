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
      </section>
    );
  }
}

export default Contact;

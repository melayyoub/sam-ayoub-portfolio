/**
 * Portfolio, show your resume in different way
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://sam.reallexi.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Profile confirm the copyright', async () => {
  render(<App />);
  setTimeout(() => {
    const linkElement = screen.getByText(/Sam Ayoub/i);
    expect(linkElement).toBeInTheDocument();
  }, 3000);
});

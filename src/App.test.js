/**
 * Portfolio, show your resume in different way
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://sam.reallexi.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

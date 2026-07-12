import React from "react";

/**
 * Footer component with copyright information and external links
 * @returns {JSX.Element} The footer section
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-coffee-300 dark:border-white/10 bg-coffee-50/50 dark:bg-transparent backdrop-blur-sm py-8 px-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left side - Copyright */}
          <div className="text-coffee-700 dark:text-gray-300 text-sm text-center md:text-left">
            <div className="flex items-center flex-wrap justify-center md:justify-start gap-2">
              <span className="font-semibold font-heading">Dhananjay Rajput</span>
              <span className="text-coffee-500 dark:text-gray-500">|</span>
              <span>&copy; {currentYear}</span>
              <span className="text-coffee-600 dark:text-gray-400">Design rights reserved</span>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-3 text-sm font-medium normal-case">
            <a
              href="https://github.com/itsmrnatural/my-website"
              className="text-coffee-700 dark:text-gray-300 hover:text-coffee-900 dark:hover:text-white underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
            >
              source
            </a>
            <span className="text-coffee-500 dark:text-gray-500"> </span>
            <a
              href="https://linkedin.com/in/imdhananjay"
              className="text-coffee-700 dark:text-gray-300 hover:text-coffee-900 dark:hover:text-white underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
            >
              linkedin
            </a>
            <span className="text-coffee-500 dark:text-gray-500"> </span>
            <a
              href="https://leetcode.com/u/onlydhananjays/"
              className="text-coffee-700 dark:text-gray-300 hover:text-coffee-900 dark:hover:text-white underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on Leetcode"
            >
              leetcode
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

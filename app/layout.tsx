import React, { ReactNode } from 'react';
import { Navigation } from './components/Navigation';
import '../styles/globals.css'

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Home Page</title>
          <meta charSet="UTF-8"></meta>
          <link rel="stylesheet" type="text/css" href="reset-password.css"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
    </head>
      <body>
      <Navigation></Navigation>
      {children}  
      </body>
    </html>
  );
};

export default RootLayout;
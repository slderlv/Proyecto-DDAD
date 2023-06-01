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
    </head>
      <body>
      {/* <Navigation></Navigation> */}
      {children}  
      </body>
    </html>
  );
};

export default RootLayout;
import React, { ReactNode, Suspense } from 'react';
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
        {children} 
        {/* <Navigation></Navigation> */}
      </body>
    </html>
  );
};

export default RootLayout;
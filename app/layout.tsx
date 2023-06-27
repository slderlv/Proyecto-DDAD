import React, { ReactNode } from 'react';
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
import styled, { createGlobalStyle, ThemeProvider as StyledThemeProvider } from "styled-components";
import React, { ReactNode } from "react";

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
  
  html {
    font-family: var(--font-sans);
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    spaceBlack: "hsl(220, 13%, 9%)",
    spaceGray: "hsl(215, 19%, 17%)",
    darkPanel: "hsl(217, 25%, 16%)",
    neonBlue: "hsl(217, 91%, 60%)",
    neonPurple: "hsl(262, 83%, 63%)",
    neonGreen: "hsl(143, 64%, 40%)",
    neonYellow: "hsl(38, 92%, 50%)",
    neonRed: "hsl(0, 84%, 60%)",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

export type Theme = typeof theme;

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default theme;
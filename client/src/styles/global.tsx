import styled, { createGlobalStyle, ThemeProvider as StyledThemeProvider, css, DefaultTheme } from "styled-components";
import React, { ReactNode } from "react";

// Define a declaração de tipos para estender DefaultTheme do styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      muted: string;
      mutedForeground: string;
      popover: string;
      popoverForeground: string;
      card: string;
      cardForeground: string;
      border: string;
      input: string;
      primary: string;
      primaryForeground: string;
      secondary: string;
      secondaryForeground: string;
      accent: string;
      accentForeground: string;
      destructive: string;
      destructiveForeground: string;
      spaceBlack: string;
      spaceGray: string;
      darkPanel: string;
      neonBlue: string;
      neonPurple: string;
      neonGreen: string;
      neonYellow: string;
      neonRed: string;
      sidebarBackground: string;
      sidebarForeground: string;
      sidebarPrimary: string;
      sidebarAccent: string;
      sidebarBorder: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    boxShadow: {
      sm: string;
      DEFAULT: string;
      md: string;
      lg: string;
      xl: string;
      glow: string;
      neonBlue: string;
      neonPurple: string;
      neonGreen: string;
    };
    fonts: {
      sans: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };
    space: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      8: string;
      10: string;
      12: string;
      16: string;
      20: string;
    };
    gradients: {
      bluePurple: string;
      purpleBlue: string;
      greenBlue: string;
      yellowGreen: string;
      redYellow: string;
      purpleRed: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
}

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
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
  }

  button, input, select, textarea {
    font-family: var(--font-sans);
  }

  /* Accessible Outline */
  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.neonBlue};
    outline-offset: 2px;
  }
`;

const theme = {
  colors: {
    // Base colors
    background: "hsl(224, 71%, 4%)",
    foreground: "hsl(0, 0%, 98%)",
    muted: "hsl(240, 3.7%, 15.9%)",
    mutedForeground: "hsl(240, 5%, 64.9%)",

    // Popover/Card
    popover: "hsl(240, 10%, 3.9%)",
    popoverForeground: "hsl(0, 0%, 98%)",
    card: "hsl(217, 25%, 16%)",
    cardForeground: "hsl(0, 0%, 98%)",

    // Border/Input
    border: "hsl(240, 3.7%, 15.9%)",
    input: "hsl(240, 3.7%, 15.9%)",

    // Primary
    primary: "hsl(217, 91%, 60%)",
    primaryForeground: "hsl(0, 0%, 98%)",

    // Secondary
    secondary: "hsl(262, 83%, 63%)",
    secondaryForeground: "hsl(0, 0%, 98%)",

    // Accent
    accent: "hsl(142, 71%, 45%)",
    accentForeground: "hsl(0, 0%, 98%)",

    // Destructive
    destructive: "hsl(0, 62.8%, 30.6%)",
    destructiveForeground: "hsl(0, 0%, 98%)",

    // Special Dashboard Colors
    spaceBlack: "hsl(220, 13%, 9%)",
    spaceGray: "hsl(215, 19%, 17%)",
    darkPanel: "hsl(217, 25%, 16%)",
    neonBlue: "hsl(217, 91%, 60%)",
    neonPurple: "hsl(262, 83%, 63%)",
    neonGreen: "hsl(143, 64%, 40%)",
    neonYellow: "hsl(38, 92%, 50%)",
    neonRed: "hsl(0, 84%, 60%)",
    
    // Sidebar specific
    sidebarBackground: "hsl(220, 13%, 9%)",
    sidebarForeground: "hsl(0, 0%, 98%)",
    sidebarPrimary: "hsl(217, 91%, 60%)",
    sidebarAccent: "hsl(262, 83%, 63%)",
    sidebarBorder: "hsl(240, 3.7%, 15.9%)",
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
    glow: "0 0 15px rgba(59, 130, 246, 0.5)",
    neonBlue: "0 0 15px rgba(59, 130, 246, 0.5)",
    neonPurple: "0 0 15px rgba(147, 51, 234, 0.5)",
    neonGreen: "0 0 15px rgba(16, 185, 129, 0.5)",
  },
  fonts: {
    sans: "var(--font-sans)",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
  },
  gradients: {
    bluePurple: `linear-gradient(to right, hsl(217, 91%, 60%), hsl(262, 83%, 63%))`,
    purpleBlue: `linear-gradient(to right, hsl(262, 83%, 63%), hsl(217, 91%, 60%))`,
    greenBlue: `linear-gradient(to right, hsl(143, 64%, 40%), hsl(217, 91%, 60%))`,
    yellowGreen: `linear-gradient(to right, hsl(38, 92%, 50%), hsl(143, 64%, 40%))`,
    redYellow: `linear-gradient(to right, hsl(0, 84%, 60%), hsl(38, 92%, 50%))`,
    purpleRed: `linear-gradient(to right, hsl(262, 83%, 63%), hsl(0, 84%, 60%))`,
  },
  transitions: {
    fast: "0.1s ease-in-out",
    normal: "0.2s ease-in-out", 
    slow: "0.3s ease-in-out",
  },
};

export type Theme = typeof theme;

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

// Utility styled components
export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.space[4]};
`;

export const Flex = styled.div<{
  direction?: "row" | "column";
  align?: string;
  justify?: string;
  gap?: keyof Theme["space"] | string;
  wrap?: string;
}>`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  align-items: ${props => props.align || "stretch"};
  justify-content: ${props => props.justify || "flex-start"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  gap: ${props => 
    typeof props.gap === "string" 
      ? props.gap 
      : props.gap 
        ? props.theme.space[props.gap] 
        : "0"
  };
`;

export const Grid = styled.div<{
  columns?: string;
  gap?: keyof Theme["space"] | string;
  rowGap?: keyof Theme["space"] | string;
  columnGap?: keyof Theme["space"] | string;
}>`
  display: grid;
  grid-template-columns: ${props => props.columns || "1fr"};
  gap: ${props => 
    typeof props.gap === "string" 
      ? props.gap 
      : props.gap 
        ? props.theme.space[props.gap] 
        : "0"
  };
  row-gap: ${props => 
    typeof props.rowGap === "string" 
      ? props.rowGap 
      : props.rowGap 
        ? props.theme.space[props.rowGap] 
        : undefined
  };
  column-gap: ${props => 
    typeof props.columnGap === "string" 
      ? props.columnGap 
      : props.columnGap 
        ? props.theme.space[props.columnGap] 
        : undefined
  };
`;

export const Card = styled.div`
  background-color: ${props => props.theme.colors.card};
  color: ${props => props.theme.colors.cardForeground};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.space[6]};
  box-shadow: ${props => props.theme.boxShadow.md};
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}>`
  font-family: ${props => props.theme.fonts.sans};
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => {
    switch (props.size) {
      case "sm":
        return css`
          font-size: ${props.theme.fontSizes.sm};
          padding: ${props.theme.space[1]} ${props.theme.space[3]};
          height: 2rem;
        `;
      case "lg":
        return css`
          font-size: ${props.theme.fontSizes.lg};
          padding: ${props.theme.space[3]} ${props.theme.space[6]};
          height: 3rem;
        `;
      default:
        return css`
          font-size: ${props.theme.fontSizes.md};
          padding: ${props.theme.space[2]} ${props.theme.space[4]};
          height: 2.5rem;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case "secondary":
        return css`
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.secondaryForeground};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.secondary}dd;
          }
        `;
      case "accent":
        return css`
          background-color: ${props.theme.colors.accent};
          color: ${props.theme.colors.accentForeground};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.accent}dd;
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: ${props.theme.colors.foreground};
          border: 1px solid ${props.theme.colors.border};
          &:hover {
            background-color: ${props.theme.colors.muted};
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: ${props.theme.colors.foreground};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.muted};
          }
        `;
      case "destructive":
        return css`
          background-color: ${props.theme.colors.destructive};
          color: ${props.theme.colors.destructiveForeground};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.destructive}dd;
          }
        `;
      default:
        return css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.primaryForeground};
          border: none;
          &:hover {
            background-color: ${props.theme.colors.primary}dd;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default theme;
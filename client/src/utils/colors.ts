export const COLORS = {
  spaceBlack: "hsl(var(--space-black))",
  spaceGray: "hsl(var(--space-gray))",
  darkPanel: "hsl(var(--dark-panel))",
  neonBlue: "hsl(var(--neon-blue))",
  neonPurple: "hsl(var(--neon-purple))",
  neonGreen: "hsl(var(--neon-green))",
  neonYellow: "hsl(var(--neon-yellow))",
  neonRed: "hsl(var(--neon-red))",
};

export const GRADIENTS = {
  bluePurple: "bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]",
  purpleBlue: "bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))]",
  greenBlue: "bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))]",
  yellowGreen: "bg-gradient-to-r from-[hsl(var(--neon-yellow))] to-[hsl(var(--neon-green))]",
  redYellow: "bg-gradient-to-r from-[hsl(var(--neon-red))] to-[hsl(var(--neon-yellow))]",
  purpleRed: "bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-red))]",
};

export type TemperatureType = "Quente" | "Morno" | "Frio";

export const getTemperatureColor = (temperature: TemperatureType) => {
  switch (temperature) {
    case "Quente":
      return {
        bg: "bg-[hsl(var(--neon-green))]",
        text: "text-[hsl(var(--neon-green))]",
        bgOpacity: "bg-[hsl(var(--neon-green)_/_0.2)]",
      };
    case "Morno":
      return {
        bg: "bg-[hsl(var(--neon-yellow))]",
        text: "text-[hsl(var(--neon-yellow))]",
        bgOpacity: "bg-[hsl(var(--neon-yellow)_/_0.2)]",
      };
    case "Frio":
      return {
        bg: "bg-[hsl(var(--neon-red))]",
        text: "text-[hsl(var(--neon-red))]",
        bgOpacity: "bg-[hsl(var(--neon-red)_/_0.2)]",
      };
    default:
      return {
        bg: "bg-gray-500",
        text: "text-gray-500",
        bgOpacity: "bg-gray-500/20",
      };
  }
};

export const getInitialGradient = (name: string) => {
  const gradients = [
    "gradient-blue-purple",
    "gradient-purple-blue",
    "gradient-green-blue",
    "gradient-yellow-green",
    "gradient-red-yellow",
    "gradient-purple-red",
  ];
  
  // Hash the name to get a consistent gradient for the same name
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % gradients.length;
  
  return gradients[index];
};

export const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};

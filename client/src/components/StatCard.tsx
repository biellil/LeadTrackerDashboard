import styled from "styled-components";
import { ArrowUp, ArrowDown, Equal } from "lucide-react";
import { motion } from "framer-motion";

type StatsChangeType = "increase" | "decrease" | "unchanged";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  changeType: StatsChangeType;
  changeLabel?: string;
  iconBgColor: string;
  accentColor: string;
}

const CardContainer = styled(motion.div)`
  background-color: hsl(var(--dark-panel));
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid hsl(var(--border));
  position: relative;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardInfo = styled.div``;

const CardTitle = styled.p`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

const CardValue = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 0.25rem;
`;

const CardChange = styled.p<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${({ color }) => color};
`;

const ChangeLabel = styled.span`
  color: hsl(var(--muted-foreground));
  margin-left: 0.25rem;
`;

const IconWrapper = styled.div<{ bgColor: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor};
`;

const BackgroundDecoration = styled.div<{ accentColor: string }>`
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${({ accentColor }) => accentColor};
  opacity: 0.1;
  transition: opacity 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 0.2;
  }
`;

const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType,
  changeLabel = "vs. mês anterior",
  iconBgColor,
  accentColor
}: StatCardProps) => {
  const getChangeColor = () => {
    if (changeType === "increase") return "hsl(var(--neon-green))";
    if (changeType === "decrease") return "hsl(var(--neon-red))";
    return "hsl(var(--neon-yellow))";
  };
  
  const getChangeIcon = () => {
    if (changeType === "increase") return <ArrowUp size={16} />;
    if (changeType === "decrease") return <ArrowDown size={16} />;
    return <Equal size={16} />;
  };
  
  return (
    <CardContainer
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.2 }}
    >
      <BackgroundDecoration accentColor={accentColor} />
      <CardContent>
        <CardInfo>
          <CardTitle>{title}</CardTitle>
          <CardValue>{value}</CardValue>
          <CardChange color={getChangeColor()}>
            {getChangeIcon()}
            <span className="ml-1">{change}%</span>
            <ChangeLabel>{changeLabel}</ChangeLabel>
          </CardChange>
        </CardInfo>
        <IconWrapper bgColor={iconBgColor}>
          {icon}
        </IconWrapper>
      </CardContent>
    </CardContainer>
  );
};

export default StatCard;

import styled from "styled-components";
import { ArrowUp, ArrowDown, Equal } from "lucide-react";
import { motion } from "framer-motion";
import { Paper } from "@mui/material";

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
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.space[6]};
  box-shadow: ${props => props.theme.boxShadow.lg};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const CardValue = styled.h3`
  font-size: ${props => props.theme.fontSizes["3xl"]};
  font-weight: 700;
  margin-top: ${props => props.theme.space[1]};
  color: ${props => props.theme.colors.foreground};
`;

const CardChange = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.space[2]};
  color: ${props => props.$color};
`;

const ChangeLabel = styled.span`
  color: ${props => props.theme.colors.mutedForeground};
  margin-left: ${props => props.theme.space[1]};
`;

const ChangeValue = styled.span`
  margin-left: ${props => props.theme.space[1]};
`;

const IconWrapper = styled.div<{ $bgColor: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$bgColor};
  color: white;
`;

const BackgroundDecoration = styled.div<{ $accentColor: string }>`
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: ${props => props.$accentColor};
  opacity: 0.1;
  transition: opacity 0.3s ease;
  z-index: 1;
  
  ${CardContainer}:hover & {
    opacity: 0.15;
    transform: scale(1.1);
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
    if (changeType === "increase") return "#10b981"; // neonGreen
    if (changeType === "decrease") return "#ef4444"; // neonRed
    return "#f59e0b"; // neonYellow
  };
  
  const getChangeIcon = () => {
    if (changeType === "increase") return <ArrowUp size={16} />;
    if (changeType === "decrease") return <ArrowDown size={16} />;
    return <Equal size={16} />;
  };
  
  return (
    <CardContainer
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <BackgroundDecoration $accentColor={accentColor} />
      <CardContent>
        <CardInfo>
          <CardTitle>{title}</CardTitle>
          <CardValue>{value}</CardValue>
          <CardChange $color={getChangeColor()}>
            {getChangeIcon()}
            <ChangeValue>{change}%</ChangeValue>
            <ChangeLabel>{changeLabel}</ChangeLabel>
          </CardChange>
        </CardInfo>
        <IconWrapper $bgColor={iconBgColor}>
          {icon}
        </IconWrapper>
      </CardContent>
    </CardContainer>
  );
};

export default StatCard;

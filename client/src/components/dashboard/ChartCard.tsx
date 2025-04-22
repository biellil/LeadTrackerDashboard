import { ReactNode } from "react";
import styled from "styled-components";
import { 
  Card, 
  CardContent, 
  CardHeader,
  Typography,
  IconButton,
  ButtonGroup,
  Button as MuiButton,
  Box
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  filters?: boolean;
  onFilterChange?: (filter: string) => void;
  selectedFilter?: string;
  icon?: ReactNode;
}

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.colors.card} !important;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg} !important;
  box-shadow: ${props => props.theme.boxShadow.lg} !important;
  overflow: hidden;
  height: 100%;
`;

const StyledCardHeader = styled(CardHeader)`
  padding: ${props => props.theme.space[6]} !important;
  padding-bottom: 0 !important;
`;

const ChartTitle = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.lg} !important;
  font-weight: 700 !important;
  color: ${props => props.theme.colors.foreground} !important;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin-right: ${props => props.theme.space[2]};
  display: flex;
  align-items: center;
`;

const FilterContainer = styled(ButtonGroup)`
  background-color: ${props => props.theme.colors.muted};
  border-radius: 9999px;
  overflow: hidden;
`;

const FilterButton = styled(MuiButton)<{ $active: boolean }>`
  font-size: ${props => props.theme.fontSizes.xs} !important;
  padding: ${props => props.theme.space[1]} ${props => props.theme.space[3]} !important;
  background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.2)' : 'transparent'} !important;
  color: ${props => props.$active ? props.theme.colors.neonBlue : props.theme.colors.mutedForeground} !important;
  border: none !important;
  text-transform: none !important;
  min-width: auto !important;
  
  &:hover {
    background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.08)'} !important;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: ${props => props.theme.space[6]} !important;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartCard = ({ 
  title, 
  children, 
  filters = false, 
  onFilterChange, 
  selectedFilter = "trimestre",
  icon
}: ChartCardProps) => {
  return (
    <StyledCard elevation={0}>
      <StyledCardHeader 
        title={
          <HeaderContent>
            <ChartTitle variant="h6">
              {icon && <IconWrapper>{icon}</IconWrapper>}
              {title}
            </ChartTitle>
            
            {filters ? (
              <FilterContainer variant="contained" color="primary" disableElevation>
                <FilterButton 
                  $active={selectedFilter === "mes"} 
                  onClick={() => onFilterChange && onFilterChange("mes")}
                >
                  Mês
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === "trimestre"} 
                  onClick={() => onFilterChange && onFilterChange("trimestre")}
                >
                  Trimestre
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === "ano"} 
                  onClick={() => onFilterChange && onFilterChange("ano")}
                >
                  Ano
                </FilterButton>
              </FilterContainer>
            ) : (
              <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                <MoreVert fontSize="small" />
              </IconButton>
            )}
          </HeaderContent>
        }
      />
      
      <StyledCardContent>
        <Box width="100%" height="100%">
          {children}
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ChartCard;

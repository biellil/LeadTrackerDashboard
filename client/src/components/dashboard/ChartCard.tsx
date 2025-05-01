import { ReactNode } from "react";
import styled from "styled-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  filters?: boolean;
  onFilterChange?: (filter: string) => void;
  selectedFilter?: string;
  icon?: ReactNode;
}

const ChartCardContainer = styled(Card)`
  background-color: hsl(var(--dark-panel));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const ChartHeader = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  padding-bottom: 0;
  flex-direction: row;
`;

const ChartTitle = styled(CardTitle)`
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterButton = styled(Button)<{ $active: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ $active }) => $active ? 'hsl(var(--neon-blue) / 0.2)' : 'hsl(var(--muted))'};
  color: ${({ $active }) => $active ? 'hsl(var(--neon-blue))' : 'hsl(var(--muted-foreground))'};
  
  &:hover {
    background-color: ${({ $active }) => $active ? 'hsl(var(--neon-blue) / 0.3)' : 'hsl(var(--muted) / 0.8)'};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChartCardContent = styled(CardContent)`
  padding: 1.5rem;
  height: 18rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
    <ChartCardContainer>
      <ChartHeader>
        <ChartTitle>
          {icon && <span>{icon}</span>}
          {title}
        </ChartTitle>
        
        {filters ? (
          <FilterContainer>
            <FilterButton 
              variant="ghost" 
              size="sm" 
              $active={selectedFilter === "mes"} 
              onClick={() => onFilterChange && onFilterChange("mes")}
            >
              Mês
            </FilterButton>
            <FilterButton 
              variant="ghost" 
              size="sm" 
              $active={selectedFilter === "trimestre"} 
              onClick={() => onFilterChange && onFilterChange("trimestre")}
            >
              Trimestre
            </FilterButton>
            <FilterButton 
              variant="ghost" 
              size="sm" 
              $active={selectedFilter === "ano"} 
              onClick={() => onFilterChange && onFilterChange("ano")}
            >
              Ano
            </FilterButton>
          </FilterContainer>
        ) : (
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <MoreVertical size={18} />
          </Button>
        )}
      </ChartHeader>
      
      <ChartCardContent>
        {children}
      </ChartCardContent>
    </ChartCardContainer>
  );
};

export default ChartCard;

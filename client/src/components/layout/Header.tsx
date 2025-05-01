import styled from "styled-components";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeaderContainer = styled.header`
  background-color: hsl(var(--space-gray));
  border-bottom: 1px solid hsl(var(--border));
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
`;

const NotificationButton = styled.button`
  position: relative;
  padding: 0.5rem;
  color: hsl(var(--muted-foreground));
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
  }
`;

const NotificationIndicator = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: hsl(var(--neon-red));
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-blue)));
`;

const Username = styled.span`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

interface HeaderProps {
  title: string;
  onOpenSidebar: () => void;
}

const Header = ({ title, onOpenSidebar }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderSection>
        <button className="md:hidden mr-4 text-gray-400 hover:text-white" onClick={onOpenSidebar}>
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </HeaderSection>
      
      <HeaderSection>
        <SearchContainer>
          <Input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-gray-700 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] w-full min-w-[200px]" 
          />
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
        </SearchContainer>
        
        <NotificationButton>
          <Bell size={20} />
          <NotificationIndicator />
        </NotificationButton>
        

      </HeaderSection>
    </HeaderContainer>
  );
};

export default Header;

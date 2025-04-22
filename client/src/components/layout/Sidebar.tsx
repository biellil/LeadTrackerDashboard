import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import styled from "styled-components";
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  Briefcase, 
  Settings, 
  HelpCircle,
  Bot,
  X,
} from "lucide-react";

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 16rem;
  height: 100vh;
  background-color: hsl(var(--space-gray));
  border-right: 1px solid hsl(var(--border));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 30;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SidebarNav = styled.nav`
  margin-top: 1.5rem;
  padding: 0 1rem;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  color: ${({ $active }) => $active ? 'white' : 'hsl(var(--muted-foreground))'};
  background-color: ${({ $active }) => $active ? 'transparent' : 'transparent'};
  background: ${({ $active }) => $active ? 'linear-gradient(to right, hsl(var(--neon-blue)), hsl(var(--neon-purple)))' : 'transparent'};
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'};
  
  &:hover {
    background-color: ${({ $active }) => $active ? 'transparent' : 'hsl(var(--muted))'};
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.75rem;
  display: inline-flex;
  align-items: center;
`;

const FooterSection = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid hsl(var(--border));
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [location] = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <LogoIcon className="gradient-blue-purple">
              <Bot size={20} />
            </LogoIcon>
            <h1 className="text-xl font-bold text-white">SDR IA</h1>
          </Logo>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </SidebarHeader>
        
        <SidebarNav>
          <div className="space-y-1">
            <NavItem href="/" $active={location === "/"} onClick={handleClick}>
              <IconWrapper>
                <LayoutDashboard size={20} />
              </IconWrapper>
              <span>Dashboard</span>
            </NavItem>
            
            <NavItem href="/clientes" $active={location === "/clientes"} onClick={handleClick}>
              <IconWrapper>
                <Users size={20} />
              </IconWrapper>
              <span>Clientes</span>
            </NavItem>
            
            <NavItem href="/analises" $active={location === "/analises"} onClick={handleClick}>
              <IconWrapper>
                <LineChart size={20} />
              </IconWrapper>
              <span>Análises</span>
            </NavItem>
            
            <NavItem href="/negocios" $active={location === "/negocios"} onClick={handleClick}>
              <IconWrapper>
                <Briefcase size={20} />
              </IconWrapper>
              <span>Negócios</span>
            </NavItem>
            
          </div>
        </SidebarNav>
      </SidebarContainer>
      
      <Overlay isOpen={isOpen} onClick={onClose} />
    </>
  );
};

export default Sidebar;

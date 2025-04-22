import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import styled from "styled-components";
import { 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Avatar
} from "@mui/material";
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  BusinessCenter as BusinessCenterIcon,
  SmartToy as BotIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const SidebarContainer = styled(Box)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${drawerWidth}px;
  height: 100vh;
  background-color: ${props => props.theme.colors.spaceBlack};
  border-right: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 1300;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }

  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.space[4]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[2]};
`;

const LogoIcon = styled(Avatar)`
  background-image: ${props => props.theme.gradients.bluePurple};
  color: white;
  width: ${props => props.theme.space[8]};
  height: ${props => props.theme.space[8]};
`;

const LogoText = styled(Typography)`
  font-weight: 700;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.foreground};
`;

const StyledNavItem = styled(ListItemButton)<{ $active: boolean }>`
  margin: ${props => props.theme.space[1]} 0;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.space[2]} ${props => props.theme.space[4]};
  background: ${props => props.$active ? props.theme.gradients.bluePurple : 'transparent'};
  box-shadow: ${props => props.$active ? props.theme.boxShadow.neonBlue : 'none'};
  
  &:hover {
    background-color: ${props => props.$active ? 'transparent' : 'rgba(255, 255, 255, 0.08)'};
  }

  .MuiListItemIcon-root {
    color: ${props => props.$active ? 'white' : props.theme.colors.mutedForeground};
    min-width: 40px;
  }

  .MuiListItemText-primary {
    color: ${props => props.$active ? 'white' : props.theme.colors.mutedForeground};
    font-weight: ${props => props.$active ? '600' : '400'};
  }
`;

const Overlay = styled(Box)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1200;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledCloseButton = styled(IconButton)`
  color: ${props => props.theme.colors.mutedForeground};
  
  &:hover {
    color: ${props => props.theme.colors.foreground};
    background-color: rgba(255, 255, 255, 0.08);
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

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Clientes", icon: <PeopleIcon />, path: "/clientes" },
    { text: "Análises", icon: <BarChartIcon />, path: "/analises" },
    { text: "Negócios", icon: <BusinessCenterIcon />, path: "/negocios" },
  ];

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <LogoIcon>
              <BotIcon fontSize="small" />
            </LogoIcon>
            <LogoText variant="h6">SDR IA</LogoText>
          </Logo>
          {isMobile && (
            <StyledCloseButton size="small" onClick={onClose} aria-label="fechar">
              <CloseIcon fontSize="small" />
            </StyledCloseButton>
          )}
        </SidebarHeader>
        
        <List sx={{ p: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} component={Link} href={item.path} disablePadding>
              <StyledNavItem $active={location === item.path} onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledNavItem>
            </ListItem>
          ))}
        </List>
      </SidebarContainer>
      
      <Overlay isOpen={isOpen} onClick={onClose} />
    </>
  );
};

export default Sidebar;

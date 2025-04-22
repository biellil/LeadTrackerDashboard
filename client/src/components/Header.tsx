import styled from "styled-components";
import { Search, Bell, Menu } from "lucide-react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const HeaderContainer = styled(AppBar)`
  background-color: ${props => props.theme.colors.spaceGray} !important;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
  position: sticky;
  top: 0;
  z-index: 20;
  color: ${props => props.theme.colors.foreground};
`;

const HeaderSection = styled(Box)`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 0.25rem 1rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  min-width: 150px;
  margin-left: 0.5rem;
  font-size: ${props => props.theme.fontSizes.sm};

  .MuiInputBase-input {
    padding: 0.5rem 0;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: ${props => props.theme.colors.mutedForeground};
  
  &:hover {
    color: ${props => props.theme.colors.foreground};
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const NotificationIndicator = styled.span`
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.neonRed};
  position: absolute;
  top: 5px;
  right: 5px;
`;

const TitleTypography = styled(Typography)`
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.foreground};
  margin-left: 0.5rem;
`;

interface HeaderProps {
  title: string;
  onOpenSidebar: () => void;
}

const Header = ({ title, onOpenSidebar }: HeaderProps) => {
  return (
    <HeaderContainer elevation={0} position="sticky">
      <Toolbar>
        <HeaderSection sx={{ flex: 1 }}>
          <StyledIconButton 
            edge="start" 
            aria-label="menu"
            onClick={onOpenSidebar}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </StyledIconButton>
          <TitleTypography variant="h6" noWrap>
            {title}
          </TitleTypography>
        </HeaderSection>
        
        <HeaderSection>
          <SearchContainer>
            <SearchIcon sx={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }} />
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
            />
          </SearchContainer>
          
          <StyledIconButton aria-label="notifications" sx={{ position: 'relative' }}>
            <NotificationsIcon />
            <NotificationIndicator />
          </StyledIconButton>
        </HeaderSection>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;

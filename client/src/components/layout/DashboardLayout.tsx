import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box, Container } from "@mui/material";

const DashboardWrapper = styled.div`
  background-color: ${props => props.theme.colors.spaceBlack};
  color: ${props => props.theme.colors.foreground};
  font-family: ${props => props.theme.fonts.sans};
  min-height: 100vh;
  display: flex;
`;

const MainContent = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    margin-left: ${props => props.isSidebarOpen ? '16rem' : '5rem'};
  }
`;

const MainContainer = styled.main`
  padding: ${props => props.theme.space[6]};
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.colors.card};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.space[4]};
  text-align: center;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };
  
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <DashboardWrapper>
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <MainContent isSidebarOpen={isSidebarOpen}>
        <Header title={title} onOpenSidebar={handleOpenSidebar} />
        
        <MainContainer>
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        </MainContainer>
        
        <Footer>
          &copy; {new Date().getFullYear()} SDR IA Dashboard. Todos os direitos reservados.
        </Footer>
      </MainContent>
    </DashboardWrapper>
  );
};

export default DashboardLayout;

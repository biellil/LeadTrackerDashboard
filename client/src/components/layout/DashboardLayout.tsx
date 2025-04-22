import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainContent = styled.div<{ isSidebarOpen: boolean }>`
  margin-left: 0;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  
  @media (min-width: 768px) {
    margin-left: 16rem;
  }
`;

const MainContainer = styled.main`
  padding: 1.5rem;
`;

const Footer = styled.footer`
  background-color: hsl(var(--dark-panel));
  border-top: 1px solid hsl(var(--border));
  padding: 1rem;
  text-align: center;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
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
    <div className="bg-[hsl(var(--space-black))] text-gray-100 font-sans min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <MainContent isSidebarOpen={isSidebarOpen}>
        <Header title={title} onOpenSidebar={handleOpenSidebar} />
        
        <MainContainer>
          {children}
        </MainContainer>
        
        <Footer>
          &copy; {new Date().getFullYear()} NexusAI Dashboard. Todos os direitos reservados.
        </Footer>
      </MainContent>
    </div>
  );
};

export default DashboardLayout;

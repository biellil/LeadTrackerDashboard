import { useState } from "react";
import styled from "styled-components";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClienteWithNegocio } from "@/types/client";
import { getTemperatureColor, getInitial, getInitialGradient } from "@/lib/colors";

const TableContainer = styled(Card)`
  background-color: hsl(var(--dark-panel));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const TableHeader = styled(CardHeader)`
  border-bottom: 1px solid hsl(var(--border));
  padding: 1.5rem;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TableTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
`;

const SearchActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(var(--muted-foreground));
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  font-size: 0.75rem;
`;

const TableHeadCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-weight: 500;
`;

const TableBody = styled.tbody`
  & tr {
    border-bottom: 1px solid hsl(var(--border));
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: hsl(var(--muted) / 0.3);
    }
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  vertical-align: middle;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ClientAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
`;

const ClientDetails = styled.div`
  margin-left: 1rem;
`;

const ClientName = styled.div`
  font-weight: 500;
`;

const ClientId = styled.div`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

const TemperatureTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
`;

const IAStatusIndicator = styled.span`
  display: flex;
  align-items: center;
`;

const StatusDot = styled.span<{ active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ active }) => active ? 'hsl(var(--neon-green))' : 'hsl(var(--muted))'};
  ${({ active }) => active && 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;'}
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled(Button)`
  color: hsl(var(--muted-foreground));
  padding: 0.25rem;
  
  &:hover {
    color: white;
  }
  
  &.delete:hover {
    color: hsl(var(--neon-red));
  }
`;

const TableFooter = styled(CardContent)`
  background-color: hsl(var(--muted));
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaginationInfo = styled.div`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const PaginationButton = styled(Button)<{ $active?: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  background-color: ${({ $active }) => $active ? 'hsl(var(--neon-blue))' : 'hsl(var(--muted) / 0.7)'};
  color: ${({ $active }) => $active ? 'white' : 'hsl(var(--muted-foreground))'};
  
  &:hover {
    background-color: ${({ $active }) => $active ? 'hsl(var(--neon-blue))' : 'hsl(var(--muted) / 0.5)'};
  }
`;

interface ClientsTableProps {
  clients: ClienteWithNegocio[];
  totalClients: number;
  onViewClient?: (client: ClienteWithNegocio) => void;
  onEditClient?: (client: ClienteWithNegocio) => void;
  onDeleteClient?: (client: ClienteWithNegocio) => void;
  onAddClient?: () => void;
}

const ClientsTable = ({ 
  clients,
  totalClients,
  onViewClient,
  onEditClient,
  onDeleteClient,
  onAddClient
}: ClientsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <TableContainer>
      <TableHeader>
        <HeaderContent>
          <TableTitle>Clientes Recentes</TableTitle>
          
          <SearchActionWrapper>
            <SearchWrapper>
              <Input 
                type="text" 
                placeholder="Buscar cliente" 
                className="bg-gray-700 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] w-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIconWrapper>
                <Search size={16} />
              </SearchIconWrapper>
            </SearchWrapper>
            
            <ActionsWrapper>
              <Button variant="outline" className="bg-gray-700 hover:bg-gray-600">
                <Filter size={16} className="mr-2" />
                Filtrar
              </Button>
              <Button 
                className="bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)_/_0.8)]"
                onClick={onAddClient}
              >
                <Plus size={16} className="mr-2" />
                Novo Cliente
              </Button>
            </ActionsWrapper>
          </SearchActionWrapper>
        </HeaderContent>
      </TableHeader>
      
      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
              <TableHeadCell>Cliente</TableHeadCell>
              <TableHeadCell>Telefone</TableHeadCell>
              <TableHeadCell>Empresa</TableHeadCell>
              <TableHeadCell>Temperatura</TableHeadCell>
              <TableHeadCell>Última Contato</TableHeadCell>
              <TableHeadCell>IA Ativa</TableHeadCell>
              <TableHeadCell className="text-right">Ações</TableHeadCell>
            </tr>
          </TableHead>
          <TableBody>
            {clients.map((client) => {
              const tempColor = getTemperatureColor(client.temperatura as any);
              const initialGradient = getInitialGradient(client.nome_cliente);
              const initial = getInitial(client.nome_cliente);
              
              return (
                <tr key={client.id}>
                  <TableCell>
                    <ClientInfo>
                      <ClientAvatar className={initialGradient}>
                        {initial}
                      </ClientAvatar>
                      <ClientDetails>
                        <ClientName>{client.nome_cliente}</ClientName>
                        <ClientId>#{client.numero_identificacao}</ClientId>
                      </ClientDetails>
                    </ClientInfo>
                  </TableCell>
                  <TableCell>{client.telefone}</TableCell>
                  <TableCell>{client.nome_empresa}</TableCell>
                  <TableCell>
                    <TemperatureTag className={`${tempColor.bgOpacity} ${tempColor.text}`}>
                      {client.temperatura}
                    </TemperatureTag>
                  </TableCell>
                  <TableCell>{client.UltimaMsgLead ? new Date(client.UltimaMsgLead).toLocaleDateString('pt-BR') : '-'}</TableCell>
                  <TableCell>
                    <IAStatusIndicator>
                      <StatusDot active={client.IA} />
                      {client.IA ? 'Ativa' : 'Inativa'}
                    </IAStatusIndicator>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewClient && onViewClient(client)}
                      >
                        <Eye size={18} />
                      </ActionButton>
                      <ActionButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditClient && onEditClient(client)}
                      >
                        <Edit size={18} />
                      </ActionButton>
                      <ActionButton 
                        variant="ghost" 
                        size="sm" 
                        className="delete"
                        onClick={() => onDeleteClient && onDeleteClient(client)}
                      >
                        <Trash2 size={18} />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </tr>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
      
      <TableFooter>
        <PaginationInfo>
          Mostrando <span className="font-medium">{clients.length}</span> de <span className="font-medium">{totalClients}</span> clientes
        </PaginationInfo>
        
        <PaginationButtons>
          <PaginationButton 
            size="sm" 
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </PaginationButton>
          
          <PaginationButton size="sm" variant="outline" $active={currentPage === 1} onClick={() => handlePageChange(1)}>
            1
          </PaginationButton>
          
          <PaginationButton size="sm" variant="outline" $active={currentPage === 2} onClick={() => handlePageChange(2)}>
            2
          </PaginationButton>
          
          <PaginationButton size="sm" variant="outline" $active={currentPage === 3} onClick={() => handlePageChange(3)}>
            3
          </PaginationButton>
          
          <PaginationButton size="sm" variant="outline">...</PaginationButton>
          
          <PaginationButton size="sm" variant="outline" onClick={() => handlePageChange(16)}>
            16
          </PaginationButton>
          
          <PaginationButton 
            size="sm" 
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 16}
          >
            <ChevronRight size={16} />
          </PaginationButton>
        </PaginationButtons>
      </TableFooter>
    </TableContainer>
  );
};

export default ClientsTable;

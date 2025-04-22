import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { 
  Users, 
  UserPlus, 
  PieChart, 
  Bot, 
  BarChart2, 
  AlertTriangle, 
  Clock, 
  LineChart as LineChartIcon, 
  BanknoteIcon
} from "lucide-react";
import { 
  Box,
  useTheme
} from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import ClientsTable from "../components/ClientsTable";
import DetailPanel from "../components/dashboard/DetailPanel";
import { ClienteWithNegocio } from "../types/client";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Dashboard = () => {
  const [selectedChartFilter, setSelectedChartFilter] = useState("trimestre");

  // Fetch clients data
  const { data: clientsData, isLoading, error } = useQuery<{ 
    clients: ClienteWithNegocio[], 
    stats: any 
  }>({
    queryKey: ['/api/clients'],
  });

  // Mock data for charts (in a real app, this would come from the API)
  const clientGrowthData = [
    { name: 'Jan', novosClientes: 18, comIAAtiva: 10 },
    { name: 'Fev', novosClientes: 25, comIAAtiva: 15 },
    { name: 'Mar', novosClientes: 28, comIAAtiva: 20 },
    { name: 'Abr', novosClientes: 32, comIAAtiva: 25 },
    { name: 'Mai', novosClientes: 36, comIAAtiva: 28 },
    { name: 'Jun', novosClientes: 42, comIAAtiva: 35 },
    { name: 'Jul', novosClientes: 45, comIAAtiva: 38 },
    { name: 'Ago', novosClientes: 50, comIAAtiva: 42 },
    { name: 'Set', novosClientes: 56, comIAAtiva: 48 },
  ];

  const crmUsageData = [
    { name: 'Sem CRM', value: 15, color: 'hsl(var(--neon-red))' },
    { name: 'CRM Básico', value: 25, color: 'hsl(var(--neon-yellow))' },
    { name: 'CRM Avançado', value: 35, color: 'hsl(var(--neon-blue))' },
    { name: 'CRM com IA', value: 25, color: 'hsl(var(--neon-purple))' },
  ];

  const segmentosData = [
    { name: 'Tecnologia', value: 30, color: 'hsl(var(--neon-blue))' },
    { name: 'Saúde', value: 15, color: 'hsl(var(--neon-purple))' },
    { name: 'Varejo', value: 20, color: 'hsl(var(--neon-green))' },
    { name: 'Finanças', value: 12, color: 'hsl(var(--neon-yellow))' },
    { name: 'Educação', value: 10, color: 'hsl(var(--neon-red))' },
    { name: 'Outros', value: 13, color: 'hsl(var(--muted))' },
  ];

  const iaMetricsData = [
    { 
      name: 'Clientes Abertos para IA', 
      value: 85, 
      gradient: 'linear-gradient(to right, hsl(var(--neon-blue)), hsl(var(--neon-purple)))'
    },
    { 
      name: 'Experiência Prévia com IA', 
      value: 42, 
      gradient: 'linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-red)))'
    },
    { 
      name: 'Integração CRM Completa', 
      value: 63, 
      gradient: 'linear-gradient(to right, hsl(var(--neon-green)), hsl(var(--neon-blue)))'
    },
    { 
      name: 'Prospecção via WhatsApp', 
      value: 78, 
      gradient: 'linear-gradient(to right, hsl(var(--neon-yellow)), hsl(var(--neon-green)))'
    },
    { 
      name: 'Automação de Tarefas', 
      value: 56, 
      gradient: 'linear-gradient(to right, hsl(var(--neon-red)), hsl(var(--neon-yellow)))'
    },
  ];

  const challengesData = [
    {
      name: 'Perda de Oportunidades',
      value: '45% dos clientes reportam',
      icon: <AlertTriangle size={16} />,
      color: 'hsl(var(--neon-red))',
      bgColor: 'hsl(var(--neon-red) / 0.2)',
    },
    {
      name: 'Tarefas Repetitivas',
      value: '68% dos clientes reportam',
      icon: <Clock size={16} />,
      color: 'hsl(var(--neon-yellow))',
      bgColor: 'hsl(var(--neon-yellow) / 0.2)',
    },
    {
      name: 'Fluxo de Trabalho',
      value: '37% dos clientes reportam',
      icon: <LineChartIcon size={16} />,
      color: 'hsl(var(--neon-blue))',
      bgColor: 'hsl(var(--neon-blue) / 0.2)',
    },
    {
      name: 'Orçamento Limitado',
      value: '29% dos clientes reportam',
      icon: <BanknoteIcon size={16} />,
      color: 'hsl(var(--neon-green))',
      bgColor: 'hsl(var(--neon-green) / 0.2)',
    }
  ];

  // Example clients data while API is not connected
  const exampleClients: ClienteWithNegocio[] = [
    {
      id: 1,
      nome_cliente: "Maria Silva",
      telefone: "(11) 98765-4321",
      temperatura: "Quente",
      numero_identificacao: "ID10283",
      resumo: "Cliente interessado em automação de processos",
      nome_empresa: "Tech Solutions",
      UltimaMsgLead: "2023-05-12",
      create_time: "2023-01-15",
      IA: true
    },
    {
      id: 2,
      nome_cliente: "João Pereira",
      telefone: "(21) 99876-5432",
      temperatura: "Morno",
      numero_identificacao: "ID10284",
      resumo: "Procurando soluções para melhorar atendimento",
      nome_empresa: "Inovação Digital",
      UltimaMsgLead: "2023-05-15",
      create_time: "2023-02-10",
      IA: true
    },
    {
      id: 3,
      nome_cliente: "Ana Oliveira",
      telefone: "(11) 97654-3210",
      temperatura: "Frio",
      numero_identificacao: "ID10285",
      resumo: "Avaliando opções de CRM",
      nome_empresa: "Future Retail",
      UltimaMsgLead: "2023-05-18",
      create_time: "2023-03-05",
      IA: false
    },
    {
      id: 4,
      nome_cliente: "Roberto Santos",
      telefone: "(31) 98877-6655",
      temperatura: "Quente",
      numero_identificacao: "ID10286",
      resumo: "Interessado em implementação imediata",
      nome_empresa: "Nexus Solutions",
      UltimaMsgLead: "2023-05-20",
      create_time: "2023-03-22",
      IA: true
    },
    {
      id: 5,
      nome_cliente: "Carla Mendes",
      telefone: "(41) 99988-7766",
      temperatura: "Morno",
      numero_identificacao: "ID10287",
      resumo: "Precisa melhorar automação de vendas",
      nome_empresa: "Global Tech",
      UltimaMsgLead: "2023-05-21",
      create_time: "2023-04-10",
      IA: true
    }
  ];

  const handleViewClient = (client: ClienteWithNegocio) => {
    console.log("View client:", client);
  };

  const handleEditClient = (client: ClienteWithNegocio) => {
    console.log("Edit client:", client);
  };

  const handleDeleteClient = (client: ClienteWithNegocio) => {
    console.log("Delete client:", client);
  };

  const handleAddClient = () => {
    console.log("Add new client");
  };

  const theme = useTheme();

  // Cores personalizadas para os gráficos
  const neonBlue = "#3b82f6";
  const neonPurple = "#8b5cf6";
  const neonGreen = "#10b981";
  const neonRed = "#ef4444";
  const neonYellow = "#f59e0b";


  return (
    <DashboardLayout title="Dashboard de Clientes">
      {/* Quick Stats */}
      <GridContainer>
        <StatCard 
          title="Total Clientes"
          value="156"
          icon={<Users size={24} color={neonBlue} />}
          change={12}
          changeType="increase"
          iconBgColor={`${neonBlue}33`}
          accentColor={neonBlue}
        />

        <StatCard 
          title="Novos Leads"
          value="32"
          icon={<UserPlus size={24} color={neonPurple} />}
          change={8}
          changeType="increase"
          iconBgColor={`${neonPurple}33`}
          accentColor={neonPurple}
        />

        <StatCard 
          title="Conversão"
          value="68%"
          icon={<PieChart size={24} color={neonGreen} />}
          change={0}
          changeType="unchanged"
          changeLabel="sem alteração"
          iconBgColor={`${neonGreen}33`}
          accentColor={neonGreen}
        />

        <StatCard 
          title="Automação IA"
          value="78%"
          icon={<Bot size={24} color={neonRed} />}
          change={5}
          changeType="increase"
          iconBgColor={`${neonRed}33`}
          accentColor={neonRed}
        />
      </GridContainer>

      {/* Charts Section */}
      <ChartGrid>
        <ChartCard 
          title="Crescimento de Clientes" 
          filters={true}
          onFilterChange={setSelectedChartFilter}
          selectedFilter={selectedChartFilter}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={clientGrowthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNovos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={neonBlue} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={neonBlue} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorIA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={neonPurple} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={neonPurple} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e2f', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  fontSize: '0.875rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.5)'
                }} 
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.5)',
                  paddingTop: '10px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="novosClientes" 
                name="Novos Clientes"
                stroke={neonBlue} 
                fillOpacity={1} 
                fill="url(#colorNovos)" 
                strokeWidth={2}
                animationDuration={1500}
                animationBegin={300}
              />
              <Area 
                type="monotone" 
                dataKey="comIAAtiva" 
                name="Com IA Ativa"
                stroke={neonPurple} 
                fillOpacity={1} 
                fill="url(#colorIA)" 
                strokeWidth={2}
                animationDuration={1500}
                animationBegin={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Uso de Automação CRM" 
          icon={<BarChart2 size={18} color={neonBlue} />}
        >
          <ResponsiveContainer width="100%" height={350}>
            <RechartsPieChart>
              <Pie
                data={crmUsageData.map(item => ({
                  ...item,
                  color: item.name === 'Sem CRM' ? neonRed : 
                         item.name === 'CRM Básico' ? neonYellow : 
                         item.name === 'CRM Avançado' ? neonBlue : neonPurple
                }))}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                animationBegin={300}
                animationDuration={1500}
              >
                {crmUsageData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name === 'Sem CRM' ? neonRed : 
                      entry.name === 'CRM Básico' ? neonYellow : 
                      entry.name === 'CRM Avançado' ? neonBlue : neonPurple
                    } 
                    stroke="rgba(0,0,0,0.2)" 
                    strokeWidth={1} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, "Porcentagem"]}
                contentStyle={{ 
                  backgroundColor: '#1e1e2f', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  fontSize: '0.875rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                wrapperStyle={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.7)',
                  paddingLeft: '20px'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartGrid>

      {/* Clients Table */}
      <Box sx={{ mt: 4 }}>
        <ClientsTable 
          clients={clientsData?.clients || exampleClients}
          totalClients={156}
          onViewClient={handleViewClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onAddClient={handleAddClient}
        />
      </Box>

      {/* Detail Panels */}
      <Box sx={{ mt: 4 }}>
        <DetailPanel 
          segmentos={segmentosData}
          iaMetrics={iaMetricsData}
          challenges={challengesData}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
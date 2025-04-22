import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { clientes, negocio_cliente, type Cliente, type NegocioCliente } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all clients with their business information
  app.get("/api/clients", async (req, res) => {
    try {
      // This is just a placeholder for the actual database implementation
      // In a real app, you would use a connection to PostgreSQL
      
      // Mock data stats for the dashboard (this would come from actual DB queries)
      const stats = {
        totalClientes: 156,
        novosLeads: 32,
        taxaConversao: 68,
        taxaAutomacaoIA: 78,
        percentageGrowth: {
          clientes: 12,
          leads: 8,
          conversao: 0,
          automacaoIA: 5,
        }
      };
      
      // Example clients data (this would come from actual DB queries)
      const clients = [
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
          IA: true,
          negocio: {
            id: 1,
            cliente_id: 1,
            segmento_empresa: "Tecnologia",
            num_pessoas_comercial: 8,
            usa_automacao_crm: true,
            ferramenta_crm: "HubSpot",
            prospeccao_whatsapp: true,
            maior_desafio: "Automação de tarefas repetitivas",
            tempo_tarefas_repetitivas: true,
            perde_oportunidades: false,
            orcamento_automacao: 15000,
            tempo_implementacao: "3 meses",
            aberto_para_ia: true,
            experiencia_com_ia: true
          }
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
          IA: true,
          negocio: {
            id: 2,
            cliente_id: 2,
            segmento_empresa: "Educação",
            num_pessoas_comercial: 5,
            usa_automacao_crm: false,
            ferramenta_crm: null,
            prospeccao_whatsapp: true,
            maior_desafio: "Perda de oportunidades de vendas",
            tempo_tarefas_repetitivas: true,
            perde_oportunidades: true,
            orcamento_automacao: 8000,
            tempo_implementacao: "1 mês",
            aberto_para_ia: true,
            experiencia_com_ia: false
          }
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
          IA: false,
          negocio: {
            id: 3,
            cliente_id: 3,
            segmento_empresa: "Varejo",
            num_pessoas_comercial: 12,
            usa_automacao_crm: true,
            ferramenta_crm: "Salesforce",
            prospeccao_whatsapp: false,
            maior_desafio: "Orçamento limitado",
            tempo_tarefas_repetitivas: false,
            perde_oportunidades: true,
            orcamento_automacao: 5000,
            tempo_implementacao: "6 meses",
            aberto_para_ia: false,
            experiencia_com_ia: false
          }
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
          IA: true,
          negocio: {
            id: 4,
            cliente_id: 4,
            segmento_empresa: "Finanças",
            num_pessoas_comercial: 15,
            usa_automacao_crm: true,
            ferramenta_crm: "Microsoft Dynamics",
            prospeccao_whatsapp: true,
            maior_desafio: "Integração entre sistemas",
            tempo_tarefas_repetitivas: true,
            perde_oportunidades: false,
            orcamento_automacao: 25000,
            tempo_implementacao: "2 meses",
            aberto_para_ia: true,
            experiencia_com_ia: true
          }
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
          IA: true,
          negocio: {
            id: 5,
            cliente_id: 5,
            segmento_empresa: "Tecnologia",
            num_pessoas_comercial: 7,
            usa_automacao_crm: true,
            ferramenta_crm: "Zoho CRM",
            prospeccao_whatsapp: true,
            maior_desafio: "Fluxo de trabalho desorganizado",
            tempo_tarefas_repetitivas: true,
            perde_oportunidades: true,
            orcamento_automacao: 12000,
            tempo_implementacao: "1 mês",
            aberto_para_ia: true,
            experiencia_com_ia: false
          }
        }
      ];
      
      res.json({ clients, stats });
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a single client by ID with their business information
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // In a real implementation, you would get the client from the database
      // For example:
      // const client = await db.query.clientes.findFirst({
      //   where: eq(clientes.id, id),
      // });
      
      // const negocio = await db.query.negocio_cliente.findFirst({
      //   where: eq(negocio_cliente.cliente_id, id),
      // });
      
      res.json({ message: `Client with ID ${id} would be returned here` });
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new client
  app.post("/api/clients", async (req, res) => {
    try {
      const clientData = req.body;
      
      // In a real implementation, you would insert the client into the database
      // For example:
      // const newClient = await db.insert(clientes).values(clientData).returning();
      
      res.status(201).json({ message: "Client created successfully", client: clientData });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update a client
  app.put("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const clientData = req.body;
      
      // In a real implementation, you would update the client in the database
      // For example:
      // await db.update(clientes).set(clientData).where(eq(clientes.id, id));
      
      res.json({ message: `Client with ID ${id} updated successfully` });
    } catch (error) {
      console.error("Error updating client:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete a client
  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // In a real implementation, you would delete the client from the database
      // For example:
      // await db.delete(negocio_cliente).where(eq(negocio_cliente.cliente_id, id));
      // await db.delete(clientes).where(eq(clientes.id, id));
      
      res.json({ message: `Client with ID ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add or update business information for a client
  app.post("/api/clients/:id/negocio", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const negocioData = req.body;
      
      // In a real implementation, you would upsert the business info in the database
      // For example:
      // const existingNegocio = await db.query.negocio_cliente.findFirst({
      //   where: eq(negocio_cliente.cliente_id, id),
      // });
      
      // if (existingNegocio) {
      //   await db.update(negocio_cliente).set(negocioData).where(eq(negocio_cliente.cliente_id, id));
      // } else {
      //   await db.insert(negocio_cliente).values({ ...negocioData, cliente_id: id });
      // }
      
      res.json({ message: `Business info for client with ID ${id} saved successfully` });
    } catch (error) {
      console.error("Error saving business info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get dashboard statistics
  app.get("/api/stats", async (req, res) => {
    try {
      // In a real implementation, you would calculate stats from the database
      // For example counting clients, analyzing growth, etc.
      
      const stats = {
        totalClientes: 156,
        novosLeads: 32,
        taxaConversao: 68,
        taxaAutomacaoIA: 78,
        percentageGrowth: {
          clientes: 12,
          leads: 8,
          conversao: 0,
          automacaoIA: 5,
        }
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

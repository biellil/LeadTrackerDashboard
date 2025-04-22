import { pgTable, serial, varchar, text, date, boolean, numeric, integer, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clientes = pgTable("clientes", {
  id: serial("id").primaryKey(),
  nome_cliente: varchar("nome_cliente", { length: 100 }),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  temperatura: varchar("temperatura", { length: 20 }),
  numero_identificacao: varchar("numero_identificacao", { length: 50 }),
  resumo: text("resumo"),
  nome_empresa: varchar("nome_empresa", { length: 100 }),
  UltimaMsgLead: date("UltimaMsgLead"),
  create_time: date("create_time").defaultNow(),
  IA: boolean("IA").notNull().default(true),
});

export const negocio_cliente = pgTable("negocio_cliente", {
  id: serial("id").primaryKey(),
  cliente_id: integer("cliente_id").notNull().references(() => clientes.id),
  segmento_empresa: varchar("segmento_empresa", { length: 100 }),
  num_pessoas_comercial: integer("num_pessoas_comercial"),
  usa_automacao_crm: boolean("usa_automacao_crm"),
  ferramenta_crm: varchar("ferramenta_crm", { length: 100 }),
  prospeccao_whatsapp: boolean("prospeccao_whatsapp"),
  maior_desafio: text("maior_desafio"),
  tempo_tarefas_repetitivas: boolean("tempo_tarefas_repetitivas"),
  perde_oportunidades: boolean("perde_oportunidades"),
  orcamento_automacao: numeric("orcamento_automacao", { precision: 10, scale: 2 }),
  tempo_implementacao: varchar("tempo_implementacao", { length: 50 }),
  aberto_para_ia: boolean("aberto_para_ia"),
  experiencia_com_ia: boolean("experiencia_com_ia"),
});

export const insertClienteSchema = createInsertSchema(clientes).omit({
  id: true,
  create_time: true,
});

export const insertNegocioClienteSchema = createInsertSchema(negocio_cliente).omit({
  id: true,
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = z.infer<typeof insertClienteSchema>;
export type NegocioCliente = typeof negocio_cliente.$inferSelect;
export type InsertNegocioCliente = z.infer<typeof insertNegocioClienteSchema>;

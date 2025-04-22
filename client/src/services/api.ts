
import { apiRequest } from "../lib/queryClient";

export const api = {
  clients: {
    getAll: () => apiRequest("GET", "/api/clients"),
    // Add other client-related API calls here
  },
  // Add other API endpoints here
};

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./styles/global";
import { queryClient } from "./lib/queryClient";
import { AppRoutes } from "./routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
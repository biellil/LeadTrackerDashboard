
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import { AppRoutes } from "./routes";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./styles/global";

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

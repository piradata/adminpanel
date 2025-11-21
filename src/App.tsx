import { Header } from "@/src/components/header";
import { LayeredContainers } from "@/src/components/layered-containers";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <LayeredContainers />
    </main>
  );
}

import { Header } from "@/components/header"
import { LayeredContainers } from "@/components/layered-containers"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <LayeredContainers />
    </main>
  )
}

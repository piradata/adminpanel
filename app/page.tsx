import { Header } from "@/components/header"
import { ProximityGrid } from "@/components/proximity-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <ProximityGrid />
    </main>
  )
}

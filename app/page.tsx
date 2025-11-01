import { Header } from "@/components/header"
import { SimpleGrid } from "@/components/simple-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <SimpleGrid />
    </main>
  )
}

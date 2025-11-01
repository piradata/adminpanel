"use client"

import { servicesByCategory } from "@/lib/services"
import { ServiceCard } from "./service-card"

const CATEGORY_META: Record<string, { title: string; color: string; description?: string }> = {
  hub: { title: "Hub", color: "from-blue-500/20 to-blue-700/10", description: "Central personal entry point" },
  admin: { title: "Administration", color: "from-orange-500/20 to-orange-700/10", description: "Platform & infrastructure management" },
  media: { title: "Media Services", color: "from-purple-500/20 to-purple-700/10", description: "Media indexing, streaming & discovery" },
}

export function LayeredContainers() {
  return (
    <div className="space-y-10 px-4 md:px-6 lg:px-8 py-8">
      {Object.entries(servicesByCategory).map(([category, services]) => {
        const meta = CATEGORY_META[category]
        return (
          <section
            key={category}
            className="relative rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden"
          >
            {/* Gradient background layer */}
            <div className={`absolute inset-0 bg-gradient-to-br ${meta?.color || "from-accent/10 to-transparent"} pointer-events-none`} />
            <div className="relative z-10 p-5 md:p-6 lg:p-7">
              <header className="mb-5 md:mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                    {meta?.title || category}
                  </h2>
                  {meta?.description && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-prose">
                      {meta.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-accent" /> {services.length} services
                  </span>
                </div>
              </header>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

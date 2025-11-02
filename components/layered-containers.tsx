// Server Component: no client-only APIs required

import { servicesByCategory, categoryCounts, type CategoryDefinition } from "@/lib/services"
import { ServiceCard } from "./service-card"

export function LayeredContainers() {
  const categories = Object.entries(servicesByCategory) as Array<[
    string,
    CategoryDefinition
  ]>

  return (
    <div className="space-y-10 px-4 md:px-6 lg:px-8 py-8">
      {categories.map(([category, definition]) => {
        const meta = definition
        const totalServices = categoryCounts[category]
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
                    <span className="h-2 w-2 rounded-full bg-accent" /> {totalServices} services
                  </span>
                </div>
              </header>
              {/* Render top-level services; cluster nodes have nested services */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
                {definition.services.filter(s => !s.services).map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {definition.services.filter(s => s.services).map(cluster => {
                const clusterChildren = cluster.services ?? []
                const clusterCount = clusterChildren.length
                return (
                  <div
                    key={cluster.id}
                    className="mt-6 rounded-xl border border-border/60 bg-background/40 px-4 py-5 md:px-6 md:py-6 space-y-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                          {cluster.title || cluster.name}
                        </h3>
                        {cluster.description && (
                          <p className="text-sm text-muted-foreground mt-1 max-w-prose">
                            {cluster.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {clusterCount} services
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
                      {clusterChildren.map(child => (
                        <ServiceCard key={child.id} service={child} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

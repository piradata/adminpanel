import { servicesByCategory, categoryCounts, type CategoryDefinition, type ServiceNode } from "@/src/components/services"
import { ServiceCard } from "./service-card"

export function LayeredContainers() {
  const categories = Object.entries(servicesByCategory) as Array<[
    string,
    CategoryDefinition
  ]>

  // Recursive renderer: cluster nodes (with nested services) are rendered with header + grid
  function renderNodes(nodes: Record<string, ServiceNode>, depth: number = 0) {
    const entries = Object.entries(nodes)
    const clusters = entries.filter(([, n]) => n.services)
    const leaves = entries.filter(([, n]) => !n.services)

    return (
      <div className="space-y-6">
        {leaves.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {leaves.map(([key, leaf]) => <ServiceCard key={key} service={leaf} />)}
          </div>
        )}
        {clusters.map(([key, cluster]) => {
          const children = cluster.services ? Object.values(cluster.services) : []
          const count = children.length + (cluster.displaySelf ? 1 : 0)
          return (
            <div
              key={key}
              className={`rounded-xl border border-border/60 bg-background/40 px-4 py-5 md:px-6 md:py-6 space-y-5 ${depth === 0 ? 'mt-6' : ''}`}
            >
              {cluster.displaySelf ? (
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left: self card */}
                  <div className="flex-shrink-0 w-36">
                    <ServiceCard service={cluster} />
                  </div>
                  {/* Right: text + count */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                        {cluster.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap mt-1 md:mt-0">
                        {count} services
                      </span>
                    </div>
                    {cluster.description && (
                      <p className="text-sm text-muted-foreground max-w-prose leading-relaxed">
                        {cluster.description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                      {cluster.title}
                    </h3>
                    {cluster.description && (
                      <p className="text-sm text-muted-foreground mt-1 max-w-prose">
                        {cluster.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {count} services
                  </span>
                </div>
              )}
              {cluster.services && renderNodes(cluster.services, depth + 1)}
            </div>
          )
        })}
      </div>
    )
  }

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
            <div className={`absolute inset-0 bg-gradient-to-br ${meta?.color || 'from-accent/10 to-transparent'} pointer-events-none`} />
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
              {renderNodes(definition.services)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

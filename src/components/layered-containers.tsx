import {
  servicesByCategory,
  type CategoryDefinition,
  type ServiceNode,
} from "@/src/components/services";
import { ServiceCard } from "./service-card";
import { ClusterHeader } from "./cluster-header";

const categories = Object.entries(servicesByCategory) as Array<
  [string, CategoryDefinition]
>;

// Count services recursively
const countServices = (nodes: Record<string, ServiceNode>): number => {
  return Object.values(nodes).reduce((total, node) => {
    const subCount = node.services ? countServices(node.services) : 0;
    return total + 1 + subCount;
  }, 0);
};

const renderNodes = (nodes: Record<string, ServiceNode>, depth: number = 0) => {
  const entries = Object.entries(nodes);
  const clusters = entries.filter(([, n]) => n.services);
  const leaves = entries.filter(([, n]) => !n.services);

  return (
    <div className="space-y-6">
      {leaves.length > 0 && (
        <div className="grid gap-3 md:gap-4 lg:gap-5 grid-cols-[repeat(auto-fit,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {leaves.map(([key, leaf]) => (
            <ServiceCard key={key} service={leaf} />
          ))}
        </div>
      )}
      {clusters.map(([key, cluster]) => {
        const children = cluster.services
          ? Object.values(cluster.services)
          : [];
        const count = children.length + (cluster.displaySelf ? 1 : 0);
        return (
          <div
            key={key}
            className={`rounded-xl border border-border/60 bg-background/40 px-4 py-5 md:px-6 md:py-6 space-y-5 ${
              depth === 0 ? "mt-6" : ""
            }`}
          >
            <ClusterHeader cluster={cluster} count={count} />
            {cluster.services && (
              <>{renderNodes(cluster.services, depth + 1)}</>
            )}
          </div>
        );
      })}
    </div>
  );
};

export function LayeredContainers() {
  // Recursive renderer: cluster nodes (with nested services) are rendered with header + grid
  return (
    <div className="space-y-10 px-4 md:px-6 lg:px-8 py-8">
      {categories.map(([category, definition]) => {
        const meta = definition;
        const totalServices = countServices(definition.services);
        return (
          <section
            key={category}
            className="relative rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                meta?.color || "from-accent/10 to-transparent"
              } pointer-events-none`}
            />
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
                    <span className="h-2 w-2 rounded-full bg-accent" />{" "}
                    {totalServices} services
                  </span>
                </div>
              </header>
              {renderNodes(definition.services)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

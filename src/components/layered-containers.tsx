import { type CategoryDefinition, type ServiceNode, servicesByCategory } from '@/src/components/services';
import { useServiceCardNavigation } from '@/src/hooks/useServiceCardNavigation';
import { ClusterHeader } from './cluster-header';
import { ServiceCard } from './service-card';

const CARD_WRAPPER_CLASS =
  'flex-grow basis-[90px] sm:basis-[100px] md:basis-[110px] lg:basis-[120px] xl:basis-[130px] 2xl:basis-[140px] max-w-[140px]';

const noSelect = { userSelect: 'none' as const };

function countServices(nodes: Record<string, ServiceNode>): number {
  return Object.values(nodes).reduce(
    (total, node) => total + 1 + (node.services ? countServices(node.services) : 0),
    0
  );
}

function partitionNodes(nodes: Record<string, ServiceNode>) {
  return Object.entries(nodes).reduce(
    (acc, entry) => {
      (entry[1].services ? acc.clusters : acc.leaves).push(entry);
      return acc;
    },
    { leaves: [] as [string, ServiceNode][], clusters: [] as [string, ServiceNode][] }
  );
}

function LeafGrid({ leaves }: { leaves: [string, ServiceNode][] }) {
  if (leaves.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-5" data-service-card-grid>
      {leaves.map(([key, leaf]) => (
        <div key={key} data-service-card className={CARD_WRAPPER_CLASS}>
          <ServiceCard service={leaf} />
        </div>
      ))}
    </div>
  );
}

function ServiceNodeTree({ nodes, depth = 0 }: { nodes: Record<string, ServiceNode>; depth?: number }) {
  const { leaves, clusters } = partitionNodes(nodes);

  return (
    <div className="space-y-6">
      <LeafGrid leaves={leaves} />
      {clusters.map(([key, cluster]) => {
        const childCount = cluster.services ? Object.keys(cluster.services).length : 0;
        const count = childCount + (cluster.displaySelf ? 1 : 0);

        return (
          <div
            key={key}
            data-service-card-group
            className={`rounded-xl border border-border/60 bg-background/40 px-4 py-5 md:px-6 md:py-6 space-y-5 ${
              depth === 0 ? 'mt-6' : ''
            }`}
          >
            <ClusterHeader cluster={cluster} count={count} />
            {cluster.services && <ServiceNodeTree nodes={cluster.services} depth={depth + 1} />}
          </div>
        );
      })}
    </div>
  );
}

function CategorySection({ category, definition }: { category: string; definition: CategoryDefinition }) {
  const totalServices = countServices(definition.services);

  return (
    <section className="relative rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          definition.color || 'from-accent/10 to-transparent'
        } pointer-events-none`}
      />
      <div className="relative z-10 p-5 md:p-6 lg:p-7">
        <header className="mb-5 md:mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight" style={noSelect}>
              {definition.title || category}
            </h2>
            {definition.description && (
              <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-prose" style={noSelect}>
                {definition.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground" style={noSelect}>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-accent" /> {totalServices} services
            </span>
          </div>
        </header>
        <ServiceNodeTree nodes={definition.services} />
      </div>
    </section>
  );
}

export function LayeredContainers() {
  useServiceCardNavigation();

  return (
    <div className="space-y-10 px-4 md:px-6 lg:px-8 py-8">
      {Object.entries(servicesByCategory).map(([category, definition]) => (
        <CategorySection key={category} category={category} definition={definition} />
      ))}
    </div>
  );
}

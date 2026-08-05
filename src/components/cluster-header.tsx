import type { ServiceNode } from '@/src/components/services';

interface ClusterHeaderProps {
  cluster: ServiceNode;
  count: number;
}

const noSelect = { userSelect: 'none' as const };

function ClusterTitleBlock({ title, count }: { title: string; count: number }) {
  return (
    <>
      <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight" style={noSelect}>
        {title}
      </h3>
      <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide" style={noSelect}>
        {count} services
      </span>
    </>
  );
}

export function ClusterHeader({ cluster, count }: Readonly<ClusterHeaderProps>) {
  const showSelf = cluster.displaySelf !== false;
  const title = showSelf ? cluster.clusterTitle || cluster.title : cluster.clusterTitle;

  if (!showSelf) {
    return (
      <div className="flex flex-col gap-2">
        <ClusterTitleBlock title={title ?? cluster.title} count={count} />
        {cluster.description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-prose" style={noSelect}>
            {cluster.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-5 border-b border-border/40">
      <div className="flex flex-col items-start">
        <ClusterTitleBlock title={title ?? cluster.title} count={count} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div data-service-card className="inline-flex">
          <a
            href={cluster.url || '#'}
            target={cluster.url ? '_blank' : undefined}
            rel={cluster.url ? 'noopener noreferrer' : undefined}
            aria-label={`Open ${cluster.title}`}
            className="group relative flex-shrink-0 rounded-lg border border-transparent p-1 outline-none select-none cursor-default transition-all duration-300 hover:shadow-lg focus:shadow-lg"
          >
            <img
              src={cluster.logo}
              alt={`${cluster.title} logo`}
              width={80}
              height={80}
              loading="lazy"
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/40 group-focus:ring-2 group-focus:ring-accent/40 transition-all duration-300" />
          </a>
        </div>
        {cluster.description && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1" style={noSelect}>
            {cluster.description}
          </p>
        )}
      </div>
    </div>
  );
}

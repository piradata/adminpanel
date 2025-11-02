import type { ServiceNode } from "@/src/components/services";

interface ClusterHeaderProps {
  cluster: ServiceNode;
  count: number;
}

export function ClusterHeader({ cluster, count }: ClusterHeaderProps) {
  return (
    <>
      {cluster.displaySelf !== false ? (
        <>
          <div className="space-y-4 pb-5 border-b border-border/40">
            <div className="flex flex-col items-start">
              <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                {cluster.clusterTitle || cluster.title}
              </h3>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">
                {count} services
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              {/* Smaller clickable icon on left */}
              <a
                href={cluster.url || "#"}
                target={cluster.url ? "_blank" : undefined}
                rel={cluster.url ? "noopener noreferrer" : undefined}
                className="flex-shrink-0 group"
              >
                <img
                  src={cluster.logo}
                  alt={`${cluster.title} logo`}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              {/* Description vertically centered on right */}
              {cluster.description && (
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {cluster.description}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
            {cluster.clusterTitle}
          </h3>
          <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">
            {count} services
          </span>
          {cluster.description && (
            <p className="text-sm text-muted-foreground mt-1 max-w-prose">
              {cluster.description}
            </p>
          )}
        </div>
      )}
    </>
  );
}

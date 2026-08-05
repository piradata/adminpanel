import type { Service } from '@/src/components/services';

export interface ServiceCardProps {
  service: Service;
  /** First paint / LCP candidate — skip lazy, hint high priority */
  priority?: boolean;
}

export function ServiceCard({ service, priority = false }: Readonly<ServiceCardProps>) {
  const hrefAttr = service.url || '#';

  return (
    <a
      href={hrefAttr}
      target={service.url ? '_blank' : undefined}
      rel={service.url ? 'noopener noreferrer' : undefined}
      aria-label={`Open ${service.title}`}
      className="group relative overflow-hidden rounded-lg border bg-card/40 hover:bg-card/70 focus:bg-card/70 transition-all duration-300 hover:shadow-lg focus:shadow-lg aspect-square flex outline-none select-none cursor-default"
    >
      {/* Image fills card */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <img
          src={service.logo || '/placeholder.jxl'}
          alt={`${service.title} logo`}
          width={192}
          height={192}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
        />
      </div>
      {/* Title bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent px-2 py-1.5">
        <h3
          className="font-medium text-xs  text-center text-foreground/90 group-hover:text-accent group-focus:text-accent line-clamp-2 leading-tight"
          style={{ userSelect: 'none' }}
        >
          {service.title}
        </h3>
      </div>
      {/* Focus ring */}
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/40 group-focus:ring-2 group-focus:ring-accent/40 transition-all duration-300" />
    </a>
  );
}

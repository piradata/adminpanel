import type { Service } from '@/src/components/services';

export interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: Readonly<ServiceCardProps>) {
  const hrefAttr = service.url || '#';

  return (
    <a
      href={hrefAttr}
      target={service.url ? '_blank' : undefined}
      rel={service.url ? 'noopener noreferrer' : undefined}
      className="group relative overflow-hidden rounded-lg border bg-card/40 hover:bg-card/70 transition-all duration-300 hover:shadow-lg aspect-square flex"
    >
      {/* Image fills card */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <img
          src={service.logo || '/placeholder.jpg'}
          alt={`${service.title} logo`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {/* Title bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent px-2 py-1.5">
        <h3
          className="font-medium text-xs  text-center text-foreground/90 group-hover:text-accent line-clamp-2 leading-tight"
          style={{ userSelect: 'none' }}
        >
          {service.title}
        </h3>
      </div>
      {/* Focus ring */}
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/40 transition-all duration-300" />
    </a>
  );
}

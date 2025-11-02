import {Service} from "@/src/components/services"

export interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const hrefAttr = service.url || "#"

  return (
    <a
      href={hrefAttr}
      target={service.url ? "_blank" : undefined}
      rel={service.url ? "noopener noreferrer" : undefined}
      className={"group relative overflow-hidden rounded-lg border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 aspect-square"}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 sm:gap-2 w-full h-full">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative flex items-center justify-center flex-shrink-0">
          <img
            src={service.logo || "/placeholder.svg"}
            alt={`${service.title} logo`}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 text-xs sm:text-xs md:text-sm text-center line-clamp-2">
          {service.title}
        </h3>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-cyan-500 group-hover:w-full transition-all duration-500" />
    </a>
  )
}

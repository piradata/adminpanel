"use client"

import Link from "next/link"
import { ServiceLogo } from "./service-logos"
import { useState } from "react"

interface Position {
  x: number
  y: number
  angle: number
}

interface Service {
  id: string
  name: string
  url: string
  isHub?: boolean
  category?: string
}

interface ServiceNodeProps {
  service: Service
  position: Position
  isHub?: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export function ServiceNode({ service, position, isHub, isHovered, onHover, onLeave }: ServiceNodeProps) {
  const [isTouching, setIsTouching] = useState(false)

  const categoryColors: Record<string, string> = {
    administration: "from-orange-600/20 to-orange-400/10 border-orange-500/30",
    media: "from-purple-600/20 to-purple-400/10 border-purple-500/30",
    personal: "from-green-600/20 to-green-400/10 border-green-500/30",
  }

  const borderColor = categoryColors[service.category || "media"] || categoryColors.media

  if (isHub) {
    return (
      <Link
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onTouchStart={() => {
          setIsTouching(true)
          onHover()
        }}
        onTouchEnd={() => {
          setIsTouching(false)
          onLeave()
        }}
      >
        <div
          className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-8 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/60 border-2 border-accent/50 shadow-lg sm:shadow-2xl transition-all duration-300 cursor-pointer ${
            isHovered || isTouching
              ? "scale-100 sm:scale-110 shadow-accent/50 sm:shadow-2xl"
              : "scale-90 sm:scale-100 hover:scale-95 sm:hover:scale-105"
          }`}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 text-accent-foreground">
            <ServiceLogo serviceId={service.id} />
          </div>
          <div className="text-center whitespace-nowrap font-semibold text-accent-foreground text-xs sm:text-sm">
            {service.name}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={() => {
        setIsTouching(true)
        onHover()
      }}
      onTouchEnd={() => {
        setIsTouching(false)
        onLeave()
      }}
    >
      <div
        className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg bg-gradient-to-br ${borderColor} border transition-all duration-300 cursor-pointer ${
          isHovered || isTouching
            ? "scale-100 sm:scale-110 shadow-lg shadow-accent/30 bg-opacity-40"
            : "scale-75 sm:scale-100 hover:scale-90 sm:hover:scale-105"
        }`}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 text-foreground">
          <ServiceLogo serviceId={service.id} />
        </div>
        <div className="text-center whitespace-nowrap font-medium text-foreground text-[10px] sm:text-xs">
          {service.name}
        </div>
      </div>
    </Link>
  )
}

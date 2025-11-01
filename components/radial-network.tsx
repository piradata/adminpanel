"use client"

import { useEffect, useRef, useState } from "react"
import { ServiceNode } from "./service-node"

const SERVICES = [
  // Central hub
  { id: "nginx", name: "Nginx Proxy Manager", url: "http://nginx-proxy.local", isHub: true, category: "hub" },

  // Personal Website
  { id: "personal", name: "Personal Website", url: "http://personal.local", category: "personal" },

  // Administration Category
  { id: "authentik", name: "Authentik", url: "http://authentik.local", category: "administration" },
  { id: "arcane", name: "Arcane", url: "http://arcane.local", category: "administration" },
  { id: "webmin", name: "Webmin", url: "http://webmin.local", category: "administration" },
  { id: "netbird", name: "Netbird", url: "http://netbird.local", category: "administration" },
  { id: "kasm", name: "Kasm", url: "http://kasm.local", category: "administration" },
  { id: "adguard", name: "AdGuard", url: "http://adguard.local", category: "administration" },
  { id: "cloudflare", name: "Cloudflared", url: "http://cloudflared.local", category: "administration" },

  // Media Category
  { id: "immich", name: "Immich", url: "http://immich.local", category: "media" },
  { id: "nextcloud", name: "Nextcloud", url: "http://nextcloud.local", category: "media" },
  { id: "jellyseerr", name: "Jellyseerr", url: "http://jellyseerr.local", category: "media" },
  { id: "wizarr", name: "Wizarr", url: "http://wizarr.local", category: "media" },
  { id: "prowlarr", name: "Prowlarr", url: "http://prowlarr.local", category: "media" },
  { id: "jellyfin", name: "Jellyfin", url: "http://jellyfin.local", category: "media" },
  { id: "sonarr", name: "Sonarr", url: "http://sonarr.local", category: "media" },
  { id: "radarr", name: "Radarr", url: "http://radarr.local", category: "media" },
  { id: "lidarr", name: "Lidarr", url: "http://lidarr.local", category: "media" },
]

interface Position {
  x: number
  y: number
  angle: number
}

export function RadialNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Record<string, Position>>({})
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const calculatePositions = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const newPositions: Record<string, Position> = {
        nginx: { x: centerX, y: centerY, angle: 0 },
      }

      const categoryGroups = {
        personal: SERVICES.filter((s) => s.category === "personal"),
        administration: SERVICES.filter((s) => s.category === "administration"),
        media: SERVICES.filter((s) => s.category === "media"),
      }

      // Inner ring: Personal Website
      const personalServices = categoryGroups.personal
      const personalRadius = Math.min(rect.width, rect.height) / 6
      personalServices.forEach((service, index) => {
        const angle = (index / Math.max(personalServices.length, 1)) * Math.PI * 2
        const x = centerX + Math.cos(angle) * personalRadius
        const y = centerY + Math.sin(angle) * personalRadius
        newPositions[service.id] = { x, y, angle }
      })

      // Middle ring: Administration
      const adminServices = categoryGroups.administration
      const adminRadius = Math.min(rect.width, rect.height) / (isMobile ? 3 : 2.8)
      adminServices.forEach((service, index) => {
        const angle = (index / adminServices.length) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * adminRadius
        const y = centerY + Math.sin(angle) * adminRadius
        newPositions[service.id] = { x, y, angle }
      })

      // Outer ring: Media
      const mediaServices = categoryGroups.media
      const mediaRadius = Math.min(rect.width, rect.height) / (isMobile ? 2 : 1.8)
      mediaServices.forEach((service, index) => {
        const angle = (index / mediaServices.length) * Math.PI * 2
        const x = centerX + Math.cos(angle) * mediaRadius
        const y = centerY + Math.sin(angle) * mediaRadius
        newPositions[service.id] = { x, y, angle }
      })

      setPositions(newPositions)
    }

    calculatePositions()
    window.addEventListener("resize", calculatePositions)
    return () => window.removeEventListener("resize", calculatePositions)
  }, [isMobile])

  // Draw connecting lines
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || Object.keys(positions).length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.fillStyle = "rgb(12, 12, 12)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerPos = positions.nginx
    if (!centerPos) return

    // Draw lines from center to each service
    SERVICES.filter((s) => !s.isHub).forEach((service) => {
      const pos = positions[service.id]
      if (!pos) return

      const isHovered = hoveredNode === service.id || hoveredNode === "nginx"
      const isHighlighted = hoveredNode && (hoveredNode === service.id || hoveredNode === "nginx")

      ctx.strokeStyle = isHovered ? "rgb(55, 150, 200)" : "rgb(30, 60, 100)"
      ctx.lineWidth = isHovered ? 2 : 1
      ctx.globalAlpha = isHovered ? 0.8 : 0.2

      ctx.beginPath()
      ctx.moveTo(centerPos.x, centerPos.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    })

    ctx.globalAlpha = 1
  }, [positions, hoveredNode])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-background via-background to-secondary/10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {positions.nginx && (
        <ServiceNode
          service={SERVICES[0]}
          position={positions.nginx}
          isHub={true}
          isHovered={hoveredNode === "nginx"}
          onHover={() => setHoveredNode("nginx")}
          onLeave={() => setHoveredNode(null)}
        />
      )}

      {SERVICES.filter((s) => !s.isHub).map((service) => {
        const pos = positions[service.id]
        if (!pos) return null

        return (
          <ServiceNode
            key={service.id}
            service={service}
            position={pos}
            isHovered={hoveredNode === service.id}
            onHover={() => setHoveredNode(service.id)}
            onLeave={() => setHoveredNode(null)}
          />
        )
      })}
    </div>
  )
}

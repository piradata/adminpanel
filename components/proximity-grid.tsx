"use client"

import { ServiceCard } from "./service-card"

// Service definitions with corrected logo URLs from official sources
const services = [
  // Hub - Personal Website (center)
  {
    id: "website",
    name: "Personal Website",
    logo: "https://avatars.githubusercontent.com/u/16529503",
    url: "",
    category: "hub",
  },

  // Administration Layer
  { id: "authentik", name: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "", category: "admin" },
  {
    id: "arcane",
    name: "Arcane",
    logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png",
    url: "",
    category: "admin",
  },
  { id: "webmin", name: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "", category: "admin" },
  {
    id: "netbird",
    name: "Netbird",
    logo: "https://netbird.io/apple-icon.png",
    url: "",
    category: "admin",
  },
  {
    id: "kasm",
    name: "Kasm",
    logo: "https://kasm.com/apple-touch-icon.png",
    url: "",
    category: "admin",
  },
  { id: "adguard", name: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "", category: "admin" },
  {
    id: "cloudflared",
    name: "Cloudflared",
    logo: "https://www.cloudflare.com/favicon.ico",
    url: "",
    category: "admin",
  },
  {
    id: "npm",
    name: "Nginx Proxy Manager",
    logo: "https://nginxproxymanager.com/logo.svg",
    url: "",
    category: "admin",
  },

  // Media Layer
  { id: "immich", name: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "", category: "media" },
  { id: "nextcloud", name: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "", category: "media" },
  {
    id: "jellyseer",
    name: "Jellyseerr",
    logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png",
    url: "",
    category: "media",
  },
  {
    id: "wizzar",
    name: "Wizarr",
    logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png",
    url: "",
    category: "media",
  },
  {
    id: "prowlar",
    name: "Prowlarr",
    logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png",
    url: "",
    category: "media",
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png",
    url: "",
    category: "media",
  },
  {
    id: "sonar",
    name: "Sonarr",
    logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png",
    url: "radar",
    category: "media",
  },
  {
    id: "radar",
    name: "Radarr",
    logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png",
    url: "",
    category: "media",
  },
  {
    id: "lidar",
    name: "Lidarr",
    logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png",
    url: "",
    category: "media",
  },
]

export function ProximityGrid() {
  return (
    <div className="w-full px-3 py-6 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Service Network</h2>
        <p className="text-sm sm:text-base text-muted-foreground">All your server services in one place</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 xl:gap-6">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-center">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-muted-foreground">Hub (Center)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-muted-foreground">Administration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-muted-foreground">Media Services</span>
          </div>
        </div>
      </div>
    </div>
  )
}

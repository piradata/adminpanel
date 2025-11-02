import type { Service } from "@/components/service-card"

export interface ServiceSection {
  id: string
  title: string
  services: Service[]
}

export interface ServiceCluster {
  id: string
  title: string
  description?: string
  parent: Service
  sections: ServiceSection[]
}

export interface CategoryDefinition {
  standalone: Service[]
  clusters?: ServiceCluster[]
  title: string
  color: string
  description?: string
}

// Centralized service definitions grouped by category
export const servicesByCategory: Record<string, CategoryDefinition> = Object.freeze({
  hub: {
    title: "Hub",
    color: "from-blue-500/20 to-blue-700/10",
    description: "Central personal entry point",
    standalone: [
      { id: "website", name: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "", category: "hub" },
    ],
  },
  admin: {
    title: "Administration",
    color: "from-orange-500/20 to-orange-700/10",
    description: "Platform & infrastructure management",
    standalone: [
      { id: "authentik", name: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "", category: "admin" },
      { id: "arcane", name: "Arcane", logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png", url: "", category: "admin" },
      { id: "webmin", name: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "", category: "admin" },
      { id: "netbird", name: "Netbird", logo: "https://netbird.io/apple-icon.png", url: "", category: "admin" },
      { id: "kasm", name: "Kasm", logo: "https://kasm.com/apple-touch-icon.png", url: "", category: "admin" },
      { id: "adguard", name: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "", category: "admin" },
      { id: "cloudflared", name: "Cloudflared", logo: "https://www.cloudflare.com/favicon.ico", url: "", category: "admin" },
      { id: "npm", name: "Nginx Proxy Manager", logo: "https://nginxproxymanager.com/logo.svg", url: "", category: "admin" },
    ],
  },
  media: {
    title: "Media Services",
    color: "from-purple-500/20 to-purple-700/10",
    description: "Media indexing, streaming & discovery",
    standalone: [
      { id: "immich", name: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "", category: "media" },
      { id: "nextcloud", name: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "", category: "media" },
    ],
    clusters: [
      {
        id: "jellyfin-ecosystem",
        title: "Jellyfin Ecosystem",
        description: "Self-hosted media server with companion automation (ARR stack) and request tools.",
        parent: { id: "jellyfin", name: "Jellyfin", logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png", url: "", category: "media" },
        sections: [
          {
            id: "arr-stack",
            title: "ARR Stack",
            services: [
              { id: "jellyseerr", name: "Jellyseerr", logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png", url: "", category: "media" },
              { id: "wizarr", name: "Wizarr", logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png", url: "", category: "media" },
              { id: "prowlarr", name: "Prowlarr", logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png", url: "", category: "media" },
              { id: "sonarr", name: "Sonarr", logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png", url: "", category: "media" },
              { id: "radarr", name: "Radarr", logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png", url: "", category: "media" },
              { id: "lidarr", name: "Lidarr", logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png", url: "", category: "media" },
              { id: "qbittorrent", name: "qBittorrent", logo: "https://www.qbittorrent.org/favicon.svg", url: "", category: "media" },
            ],
          },
        ],
      },
    ],
  },
})

export function flattenCategory(category: CategoryDefinition): Service[] {
  const base = category.standalone
  const nested = category.clusters?.flatMap((cluster) => {
    const children = cluster.sections.flatMap((section) => section.services)
    return [cluster.parent, ...children]
  }) ?? []
  return [...base, ...nested]
}

export const allServices = Object.freeze(
  Object.values(servicesByCategory).flatMap(flattenCategory)
) as ReadonlyArray<Service>

// Precomputed immutable counts to avoid hydration mismatches.
export const categoryCounts: Record<string, number> = Object.freeze(
  Object.fromEntries(
    Object.entries(servicesByCategory).map(([key, def]) => [key, flattenCategory(def).length])
  )
)

import type { Service } from "@/components/service-card"

// ServiceNode can represent either a leaf service or a cluster.
// When a node has a `services` map, its children are keyed by id.
export interface ServiceNode extends Service {
  title?: string
  description?: string
  services?: Record<string, ServiceNode>
}

export interface CategoryDefinition {
  title: string
  color: string
  description?: string
  services: Record<string, ServiceNode>
}

// Centralized service definitions grouped by category
export const servicesByCategory: Record<string, CategoryDefinition> = Object.freeze({
  hub: {
    title: "Hub",
    color: "from-blue-500/20 to-blue-700/10",
    description: "Central personal entry point",
    services: {
      website: { id: "website", name: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "", category: "hub" },
    },
  },
  admin: {
    title: "Administration",
    color: "from-orange-500/20 to-orange-700/10",
    description: "Platform & infrastructure management",
    services: {
      authentik: { id: "authentik", name: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "", category: "admin" },
      arcane: { id: "arcane", name: "Arcane", logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png", url: "", category: "admin" },
      webmin: { id: "webmin", name: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "", category: "admin" },
      netbird: { id: "netbird", name: "Netbird", logo: "https://netbird.io/apple-icon.png", url: "", category: "admin" },
      kasm: { id: "kasm", name: "Kasm", logo: "https://kasm.com/apple-touch-icon.png", url: "", category: "admin" },
      adguard: { id: "adguard", name: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "", category: "admin" },
      cloudflared: { id: "cloudflared", name: "Cloudflared", logo: "https://www.cloudflare.com/favicon.ico", url: "", category: "admin" },
      npm: { id: "npm", name: "Nginx Proxy Manager", logo: "https://nginxproxymanager.com/logo.svg", url: "", category: "admin" },
    },
  },
  media: {
    title: "Media Services",
    color: "from-purple-500/20 to-purple-700/10",
    description: "Media indexing, streaming & discovery",
    services: {
      immich: { id: "immich", name: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "", category: "media" },
      nextcloud: { id: "nextcloud", name: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "", category: "media" },
      jellyfin_ecosystem: {
        id: "jellyfin-ecosystem",
        name: "Jellyfin Ecosystem",
        title: "Jellyfin Ecosystem",
        description: "Self-hosted media server with companion automation (ARR stack) and request tools.",
        logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png",
        url: "",
        category: "media",
        services: {
          jellyfin: { id: "jellyfin", name: "Jellyfin", logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png", url: "", category: "media" },
          jellyseerr: { id: "jellyseerr", name: "Jellyseerr", logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png", url: "", category: "media" },
          wizarr: { id: "wizarr", name: "Wizarr", logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png", url: "", category: "media" },
          prowlarr: { id: "prowlarr", name: "Prowlarr", logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png", url: "", category: "media" },
          sonarr: { id: "sonarr", name: "Sonarr", logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png", url: "", category: "media" },
          radarr: { id: "radarr", name: "Radarr", logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png", url: "", category: "media" },
          lidarr: { id: "lidarr", name: "Lidarr", logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png", url: "", category: "media" },
          qbittorrent: { id: "qbittorrent", name: "qBittorrent", logo: "https://www.qbittorrent.org/favicon.svg", url: "", category: "media" },
        },
      },
    },
  },
})

function flattenMap(map: Record<string, ServiceNode>): ServiceNode[] {
  return Object.values(map).flatMap(node => node.services ? [node, ...flattenMap(node.services)] : [node])
}

export function flattenCategory(category: CategoryDefinition): ServiceNode[] {
  return flattenMap(category.services)
}

// Precomputed immutable counts to avoid hydration mismatches.
export const categoryCounts: Record<string, number> = Object.freeze(
  Object.fromEntries(
    Object.entries(servicesByCategory).map(([key, def]) => [key, flattenCategory(def).length])
  )
)

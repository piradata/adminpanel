import type { Service } from "@/src/components/service-card"

// ServiceNode can represent either a leaf service or a cluster.
// When a node has a `services` map, its children are keyed by id.
export interface ServiceNode extends Omit<Service, 'name'> {
  title: string
  displaySelf?: boolean // If true and this node is a cluster (has children), also render its own card alongside children
  clusterTitle?: string // Optional cluster title to differentiate cluster header from service card title
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
      website: { title: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "" },
    },
  },
  admin: {
    title: "Administration",
    color: "from-orange-500/20 to-orange-700/10",
    description: "Platform & infrastructure management",
    services: {
      authentik: { title: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "" },
      arcane: { title: "Arcane", logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png", url: "" },
      webmin: { title: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "" },
      netbird: { title: "Netbird", logo: "https://netbird.io/apple-icon.png", url: "" },
      kasm: { title: "Kasm", logo: "https://kasm.com/apple-touch-icon.png", url: "" },
      adguard: { title: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "" },
      cloudflared: { title: "Cloudflared", logo: "https://www.cloudflare.com/favicon.ico", url: "" },
      npm: { title: "Nginx Proxy Manager", logo: "https://nginxproxymanager.com/logo.svg", url: "" },
    },
  },
  media: {
    title: "Media Services",
    color: "from-purple-500/20 to-purple-700/10",
    description: "Media indexing, streaming & discovery",
    services: {
      immich: { title: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "" },
      nextcloud: { title: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "" },
      jellyfin: {
        title: "Jellyfin",
        clusterTitle: "ARR Stacks",
        description: "Self-hosted media server with companion automation (ARR stack) and request tools.",
        logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png",
        url: "",
        displaySelf: true,
        services: {
          jellyseerr: { title: "Jellyseerr", logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png", url: "" },
          wizarr: { title: "Wizarr", logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png", url: "" },
          prowlarr: { title: "Prowlarr", logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png", url: "" },
          sonarr: { title: "Sonarr", logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png", url: "" },
          radarr: { title: "Radarr", logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png", url: "" },
          lidarr: { title: "Lidarr", logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png", url: "" },
          qbittorrent: { title: "qBittorrent", logo: "https://www.qbittorrent.org/favicon.svg", url: "" },
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

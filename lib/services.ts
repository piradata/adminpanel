import type { Service } from "@/components/service-card"

// A ServiceNode can be either a leaf service card (no nested services)
// or a cluster/group which also contains its own services array.
// If a node has a `services` array, it is treated as a cluster and
// rendered with its own heading (using its `title`, `description`).
export interface ServiceNode extends Service {
  title?: string          // Optional name for clusters (can reuse `name` when absent)
  description?: string    // Description displayed for clusters
  services?: ServiceNode[] // Nested services (cluster children)
  // Optional layout tag if future styling/grouping needed
}

export interface CategoryDefinition {
  title: string
  color: string
  description?: string
  services: ServiceNode[] // Unified list of top-level nodes (leaf services or clusters)
}

// Centralized service definitions grouped by category
export const servicesByCategory: Record<string, CategoryDefinition> = Object.freeze({
  hub: {
    title: "Hub",
    color: "from-blue-500/20 to-blue-700/10",
    description: "Central personal entry point",
    services: [
      { id: "website", name: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "", category: "hub" },
    ],
  },
  admin: {
    title: "Administration",
    color: "from-orange-500/20 to-orange-700/10",
    description: "Platform & infrastructure management",
    services: [
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
    services: [
      { id: "immich", name: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "", category: "media" },
      { id: "nextcloud", name: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "", category: "media" },
      {
        id: "jellyfin-ecosystem",
        name: "Jellyfin Ecosystem",
        title: "Jellyfin Ecosystem",
        description: "Self-hosted media server with companion automation (ARR stack) and request tools.",
        logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png",
        url: "",
        category: "media",
        services: [
          { id: "jellyfin", name: "Jellyfin", logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png", url: "", category: "media" },
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
})

function flattenNodes(nodes: ServiceNode[]): ServiceNode[] {
  return nodes.flatMap((node) => node.services ? [node, ...flattenNodes(node.services)] : [node])
}

export function flattenCategory(category: CategoryDefinition): ServiceNode[] {
  return flattenNodes(category.services)
}

export const allServices = Object.freeze(
  Object.values(servicesByCategory).flatMap(flattenCategory)
) as ReadonlyArray<ServiceNode>

// Precomputed immutable counts to avoid hydration mismatches.
export const categoryCounts: Record<string, number> = Object.freeze(
  Object.fromEntries(
    Object.entries(servicesByCategory).map(([key, def]) => [key, flattenCategory(def).length])
  )
)

export interface Service {
  title: string
  logo: string
  url: string
  description?: string
  services?: Record<string, Service> // allow nested for clusters (for typing convenience here)
}

// ServiceNode can represent either a leaf service or a cluster.
// When a node has a `services` map, its children are keyed by id.
export interface ServiceNode extends Omit<Service, 'name'> {
  title: string
  displaySelf?: boolean // If false, this cluster node won't render its own card (defaults to true)
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
export const servicesByCategory: Record<string, CategoryDefinition> = {
  hub: {
    title: "Hub",
    color: "from-blue-500/20 to-blue-700/10",
    description: "Central personal entry point",
    services: {
      website: { title: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "https://www.piradata.dev" },
      github: { title: "GitHub", logo: "/github-logo.svg", url: "https://github.com/piradata" },
      docker: { title: "Docker Hub", logo: "/dockerhub-logo.png", url: "https://hub.docker.com/repositories/piradata" }
    },
  },
  admin: {
    title: "Administration",
    color: "from-orange-500/20 to-orange-700/10",
    description: "Platform & infrastructure management",
    services: {
      authentik: { title: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "https://authentik.local.piradata.dev" },
      arcane: { title: "Arcane", logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png", url: "https://arcane.local.piradata.dev" },
      webmin: { title: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "https://webmin.local.piradata.dev" },
      netbird: { title: "Netbird", logo: "https://netbird.io/apple-icon.png", url: "https://netbird.local.piradata.dev" },
      kasm: { title: "Kasm", logo: "https://kasm.com/apple-touch-icon.png", url: "https://kasm.local.piradata.dev" },
      adguard: { title: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "https://adguard.local.piradata.dev" },
      cloudflared: { title: "Cloudflared", logo: "https://www.cloudflare.com/favicon.ico", url: "https://dash.cloudflare.com/7c00deacf90c494c49bedd35feaafce8/piradata.dev/dns/records" },
      npm: { title: "Nginx Proxy Manager", logo: "https://nginxproxymanager.com/logo.svg", url: "https://nginx.local.piradata.dev" },
      router: { title: "Router", logo: "https://cdn-icons-png.flaticon.com/512/1183/1183606.png", url: "https://router.local.piradata.dev" },
    },
  },
  media: {
    title: "Media Services",
    color: "from-purple-500/20 to-purple-700/10",
    description: "Media indexing, streaming & discovery",
    services: {
      immich: { title: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "https://immich.local.piradata.dev" },
      nextcloud: { title: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "https://nextcloud.local.piradata.dev" },
      hfs: { title: "Http File Server", logo: "https://raw.githubusercontent.com/rejetto/hfs/refs/heads/main/hfs.ico", url: "https://hfs.local.piradata.dev" },
      jellyfin: {
        title: "Jellyfin",
        clusterTitle: "ARR Stacks",
        description: "Self-hosted media server with companion automation (ARR stack) and request tools.",
        logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png",
        url: "https://jelly.cloud.piradata.dev",
        displaySelf: true,
        services: {
          jellyseerr: { title: "Jellyseerr", logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png", url: "https://jellyseerr.cloud.piradata.dev" },
          wizarr: { title: "Wizarr", logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png", url: "https://wizarr.cloud.piradata.dev" },
          prowlarr: { title: "Prowlarr", logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png", url: "https://prowlarr.local.piradata.dev" },
          sonarr: { title: "Sonarr", logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png", url: "https://sonarr.local.piradata.dev" },
          radarr: { title: "Radarr", logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png", url: "https://radarr.local.piradata.dev" },
          lidarr: { title: "Lidarr", logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png", url: "https://lidarr.local.piradata.dev" },
          qbittorrent: { title: "qBittorrent", logo: "https://www.qbittorrent.org/favicon.svg", url: "https://qbittorrent.local.piradata.dev" },
        },
      },
    },
  },
}

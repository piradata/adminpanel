import type { Service } from "@/components/service-card"

// Centralized service definitions grouped by category
export const servicesByCategory: Record<string, Service[]> = {
  hub: [
    { id: "website", name: "Personal Website", logo: "https://avatars.githubusercontent.com/u/16529503", url: "", category: "hub" },
  ],
  admin: [
    { id: "authentik", name: "Authentik", logo: "https://goauthentik.io/img/icon.png", url: "", category: "admin" },
    { id: "arcane", name: "Arcane", logo: "https://raw.githubusercontent.com/ofkm/arcane/refs/heads/main/frontend/static/img/pwa/icon-512x512.png", url: "", category: "admin" },
    { id: "webmin", name: "Webmin", logo: "https://webmin.com/apple-touch-icon.png", url: "", category: "admin" },
    { id: "netbird", name: "Netbird", logo: "https://netbird.io/apple-icon.png", url: "", category: "admin" },
    { id: "kasm", name: "Kasm", logo: "https://kasm.com/apple-touch-icon.png", url: "", category: "admin" },
    { id: "adguard", name: "AdGuard", logo: "https://st.adguardcdn.com/favicons/adguard/apple-touch-icon.png", url: "", category: "admin" },
    { id: "cloudflared", name: "Cloudflared", logo: "https://www.cloudflare.com/favicon.ico", url: "", category: "admin" },
    { id: "npm", name: "Nginx Proxy Manager", logo: "https://nginxproxymanager.com/logo.svg", url: "", category: "admin" },
  ],
  media: [
    { id: "immich", name: "Immich", logo: "https://raw.githubusercontent.com/immich-app/immich/refs/heads/main/design/immich-logo.png", url: "", category: "media" },
    { id: "nextcloud", name: "Nextcloud", logo: "https://avatars.githubusercontent.com/u/19211038?s=200&v=4", url: "", category: "media" },
    { id: "jellyseer", name: "Jellyseerr", logo: "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/develop/public/android-chrome-512x512.png", url: "", category: "media" },
    { id: "wizzar", name: "Wizarr", logo: "https://raw.githubusercontent.com/wizarrrr/wizarr/refs/heads/main/app/static/wizarr-logo.png", url: "", category: "media" },
    { id: "prowlar", name: "Prowlarr", logo: "https://raw.githubusercontent.com/Prowlarr/Prowlarr/develop/Logo/256.png", url: "", category: "media" },
    { id: "jellyfin", name: "Jellyfin", logo: "https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/web/favicons/favicon.png", url: "", category: "media" },
    { id: "sonar", name: "Sonarr", logo: "https://raw.githubusercontent.com/Sonarr/Sonarr/develop/Logo/256.png", url: "radar", category: "media" },
    { id: "radar", name: "Radarr", logo: "https://raw.githubusercontent.com/Radarr/Radarr/develop/Logo/256.png", url: "", category: "media" },
    { id: "lidar", name: "Lidarr", logo: "https://raw.githubusercontent.com/Lidarr/Lidarr/develop/Logo/256.png", url: "", category: "media" },
  ],
}

export const allServices: Service[] = Object.values(servicesByCategory).flat()

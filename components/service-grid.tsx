import { ServiceCard } from "./service-card"

const SERVICES = [
  // Infrastructure & Networking
  {
    category: "Infrastructure & Networking",
    items: [
      { name: "AdGuard", description: "Ad blocker and DNS filter", url: "http://adguard.local" },
      { name: "Cloudflared", description: "Secure tunnel to Cloudflare", url: "http://cloudflared.local" },
      { name: "Netbird", description: "Mesh VPN network", url: "http://netbird.local" },
      { name: "Nginx Proxy Manager", description: "Reverse proxy & SSL management", url: "http://nginx-proxy.local" },
    ],
  },
  // Media & Storage
  {
    category: "Media & Storage",
    items: [
      { name: "Immich", description: "Photo and video backup", url: "http://immich.local" },
      { name: "Nextcloud", description: "File sync and collaboration", url: "http://nextcloud.local" },
      { name: "Jellyfin", description: "Media server", url: "http://jellyfin.local" },
    ],
  },
  // Arr Stack (Media Management)
  {
    category: "Media Management (Arr Stack)",
    items: [
      { name: "Prowlarr", description: "Indexer manager", url: "http://prowlarr.local" },
      { name: "Sonarr", description: "TV show automation", url: "http://sonarr.local" },
      { name: "Radarr", description: "Movie automation", url: "http://radarr.local" },
      { name: "Lidarr", description: "Music automation", url: "http://lidarr.local" },
    ],
  },
  // Media Discovery
  {
    category: "Media Discovery",
    items: [
      { name: "Jellyseerr", description: "Media request management", url: "http://jellyseerr.local" },
      { name: "Arcane", description: "Game launcher", url: "http://arcane.local" },
    ],
  },
  // Administration & Security
  {
    category: "Administration & Security",
    items: [
      { name: "Webmin", description: "System administration interface", url: "http://webmin.local" },
      { name: "Authentik", description: "Identity provider & auth", url: "http://authentik.local" },
      { name: "Kasm", description: "Containerized applications", url: "http://kasm.local" },
    ],
  },
  // Other
  {
    category: "Other",
    items: [
      { name: "Wizzard", description: "Service configuration", url: "http://wizzard.local" },
      { name: "Personal Website", description: "Portfolio and blog", url: "http://personal.local" },
    ],
  },
]

export function ServiceGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-12">
        {SERVICES.map((section) => (
          <section key={section.category}>
            <h2 className="text-lg font-semibold text-accent mb-4 uppercase tracking-wider text-balance">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map((service) => (
                <ServiceCard key={service.name} {...service} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

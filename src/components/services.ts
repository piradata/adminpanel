export interface Service {
  title: string;
  logo?: string;
  url: string;
  description?: string;
  services?: Record<string, Service>; // allow nested for clusters (for typing convenience here)
}

// ServiceNode can represent either a leaf service or a cluster.
// When a node has a `services` map, its children are keyed by id.
export interface ServiceNode extends Omit<Service, 'name'> {
  title: string;
  displaySelf?: boolean; // If false, this cluster node won't render its own card (defaults to true)
  clusterTitle?: string; // Optional cluster title to differentiate cluster header from service card title
  description?: string;
  services?: Record<string, ServiceNode>;
}

export interface CategoryDefinition {
  title: string;
  color: string;
  description?: string;
  services: Record<string, ServiceNode>;
}

// Centralized service definitions grouped by category
export const servicesByCategory: Record<string, CategoryDefinition> = {
  hub: {
    title: 'Hub',
    color: 'from-blue-500/20 to-blue-700/10',
    description: 'Central personal entry point',
    services: {
      website: {
        title: 'Personal Website',
        logo: '/favicon.ico',
        url: 'https://www.piradata.dev',
      },
      github: {
        title: 'GitHub',
        logo: '/github-logo.svg',
        url: 'https://github.com/piradata',
      },
      docker: {
        title: 'Docker Hub',
        logo: '/dockerhub-logo.jxl',
        url: 'https://hub.docker.com/repositories/piradata',
      },
      ngrok: {
        title: 'Ngrok Page',
        logo: '/ngrok-logo.jxl',
        url: 'https://ngrok.piradata.dev',
      },
    },
  },
  admin: {
    title: 'Administration',
    color: 'from-orange-500/20 to-orange-700/10',
    description: 'Platform & infrastructure management',
    services: {
      authentik: {
        title: 'Authentik',
        logo: '/authentik-logo.jxl',
        url: 'https://authentik.local.piradata.dev',
      },
      arcane: {
        title: 'Arcane',
        logo: '/arcane-logo.svg',
        url: 'https://arcane.local.piradata.dev',
      },
      webmin: {
        title: 'Webmin',
        logo: '/webmin-logo.jxl',
        url: 'https://webmin.local.piradata.dev',
      },
      netbird: {
        title: 'Netbird',
        logo: '/netbird-logo.jxl',
        url: 'https://app.netbird.io/dns/zones',
      },
      adguard: {
        title: 'AdGuard',
        logo: '/adguard-logo.jxl',
        url: 'https://adguard.local.piradata.dev',
      },
      cloudflared: {
        title: 'Cloudflared',
        logo: '/cloudflare-logo.jxl',
        url: 'https://dash.cloudflare.com/7c00deacf90c494c49bedd35feaafce8/piradata.dev/dns/records',
      },
      npm: {
        title: 'Nginx Proxy Manager',
        logo: '/nginx-logo.svg',
        url: 'https://nginx.local.piradata.dev',
      },
      router: {
        title: 'Router',
        logo: '/router-logo.jxl',
        url: 'https://router.local.piradata.dev',
      },
      bitwarden: {
        title: 'Bitwarden',
        logo: '/bitwarden-logo.jxl',
        url: 'https://bitwarden.local.piradata.dev',
      },
    },
  },
  media: {
    title: 'Media Services',
    color: 'from-purple-500/20 to-purple-700/10',
    description: 'Media indexing, streaming & discovery',
    services: {
      immich: {
        title: 'Immich',
        logo: '/immich-logo.jxl',
        url: 'https://immich.local.piradata.dev',
      },
      nextcloud: {
        title: 'Nextcloud',
        logo: '/nextcloud-logo.jxl',
        url: 'https://nextcloud.local.piradata.dev',
      },
      hfs: {
        title: 'Http File Server',
        logo: '/hfs-logo.ico',
        url: 'https://hfs.local.piradata.dev',
      },
      jellyfin: {
        title: 'Jellyfin',
        clusterTitle: 'ARR Stacks',
        description: 'Self-hosted media server with companion automation (ARR stack) and request tools.',
        logo: '/jellyfin-logo.jxl',
        url: 'https://jelly.cloud.piradata.dev',
        displaySelf: true,
        services: {
          jellyseer: {
            title: 'Jellyseer',
            logo: '/jellyseer-logo.jxl',
            url: 'https://jellyseer.cloud.piradata.dev',
          },
          wizarr: {
            title: 'Wizarr',
            logo: '/wizarr-logo.jxl',
            url: 'https://wizarr.cloud.piradata.dev',
          },
          prowlarr: {
            title: 'Prowlarr',
            logo: '/prowlarr-logo.jxl',
            url: 'https://prowlarr.local.piradata.dev',
          },
          sonarr: {
            title: 'Sonarr',
            logo: '/sonarr-logo.jxl',
            url: 'https://sonarr.local.piradata.dev',
          },
          radarr: {
            title: 'Radarr',
            logo: '/radarr-logo.jxl',
            url: 'https://radarr.local.piradata.dev',
          },
          lidarr: {
            title: 'Lidarr',
            logo: '/lidarr-logo.jxl',
            url: 'https://lidarr.local.piradata.dev',
          },
          qbittorrent: {
            title: 'qBittorrent',
            logo: '/qbittorrent-logo.svg',
            url: 'https://qbittorrent.local.piradata.dev',
          },
        },
      },
    },
  },
};

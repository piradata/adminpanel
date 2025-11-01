import type React from "react"

export function ServiceLogo({ serviceId }: { serviceId: string }) {
  const logos: Record<string, React.ReactNode> = {
    nginx: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect width="100" height="100" fill="none" />
        <path d="M20 30L50 50L20 70V30Z" fill="currentColor" opacity="0.8" />
        <path d="M50 50L80 30V70L50 50Z" fill="currentColor" opacity="0.6" />
        <rect x="35" y="45" width="30" height="10" fill="currentColor" opacity="0.9" />
      </svg>
    ),
    adguard: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M50 20C35 20 25 30 25 50C25 70 35 80 50 80C65 80 75 70 75 50C75 30 65 20 50 20Z"
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    cloudflare: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M30 60C25 50 20 40 30 30C40 20 50 25 60 20C70 15 75 30 80 40C85 50 80 65 70 70C60 75 40 70 30 60Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
    netbird: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="30" cy="30" r="8" fill="currentColor" />
        <circle cx="70" cy="30" r="8" fill="currentColor" />
        <circle cx="50" cy="60" r="8" fill="currentColor" />
        <line x1="30" y1="30" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="30" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    immich: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="3" rx="8" />
        <circle cx="40" cy="35" r="6" fill="currentColor" />
        <polyline points="20,70 40,40 60,55 80,30" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
    ),
    nextcloud: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M30 60C20 55 15 45 20 35C25 25 40 20 50 25C55 15 70 15 75 25C85 30 85 45 80 55C70 70 45 75 30 60Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
    jellyfin: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="25" width="20" height="50" fill="currentColor" opacity="0.8" />
        <rect x="45" y="20" width="20" height="55" fill="currentColor" opacity="0.6" />
        <rect x="70" y="30" width="20" height="45" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    prowlarr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.5" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.8" />
        <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    sonarr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,15 85,85 15,85" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="50,35 70,70 30,70" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    radarr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.6" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
      </svg>
    ),
    lidarr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30 20L50 30L70 20L50 80Z" fill="currentColor" opacity="0.7" />
        <path d="M30 80L50 70L70 80L50 20Z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    jellyseerr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.8" />
        <path
          d="M35 55L35 75C35 80 40 85 50 85C60 85 65 80 65 75L65 55"
          fill="currentColor"
          opacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    wizarr: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 15L60 40L85 45L65 65L70 90L50 75L30 90L35 65L15 45L40 40Z" fill="currentColor" opacity="0.7" />
      </svg>
    ),
    arcane: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="20" height="60" fill="currentColor" opacity="0.6" />
        <rect x="45" y="25" width="20" height="55" fill="currentColor" opacity="0.8" />
        <rect x="70" y="20" width="20" height="60" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    webmin: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="35" cy="35" r="12" fill="currentColor" opacity="0.8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="65" cy="35" r="12" fill="currentColor" opacity="0.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="65" r="12" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="35" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="65" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    authentik: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M50 20L70 35L65 60L50 70L35 60L30 35Z"
          fill="currentColor"
          opacity="0.7"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
      </svg>
    ),
    kasm: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="25" y="25" width="15" height="15" fill="currentColor" opacity="0.8" />
        <rect x="60" y="25" width="15" height="15" fill="currentColor" opacity="0.7" />
        <rect x="25" y="60" width="15" height="15" fill="currentColor" opacity="0.6" />
        <rect x="60" y="60" width="15" height="15" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    personal: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.8" />
        <path
          d="M30 65C30 50 40 50 50 50C60 50 70 50 70 65L70 80H30Z"
          fill="currentColor"
          opacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  }

  return logos[serviceId] || null
}

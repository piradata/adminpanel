import { PWAInstall } from '@/src/components/pwa-install';

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-0 px-3 py-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-labelledby="header-logo-title"
              >
                <title id="header-logo-title">Checkmark in circle icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-balance">Server Administration</h1>
              <p className="text-xs text-muted-foreground">Linux Server Services</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

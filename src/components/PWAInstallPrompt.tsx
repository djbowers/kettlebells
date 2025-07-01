import { useEffect, useState } from 'react';
import { XMarkIcon, PlusIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if app is already installed (running in standalone mode)
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(isStandaloneMode);

    // Check if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Check if user has already dismissed the prompt
    const hasBeenDismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = hasBeenDismissed ? parseInt(hasBeenDismissed) : 0;
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

    // Show prompt if: mobile device, not standalone, not recently dismissed
    if (isMobileDevice && !isStandaloneMode && (!hasBeenDismissed || daysSinceDismissed > 7)) {
      setShowPrompt(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS Safari and other browsers
      showInstallInstructions();
    }
  };

  const showInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instructions = '';
    
    if (isIOS) {
      instructions = 'Tap the Share button and then "Add to Home Screen"';
    } else if (isAndroid) {
      instructions = 'Tap the menu (⋮) and select "Add to Home screen"';
    } else {
      instructions = 'Look for "Add to Home Screen" or "Install App" in your browser menu';
    }
    
    alert(`To install this app:\n\n${instructions}`);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if not mobile, already installed, or user dismissed
  if (!showPrompt || !isMobile || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <DevicePhoneMobileIcon className="h-8 w-8 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            Install BellSkill App
          </p>
          <p className="text-xs text-gray-500">
            Add to your home screen for a better experience
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Install app"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Dismiss"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
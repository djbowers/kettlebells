import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { PWAInstallPrompt } from './PWAInstallPrompt';

// Mock the beforeinstallprompt event
const mockBeforeInstallPrompt = () => {
  const event = new Event('beforeinstallprompt') as any;
  event.platforms = ['web'];
  event.userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' });
  event.prompt = () => Promise.resolve();
  return event;
};

// Mock localStorage
const mockLocalStorage = {
  getItem: (key: string) => null,
  setItem: (key: string, value: string) => {},
};

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  });
};

// Mock navigator.userAgent
const mockUserAgent = (userAgent: string) => {
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });
};

// Mock navigator.standalone
const mockStandalone = (standalone: boolean) => {
  Object.defineProperty(navigator, 'standalone', {
    value: standalone,
    configurable: true,
  });
};

// Mock document.referrer
const mockReferrer = (referrer: string) => {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
    configurable: true,
  });
};

const meta = {
  component: PWAInstallPrompt,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => {
      useEffect(() => {
        // Reset mocks before each story
        mockMatchMedia(false);
        mockUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
        );
        mockStandalone(false);
        mockReferrer('https://example.com');

        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
          value: mockLocalStorage,
          writable: true,
        });
      }, []);

      return <Story />;
    },
  ],
} satisfies Meta<typeof PWAInstallPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story: any) => {
      useEffect(() => {
        // Trigger the beforeinstallprompt event after component mounts
        setTimeout(() => {
          const event = mockBeforeInstallPrompt();
          window.dispatchEvent(event);
        }, 100);
      }, []);

      return <Story />;
    },
  ],
};

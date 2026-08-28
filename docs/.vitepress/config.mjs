import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Quest 3D WebView",
  description: "High-Performance 1080p60 WebKit Rendering Pipeline for Meta Quest VR in Unreal Engine 5.5",
  lang: 'en-US',
  base: '/quest3dwebview-docs/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap' }],
    ['meta', { name: 'theme-color', content: '#38bdf8' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Quest 3D WebView — Unreal Engine Plugin Documentation' }],
    ['meta', { property: 'og:description', content: 'Hardware-accelerated 70+ FPS web video, multi-screen workspaces, and W3C VR laser interaction for Meta Quest in Unreal Engine.' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Quest 3D WebView',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Getting Started', link: '/getting-started/quick-start' },
      { text: 'Features', link: '/features/overview' },
      { text: 'Walkthroughs', link: '/walkthroughs/basic-web-screen' },
      { text: 'API Reference', link: '/api-reference/blueprint-functions' },
      { text: 'Architecture', link: '/architecture/how-it-works' },
      { text: 'Platform', link: '/platform/supported-devices' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation & Setup', link: '/getting-started/installation' },
            { text: '5-Minute Quick Start', link: '/getting-started/quick-start' },
            { text: 'System Requirements', link: '/getting-started/requirements' }
          ]
        }
      ],

      '/features/': [
        {
          text: 'Feature Deep Dives',
          items: [
            { text: 'Features Overview', link: '/features/overview' },
            { text: 'Hardware Video & Rendering', link: '/features/rendering' },
            { text: 'Multi-Instance Isolation', link: '/features/multi-instance' },
            { text: 'VR Laser & W3C Hover Interaction', link: '/features/vr-interaction' },
            { text: 'Browser Navigation & SPA', link: '/features/navigation' },
            { text: 'Virtual Keyboard & Input Focus', link: '/features/keyboard-input' },
            { text: 'HTML5 Media & Playback Controls', link: '/features/media-controls' },
            { text: 'Bidirectional JavaScript Bridge', link: '/features/javascript-bridge' },
            { text: 'Audio Pipeline & Mute Control', link: '/features/audio' },
            { text: 'Session, Cookies & Cache', link: '/features/session-management' },
            { text: 'Performance, TargetFPS & Pausing', link: '/features/performance' },
            { text: 'Video Detection & Extraction', link: '/features/video-detection' }
          ]
        }
      ],

      '/walkthroughs/': [
        {
          text: 'Practical Walkthroughs',
          items: [
            { text: '1. Basic 3D Web Screen', link: '/walkthroughs/basic-web-screen' },
            { text: '2. VR Laser Pointer Clicks & Hover', link: '/walkthroughs/vr-laser-interaction' },
            { text: '3. Multi-Monitor Workspaces', link: '/walkthroughs/multi-monitor-workspace' },
            { text: '4. 3D Virtual Keyboard Integration', link: '/walkthroughs/virtual-keyboard' },
            { text: '5. 1080p60 YouTube Cinema', link: '/walkthroughs/youtube-cinema' },
            { text: '6. Dynamic Runtime URL Loading', link: '/walkthroughs/dynamic-url-loading' },
            { text: '7. Controller UMG Navigation Bar', link: '/walkthroughs/navigation-toolbar' },
            { text: '8. Two-Way Unreal ↔ Web JS Communication', link: '/walkthroughs/javascript-communication' }
          ]
        }
      ],

      '/api-reference/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Component Properties (UPROPERTY)', link: '/api-reference/component-properties' },
            { text: 'Blueprint Functions (40+ Nodes)', link: '/api-reference/blueprint-functions' },
            { text: 'Events & Delegates', link: '/api-reference/events-delegates' },
            { text: 'Enums & Types', link: '/api-reference/enums' },
            { text: 'JNI & C++ Architecture', link: '/api-reference/jni-internals' }
          ]
        }
      ],

      '/architecture/': [
        {
          text: 'Engine & Pipeline Architecture',
          items: [
            { text: 'How It Works (Pipeline)', link: '/architecture/how-it-works' },
            { text: 'Threading & Concurrency Model', link: '/architecture/threading-model' },
            { text: 'Memory Model & Dirty-Frame Gating', link: '/architecture/memory-model' }
          ]
        }
      ],

      '/platform/': [
        {
          text: 'Platform & Limitations',
          items: [
            { text: 'Supported Quest Devices', link: '/platform/supported-devices' },
            { text: 'Engine Compatibility (UE 5.4/5.5)', link: '/platform/engine-versions' },
            { text: 'Assumptions & Known Limitations', link: '/platform/known-limitations' },
            { text: 'Common Issues & Troubleshooting', link: '/troubleshooting/common-issues' },
            { text: 'Frequently Asked Questions (FAQ)', link: '/troubleshooting/faq' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ateequesolangi/quest3dwebview-docs' }
    ],

    footer: {
      message: 'Released for Unreal Engine 5.5 on Meta Quest.',
      copyright: 'Copyright © 2026 Ateeque ur Rehman. All rights reserved.'
    },

    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page'
    }
  }
})

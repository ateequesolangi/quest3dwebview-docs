---
layout: home

hero:
  name: "Quest 3D WebView"
  text: "High-Performance 1080p60 WebKit for Meta Quest"
  tagline: "Render live web video, multi-screen workspaces, and interactive HTML5 apps on any 3D mesh in Unreal Engine 5.5."
  image:
    src: /logo.svg
    alt: Quest 3D WebView Logo
  actions:
    - theme: brand
      text: Quick Start Guide
      link: /getting-started/quick-start
    - theme: alt
      text: Explore Features
      link: /features/overview
    - theme: alt
      text: API Reference
      link: /api-reference/blueprint-functions

features:
  - icon: ⚡
    title: True 1080p60 Hardware Video
    details: Offloaded 100% to Qualcomm Snapdragon VPU hardware decoding. Zero black screens on YouTube, Twitch, or HTML5 video.
  - icon: 🪶
    title: 24 KB Zero-Bloat Footprint
    details: Leverages Meta Quest OS System WebView directly. Zero 200MB CEF/GeckoView bloat added to your packaged APK.
  - icon: 🎯
    title: Full W3C VR Laser Interaction
    details: Raycast UV clicks, W3C pointer hover effects, kinetic touch dragging, and analog thumbstick scrolling out-of-the-box.
  - icon: 🖥️
    title: Multi-Instance Workspaces
    details: Run isolated simultaneous screens (ChatGPT + YouTube + Trello) with zero crosstalk and individual TargetFPS limits.
  - icon: ⌨️
    title: Virtual Keyboard Bridge
    details: Automatic DOM focus detection fires events when users select web inputs, integrating seamlessly with 3D VR keyboards.
  - icon: 🔒
    title: 100% Meta Store Compliant
    details: Requires ZERO dangerous Android runtime permissions. Safe, clean, and immediately ready for Horizon Store submission.
---

<HeroCampaignSlider />

## Why Quest 3D WebView?

In Unreal Engine on Meta Quest (mobile Vulkan RHI), the built-in UMG WebBrowser produces black rectangles on hardware video, suffers from severe TAA text blur, and requires complex boilerplate to project onto 3D world meshes.

**Quest 3D WebView** replaces this with a production-grade C++ & Java `VirtualDisplay` hardware pipeline:

```
Android Activity ──► VirtualDisplay ──► ImageReader ──► NDK lockPixels ──► RHIUpdateTexture2D ──► 3D Material
```

* **No WebGL / Video Black Screens:** Videos stream directly through Android's hardware `MediaCodec` DSP pipeline.
* **40+ Blueprint Nodes:** Complete control over navigation, media playback, audio muting, cookies, and two-way JavaScript messaging.
* **Dirty-Frame Gating:** Consumes **0.00 ms GPU/CPU time** when web pages are idle.

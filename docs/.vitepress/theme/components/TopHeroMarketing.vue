<template>
  <div class="top-hero-wrapper">
    <!-- Ambient Holographic Glows -->
    <div class="glow-orb orb-left"></div>
    <div class="glow-orb orb-right"></div>

    <div class="top-hero-container">
      
      <!-- Top Header Centerpiece -->
      <div class="hero-center-intro">
        <div class="hero-top-badge">
          <span class="pulse-indicator"></span>
          <span class="badge-txt">UNREAL ENGINE 5.5 • META QUEST NATIVE</span>
        </div>

        <h1 class="hero-master-title">
          The #1 Web Browser Engine for Meta Quest in UE5<br />
          <span class="gradient-text">True 70+ FPS Hardware Video • Any 3D Mesh • 24 KB Footprint</span>
        </h1>

        <p class="hero-master-subtitle">
          The only Unreal Engine plugin engineered for Meta Quest that renders live 1080p web video (YouTube, Twitch, WebGL) onto any 3D surface with <strong>zero black screens</strong>, <strong>zero APK bloat</strong>, and <strong>full W3C VR laser interaction</strong>.
        </p>

        <!-- CTA Action Row -->
        <div class="hero-actions-center">
          <a href="/quest3dwebview-docs/getting-started/quick-start" class="hero-cta-primary">
            <span>🚀 5-Minute Quick Start</span>
            <span class="btn-arrow">→</span>
          </a>
          <a href="/quest3dwebview-docs/features/overview" class="hero-cta-secondary">
            <span>Explore All Capabilities</span>
          </a>
          <a href="/quest3dwebview-docs/api-reference/blueprint-functions" class="hero-cta-secondary">
            <span>📚 Blueprint API Reference</span>
          </a>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- DEDICATED 3-CHANNEL CINEMATIC DEMO VIDEO THEATER                           -->
      <!-- ========================================================================= -->
      <div class="cinema-theater-wrapper">
        <div class="theater-card glass-panel">
          
          <!-- Theater Header / Channel Selector Tabs -->
          <div class="theater-topbar">
            <div class="theater-title-group">
              <span class="live-dot"></span>
              <span class="theater-heading">OFFICIAL DEMO SHOWCASE</span>
            </div>

            <div class="video-channel-tabs">
              <button
                v-for="(vid, idx) in demoVideos"
                :key="vid.id"
                class="channel-btn"
                :class="{ active: currentVideoIndex === idx }"
                @click="currentVideoIndex = idx"
              >
                <span class="ch-icon">{{ vid.icon }}</span>
                <span class="ch-title">{{ vid.title }}</span>
                <span class="ch-badge">{{ vid.badge }}</span>
              </button>
            </div>
          </div>

          <!-- Video Player Screen Stage -->
          <div class="theater-screen-stage">
            
            <!-- Video Overlay Watermark & Badges -->
            <div class="stage-overlay-top">
              <div class="v-tag-left">
                <span class="res-tag">{{ activeVideo.resolution }}</span>
                <span class="fps-tag">{{ activeVideo.fps }}</span>
              </div>
              <div class="v-tag-right">
                <span class="audio-tag">🔊 {{ activeVideo.audioMode }}</span>
              </div>
            </div>

            <!-- Video Player Screen Area -->
            <div class="screen-canvas-box" :class="activeVideo.themeClass">
              
              <!-- Video Mock Visual Display -->
              <div class="video-canvas-content">
                
                <!-- Channel 1: Hardware Video & Audio -->
                <div v-if="activeVideo.id === 'video-demo'" class="vid-stage-channel">
                  <div class="vid-center-hero">
                    <div class="vid-play-button-glow">
                      <span class="play-triangle">▶</span>
                    </div>
                    <div class="vid-main-title">{{ activeVideo.headline }}</div>
                    <div class="vid-sub-caption">{{ activeVideo.caption }}</div>
                  </div>

                  <!-- Dynamic Audio Waveform -->
                  <div class="cinema-eq-spectrum">
                    <div v-for="n in 24" :key="n" class="spectrum-bar" :style="{ animationDelay: (n * 0.05) + 's' }"></div>
                  </div>
                </div>

                <!-- Channel 2: Multi-Monitor Workspaces -->
                <div v-else-if="activeVideo.id === 'multi-demo'" class="vid-stage-channel multi-channel">
                  <div class="multi-monitor-cockpit-stage">
                    <div class="vr-mon-card left">
                      <span class="mon-app">ChatGPT</span>
                      <small class="mon-stat">30 FPS • Isolated</small>
                    </div>
                    <div class="vr-mon-card center active">
                      <span class="mon-app">YouTube Cinema</span>
                      <small class="mon-stat green">70+ FPS Hardware VPU</small>
                    </div>
                    <div class="vr-mon-card right">
                      <span class="mon-app">Trello / Discord</span>
                      <small class="mon-stat">30 FPS • Isolated</small>
                    </div>
                  </div>
                  <div class="multi-sync-pill">
                    ⚡ Scalable Multi-Screen Workspaces • Zero Crosstalk • Independent TargetFPS
                  </div>
                </div>

                <!-- Channel 3: VR Laser & Touch Interaction -->
                <div v-else-if="activeVideo.id === 'laser-demo'" class="vid-stage-channel laser-channel">
                  <div class="laser-multi-mockup">
                    <div class="laser-raycast-box">
                      <div class="controller-node">🎮 Quest Touch Controller</div>
                      <div class="laser-beam-trace"></div>
                      <div class="mesh-target-hit">
                        <span class="hit-point"></span>
                        <span class="hit-label">Raycast UV Hit: (0.54, 0.72)</span>
                      </div>
                    </div>
                    <div class="laser-action-pills">
                      <span class="l-pill">🎯 W3C Pointer Hover</span>
                      <span class="l-pill">🖱️ ClickUV()</span>
                      <span class="l-pill">⌨️ Auto 3D Keyboard Focus</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Bottom Video Controls Bar -->
              <div class="screen-control-bar">
                <div class="ctrl-left">
                  <button class="ctrl-play-btn">▶</button>
                  <div class="timecode">00:48 / 02:30</div>
                </div>
                <div class="ctrl-progress-bar">
                  <div class="progress-fill" :style="{ width: '42%' }"></div>
                </div>
                <div class="ctrl-right">
                  <span class="hd-pill">1080p 70+ FPS</span>
                  <span class="fullscreen-icon">⛶</span>
                </div>
              </div>

            </div>

            <!-- Video Channel Info Description Footer -->
            <div class="theater-footer-info">
              <div class="footer-desc-col">
                <h3 class="video-info-title">{{ activeVideo.headline }}</h3>
                <p class="video-info-text">{{ activeVideo.description }}</p>
              </div>
              <div class="footer-cta-col">
                <a :href="activeVideo.learnMoreLink" class="video-doc-link">
                  <span>{{ activeVideo.learnMoreText }}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 3 CORE COMMERCIAL PILLARS (Straight from Product Scope)                    -->
      <!-- ========================================================================= -->
      <div class="hero-pillars-grid">
        
        <div class="pillar-card glass-card">
          <div class="pillar-icon-box green">⚡</div>
          <h3 class="pillar-title">True 70+ FPS Hardware Video</h3>
          <p class="pillar-desc">
            Direct Snapdragon VPU hardware decoding via native Android <code class="inline-code">VirtualDisplay</code>. Zero black screens on YouTube, Twitch, and HTML5 video, mapped seamlessly to dynamic 3D materials.
          </p>
          <div class="pillar-tags">
            <span>Snapdragon XR2</span>
            <span>0.4ms Latency</span>
            <span>Zero Black Screens</span>
          </div>
        </div>

        <div class="pillar-card glass-card">
          <div class="pillar-icon-box cyan">🪶</div>
          <h3 class="pillar-title">24 KB Zero-Bloat Footprint</h3>
          <p class="pillar-desc">
            Reuses Meta Quest OS System WebKit directly. Adds only 24 KB to your packaged APK compared to 250 MB bloated CEF binaries, saving thermal headroom, memory bandwidth, and battery life.
          </p>
          <div class="pillar-tags">
            <span>24 KB (0.02 MB)</span>
            <span>0 MB Heavy CEF</span>
            <span>Zero RAM Waste</span>
          </div>
        </div>

        <div class="pillar-card glass-card">
          <div class="pillar-icon-box purple">🔒</div>
          <h3 class="pillar-title">100% Meta Store Compliant</h3>
          <p class="pillar-desc">
            Requires <strong>zero dangerous Android runtime permissions</strong> (zero camera, zero mic, zero external storage). Guaranteed automated ingestion pass for Horizon Store and App Lab submissions.
          </p>
          <div class="pillar-tags">
            <span>0 Permissions</span>
            <span>Horizon Store Pass</span>
            <span>App Lab Verified</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentVideoIndex = ref(0)

const demoVideos = [
  {
    id: 'video-demo',
    title: '70+ FPS Hardware Video',
    badge: 'Snapdragon VPU',
    icon: '🎬',
    resolution: '1080p60 / 4K',
    fps: '70+ FPS Solid',
    audioMode: 'Direct & Spatial Audio',
    headline: '1080p 70+ FPS Hardware-Decoded Web Video in VR',
    caption: 'Direct Qualcomm Snapdragon VPU decoding into Unreal Dynamic Materials with 0 black screens.',
    description: 'Watch live 1080p YouTube videos, Twitch streams, and WebGL applications mapped seamlessly onto curved cinema screens, IMAX walls, and in-game 3D meshes in Unreal Engine 5.5.',
    themeClass: 'theme-video',
    learnMoreText: 'Read Video Walkthrough',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/youtube-cinema'
  },
  {
    id: 'multi-demo',
    title: 'Multi-Monitor Workspaces',
    badge: 'Scalable Screens',
    icon: '🖥️',
    resolution: 'Independent Sessions',
    fps: 'Gated FPS Control',
    audioMode: 'Per-Screen Muting',
    headline: 'Unlimited Multi-Monitor Virtual Offices & Productivity Hubs',
    caption: 'Run concurrent isolated 3D monitors (ChatGPT, Trello, Discord, Docs) with zero crosstalk.',
    description: 'Build virtual desktop environments with arbitrary numbers of concurrent web screens. Each screen has independent session cookies, per-display TargetFPS caps, and one-click audio muting.',
    themeClass: 'theme-multi',
    learnMoreText: 'Read Multi-Monitor Guide',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/multi-monitor-workspace'
  },
  {
    id: 'laser-demo',
    title: 'VR Laser & 3D Keyboard',
    badge: 'W3C Pointer',
    icon: '🎯',
    resolution: 'Sub-Pixel UV Raycast',
    fps: 'Real-Time Touch',
    audioMode: 'Focus Audio Feedback',
    headline: 'Precision VR Laser Raycasts, W3C Hover & Virtual Keyboard',
    caption: 'Native W3C pointer events, continuous touch dragging, and automatic 3D keyboard focus detection.',
    description: 'Line trace from your Quest Touch controllers directly to any 3D mesh. Converts raycast hits into native web clicks, CSS hover states, analog thumbstick scrolling, and auto 3D keyboard focus.',
    themeClass: 'theme-laser',
    learnMoreText: 'Read VR Interaction Guide',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/vr-laser-interaction'
  }
]

const activeVideo = computed(() => demoVideos[currentVideoIndex.value])
</script>

<style scoped>
.top-hero-wrapper {
  position: relative;
  width: 100%;
  padding: 3.5rem 0.5rem 2.5rem 0.5rem;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.orb-left {
  top: -5%;
  left: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%);
}

.orb-right {
  top: 20%;
  right: 8%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, #818cf8 0%, rgba(129, 140, 248, 0) 70%);
}

.top-hero-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

/* Header Centerpiece */
.hero-center-intro {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 3rem auto;
}

.hero-top-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  margin-bottom: 1.25rem;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
  animation: pulse-glow 1.8s infinite;
}

@keyframes pulse-glow {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 14px #38bdf8; }
  100% { transform: scale(0.95); opacity: 0.8; }
}

.hero-master-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.85rem;
  line-height: 1.2;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 1.2rem;
  border-top: none !important;
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 20%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-master-subtitle {
  font-size: 1.15rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.hero-actions-center {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  background: linear-gradient(135deg, #0284c7, #38bdf8);
  color: #04121e !important;
  text-decoration: none !important;
  box-shadow: 0 6px 24px rgba(56, 189, 248, 0.5);
  transition: all 0.25s ease;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(56, 189, 248, 0.7);
}

.hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(56, 189, 248, 0.4);
}

/* ========================================================================= */
/* CINEMA THEATER PLAYER SECTION                                             */
/* ========================================================================= */
.cinema-theater-wrapper {
  margin-bottom: 3.5rem;
}

.theater-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.15);
}

.theater-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.5rem;
  background: #090d16;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 1rem;
}

.theater-title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
  animation: pulse-glow 1.5s infinite;
}

.theater-heading {
  font-size: 0.8rem;
  font-weight: 900;
  color: #94a3b8;
  letter-spacing: 0.08em;
}

.video-channel-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.channel-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.channel-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
}

.channel-btn.active {
  background: rgba(56, 189, 248, 0.18);
  border-color: #38bdf8;
  color: #38bdf8;
}

.ch-badge {
  font-size: 0.68rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

/* Stage & Player Surface */
.theater-screen-stage {
  position: relative;
  background: #060911;
}

.stage-overlay-top {
  position: absolute;
  top: 1rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

.v-tag-left {
  display: flex;
  gap: 0.5rem;
}

.res-tag {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
}

.fps-tag {
  background: rgba(16, 185, 129, 0.25);
  border: 1px solid #10b981;
  color: #10b981;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
}

.audio-tag {
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
}

.screen-canvas-box {
  position: relative;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at center, #111a2e 0%, #060911 100%);
  padding: 1.5rem;
  overflow: hidden;
}

.video-canvas-content {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Video Stage */
.vid-center-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vid-play-button-glow {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 35px rgba(239, 68, 68, 0.8);
  margin-bottom: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.vid-play-button-glow:hover {
  transform: scale(1.1);
}

.play-triangle {
  color: #ffffff;
  font-size: 1.5rem;
  margin-left: 4px;
}

.vid-main-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.4rem;
}

.vid-sub-caption {
  font-size: 0.88rem;
  color: #94a3b8;
}

.cinema-eq-spectrum {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  align-items: flex-end;
  height: 28px;
}

.spectrum-bar {
  width: 4px;
  background: linear-gradient(180deg, #38bdf8, #818cf8);
  border-radius: 2px;
  animation: eq-bounce 1.2s infinite ease-in-out alternate;
}

@keyframes eq-bounce {
  0% { height: 4px; }
  100% { height: 26px; }
}

/* Multi-monitor Mock */
.multi-monitor-cockpit-stage {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  width: 100%;
}

.vr-mon-card {
  padding: 0.85rem 1.1rem;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.vr-mon-card.active {
  border-color: #38bdf8;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
  transform: scale(1.08);
}

.mon-app {
  font-size: 0.82rem;
  font-weight: 800;
  color: #f8fafc;
}

.mon-stat {
  font-size: 0.68rem;
  color: #94a3b8;
}
.mon-stat.green { color: #10b981; font-weight: 800; }

.multi-sync-pill {
  margin-top: 1.5rem;
  font-size: 0.78rem;
  color: #38bdf8;
  font-weight: 700;
  text-align: center;
}

/* Laser Mock */
.laser-multi-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.laser-raycast-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.controller-node {
  background: #0284c7;
  color: #ffffff;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
}

.laser-beam-trace {
  height: 2px;
  width: 120px;
  background: linear-gradient(90deg, #38bdf8, #ef4444);
  box-shadow: 0 0 8px #ef4444;
}

.mesh-target-hit {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #f8fafc;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-family: monospace;
}

.laser-action-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.l-pill {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
}

/* Screen Control Bar */
.screen-control-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(15, 23, 42, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  z-index: 10;
}

.ctrl-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ctrl-play-btn {
  background: none;
  border: none;
  color: #38bdf8;
  font-size: 0.9rem;
  cursor: pointer;
}

.timecode {
  font-size: 0.72rem;
  color: #94a3b8;
  font-family: monospace;
}

.ctrl-progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
}

.ctrl-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.hd-pill {
  font-size: 0.68rem;
  font-weight: 800;
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.fullscreen-icon {
  font-size: 0.85rem;
  color: #94a3b8;
  cursor: pointer;
}

/* Theater Footer Info */
.theater-footer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: #090d16;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 1rem;
}

.video-info-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.25rem;
  border-top: none !important;
}

.video-info-text {
  font-size: 0.88rem;
  color: #94a3b8;
  max-width: 700px;
  line-height: 1.5;
}

.video-doc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8 !important;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.video-doc-link:hover {
  background: #38bdf8;
  color: #04121e !important;
}

/* ========================================================================= */
/* 3 CORE COMMERCIAL PILLARS                                                 */
/* ========================================================================= */
.hero-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.pillar-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.pillar-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
}

.pillar-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.pillar-icon-box.cyan { background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; }
.pillar-icon-box.green { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }
.pillar-icon-box.purple { background: rgba(129, 140, 248, 0.15); border: 1px solid #818cf8; }

.pillar-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  border-top: none !important;
}

.pillar-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  flex: 1;
}

.inline-code {
  background: rgba(255, 255, 255, 0.08);
  color: #0284c7;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-family: monospace;
}

.pillar-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.pillar-tags span {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

@media (max-width: 960px) {
  .hero-pillars-grid {
    grid-template-columns: 1fr;
  }
  .hero-master-title {
    font-size: 2.3rem;
  }
  .theater-topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

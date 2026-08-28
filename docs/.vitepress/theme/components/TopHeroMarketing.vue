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
          <span class="badge-txt">UNREAL ENGINE 5.5 • META QUEST STANDALONE</span>
        </div>

        <h1 class="hero-master-title">
          Full WebKit Browser in VR<br />
          <span class="gradient-text">70+ FPS & Instant Localhost Hot-Reload</span>
        </h1>

        <p class="hero-master-subtitle">
          Connect directly to your local PC dev servers (<code class="code-pill">http://localhost:3000</code>), stream 1080p hardware video, and build multi-screen 3D workspaces in Meta Quest with sub-millisecond response time.
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
            <span>📚 40+ Blueprint Nodes</span>
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
              <span class="theater-heading">FEATURE DEMO CHANNELS</span>
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

                <!-- Channel 2: Localhost & PC Hot Reload -->
                <div v-else-if="activeVideo.id === 'localhost-demo'" class="vid-stage-channel localhost-channel">
                  <div class="localhost-ui-mockup">
                    <div class="mock-terminal">
                      <div class="term-bar"><span class="t-dot red"></span><span class="t-dot yel"></span><span class="t-dot grn"></span> Local Vite/Next Dev Server</div>
                      <div class="term-code">
                        <span class="cmd-green">$ npm run dev</span><br/>
                        <span class="cmd-cyan">➜ Local:    http://localhost:3000/</span><br/>
                        <span class="cmd-cyan">➜ Network:  http://192.168.1.104:3000/</span><br/>
                        <span class="cmd-green">✓ Ready in 180ms • Instant HMR Active in VR</span>
                      </div>
                    </div>
                    <div class="vr-sync-bridge">
                      <span class="sync-icon">⚡</span>
                      <span class="sync-txt">Zero Deploy • Direct PC ➔ Quest VR Stream</span>
                    </div>
                  </div>
                </div>

                <!-- Channel 3: VR Laser & Multi-Screen -->
                <div v-else-if="activeVideo.id === 'laser-demo'" class="vid-stage-channel laser-channel">
                  <div class="laser-multi-mockup">
                    <div class="floating-vr-monitors">
                      <div class="vr-mon">ChatGPT</div>
                      <div class="vr-mon active">YouTube Cinema</div>
                      <div class="vr-mon">Trello</div>
                    </div>
                    <div class="laser-beam-indicator">
                      <span>🎯 3D Hit UV: (0.52, 0.68) ➔ Instant W3C Hover & Click</span>
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
                  <div class="progress-fill" :style="{ width: '38%' }"></div>
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
      <!-- 3 MASTER PILLAR ADVANTAGE CARDS (Distinct from slider)                     -->
      <!-- ========================================================================= -->
      <div class="hero-pillars-grid">
        
        <div class="pillar-card glass-card">
          <div class="pillar-icon-box cyan">💻</div>
          <h3 class="pillar-title">Instant Localhost & LAN Dev</h3>
          <p class="pillar-desc">
            Test web UI directly from your local PC dev server (<code class="inline-code">localhost:3000</code> or local IP) with instant Hot Module Replacement inside the Quest VR headset without cloud deployments.
          </p>
          <div class="pillar-tags">
            <span>Next.js / Vite</span>
            <span>Local PC HMR</span>
            <span>Offline LAN</span>
          </div>
        </div>

        <div class="pillar-card glass-card">
          <div class="pillar-icon-box green">⚡</div>
          <h3 class="pillar-title">True 70+ FPS Hardware Video</h3>
          <p class="pillar-desc">
            Bypasses software canvas drawing entirely. Offloaded 100% to Qualcomm Snapdragon VPU hardware decoding for crystal-clear 1080p YouTube, Twitch, and HTML5 video with zero black screens.
          </p>
          <div class="pillar-tags">
            <span>Snapdragon XR2</span>
            <span>0.4ms Latency</span>
            <span>Zero Black Screens</span>
          </div>
        </div>

        <div class="pillar-card glass-card">
          <div class="pillar-icon-box purple">🪶</div>
          <h3 class="pillar-title">24 KB Micro Footprint</h3>
          <p class="pillar-desc">
            Reuses the high-performance WebKit engine already built into Meta Quest Horizon OS. Adds only 24 KB to your packaged APK compared to 250 MB bloated CEF binaries, and requires 0 dangerous permissions.
          </p>
          <div class="pillar-tags">
            <span>24 KB (0.02 MB)</span>
            <span>0 Permissions</span>
            <span>100% Store Pass</span>
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
    title: '70+ FPS Video & Audio',
    badge: 'Hardware VPU',
    icon: '🎬',
    resolution: '1080p60 / 4K',
    fps: '70+ FPS Solid',
    audioMode: 'HTML5 Direct & Spatial Audio',
    headline: 'Cinema-Quality 70+ FPS Hardware Video Playback in VR',
    caption: 'Full Snapdragon XR2 VPU hardware decoding with zero CPU texture uploads.',
    description: 'Watch 1080p60 YouTube streams, live Twitch broadcasts, and local MP4/H.264 video with true hardware acceleration directly mapped to 3D meshes in Unreal Engine 5.5.',
    themeClass: 'theme-video',
    learnMoreText: 'Read Video Cinema Guide',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/youtube-cinema'
  },
  {
    id: 'localhost-demo',
    title: 'Localhost & PC Hot Reload',
    badge: 'Zero Deploy',
    icon: '💻',
    resolution: 'Real-Time HMR',
    fps: 'Instant Sync',
    audioMode: 'Local Audio Stream',
    headline: 'Instant Localhost & LAN Web Development in VR',
    caption: 'Connect directly to your local PC dev servers (Vite, Next.js, React) with instant HMR in VR.',
    description: 'Iterate at lightning speed. Spin up your local dev server on your PC and view live updates in your Quest VR headset instantly without building or deploying to cloud servers.',
    themeClass: 'theme-localhost',
    learnMoreText: 'Read Localhost & Offline Guide',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/dynamic-url-loading'
  },
  {
    id: 'laser-demo',
    title: 'VR Laser & Multi-Monitor',
    badge: 'W3C Pointer',
    icon: '🎯',
    resolution: 'Sub-Pixel UV',
    fps: 'Multi-Screen',
    audioMode: 'Multi-Channel Gated',
    headline: 'Precision VR Laser Pointer & Unlimited Multi-Screen Workspaces',
    caption: 'Raycast UV clicks, W3C hover states, kinetic dragging, and multi-monitor isolation.',
    description: 'Run scalable multi-monitor productivity workstations with isolated cookies and independent TargetFPS caps, fully controllable with VR motion controller laser pointers.',
    themeClass: 'theme-laser',
    learnMoreText: 'Read Multi-Monitor Walkthrough',
    learnMoreLink: '/quest3dwebview-docs/walkthroughs/multi-monitor-workspace'
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
  max-width: 860px;
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
  font-size: 3rem;
  line-height: 1.18;
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

.code-pill {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #0284c7;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9em;
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

/* Localhost Mock */
.localhost-ui-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}

.mock-terminal {
  width: 100%;
  background: #0a0f1d;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: #111827;
  font-size: 0.72rem;
  color: #94a3b8;
}

.t-dot { width: 8px; height: 8px; border-radius: 50%; }
.t-dot.red { background: #ef4444; }
.t-dot.yel { background: #f59e0b; }
.t-dot.grn { background: #10b981; }

.term-code {
  padding: 0.85rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.6;
}

.cmd-green { color: #10b981; }
.cmd-cyan { color: #38bdf8; font-weight: bold; }

.vr-sync-bridge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 800;
}

/* Laser Mock */
.laser-multi-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.floating-vr-monitors {
  display: flex;
  gap: 0.75rem;
}

.vr-mon {
  padding: 0.85rem 1.25rem;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 800;
  color: #94a3b8;
}

.vr-mon.active {
  border-color: #38bdf8;
  color: #f8fafc;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
  transform: scale(1.08);
}

.laser-beam-indicator {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 800;
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
/* 3 MASTER PILLAR ADVANTAGE CARDS                                           */
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
  color: #38bdf8;
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

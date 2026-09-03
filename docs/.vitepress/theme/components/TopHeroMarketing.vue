<template>
  <div class="top-hero-wrapper">
    
    <!-- ========================================================================= -->
    <!-- FULL WIDTH (100%) INFINITE MARQUEE TICKER (RIGHT AFTER NAVBAR)            -->
    <!-- ========================================================================= -->
    <div class="top-marquee-container">
      <div class="marquee-track">
        <!-- Duplicate marquee items for seamless infinite scroll -->
        <div class="marquee-content">
          <div v-for="(item, idx) in marqueeSpecs" :key="'m1-' + idx" class="marquee-pill-item">
            <span class="m-icon">{{ item.icon }}</span>
            <div class="m-text-group">
              <strong class="m-title">{{ item.title }}</strong>
              <span class="m-dot">•</span>
              <span class="m-sub">{{ item.sub }}</span>
            </div>
          </div>
        </div>

        <div class="marquee-content" aria-hidden="true">
          <div v-for="(item, idx) in marqueeSpecs" :key="'m2-' + idx" class="marquee-pill-item">
            <span class="m-icon">{{ item.icon }}</span>
            <div class="m-text-group">
              <strong class="m-title">{{ item.title }}</strong>
              <span class="m-dot">•</span>
              <span class="m-sub">{{ item.sub }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ambient Holographic Glows -->
    <div class="glow-orb orb-left"></div>
    <div class="glow-orb orb-right"></div>

    <div class="top-hero-container">
      
      <!-- ========================================================================= -->
      <!-- TOP HERO SPLIT ROW: MARKETING PITCH (LEFT) + PROMO VIDEO FRAME (RIGHT)    -->
      <!-- ========================================================================= -->
      <div class="hero-split-grid">
        
        <!-- Left Side: Core Marketing Pitch -->
        <div class="hero-pitch-left">
          
          <div class="hero-top-badge">
            <span class="pulse-indicator"></span>
            <span class="badge-txt">UNREAL ENGINE 5.5 • QUEST 2 / 3 / 3S / PRO</span>
          </div>

          <h1 class="hero-master-title">
            The #1 Web Browser Engine for Meta Quest in UE5
          </h1>
          <div class="hero-master-gradient-sub">
            True 70+ FPS Hardware Video • Any 3D Mesh • 24 KB Footprint
          </div>

          <p class="hero-master-subtitle">
            The only Unreal Engine plugin engineered for Meta Quest that renders live 1080p web video (YouTube, Twitch, WebGL) onto any 3D surface with <strong>zero black screens</strong>, <strong>zero APK bloat</strong>, and <strong>full W3C VR laser interaction</strong>.
          </p>

          <!-- CTA Action Layout: Row 1 Primary, Row 2 Secondary -->
          <div class="hero-actions-container">
            <div class="action-row-primary">
              <a href="/quest3dwebview-docs/getting-started/quick-start" class="hero-cta-primary">
                <span>🚀 5-Minute Quick Start Guide</span>
                <span class="btn-arrow">→</span>
              </a>
            </div>
            
            <div class="action-row-secondary">
              <a href="/quest3dwebview-docs/features/overview" class="hero-cta-secondary">
                <span>Explore All Capabilities</span>
              </a>
              <a href="/quest3dwebview-docs/api-reference/blueprint-functions" class="hero-cta-secondary">
                <span>📚 40+ Blueprint Nodes</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Right Side: Promotional Video Container (Ready for user's video) -->
        <div class="hero-video-right">
          
          <!-- Hardware Support Badges Row (Over top of video on right side) -->
          <div class="hw-support-row">
            <span class="hw-label">TARGET HARDWARE:</span>
            <span class="hw-chip">Quest 3</span>
            <span class="hw-chip">Quest 3S</span>
            <span class="hw-chip">Quest 2</span>
            <span class="hw-chip">Quest Pro</span>
            <span class="hw-chip ue">UE 5.5</span>
          </div>

          <div class="promo-video-frame glass-panel">
            
            <!-- Video Top Header Bar -->
            <div class="video-frame-topbar">
              <div class="v-live-tag">
                <span class="v-live-dot"></span>
                <span class="v-live-txt">LIVE VR GAMEPLAY</span>
              </div>
              <div class="v-meta-badges">
                <span class="v-badge-res">1080p60</span>
                <span class="v-badge-fps">70+ FPS</span>
              </div>
            </div>

            <!-- Video Display Stage with Autoplay Muted Loop Video -->
            <div class="video-canvas-stage">
              <video
                class="gameplay-hero-video"
                :src="videoSrc"
                autoplay
                muted
                loop
                playsinline
              ></video>
            </div>

            <!-- Video Bottom Status Bar -->
            <div class="video-frame-footer">
              <div class="v-footer-info">
                <span class="v-foot-icon">🎬</span>
                <span class="v-foot-text">Live 1080p YouTube, Twitch & Multi-Screen 3D Workspaces</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ========================================================================= -->
      <!-- THE 6 ANIMATED & BEAUTIFUL PRODUCT FEATURE CARDS                           -->
      <!-- ========================================================================= -->
      <div class="section-divider-heading">
        <span class="sub-label">CORE ARCHITECTURE & ADVANTAGES</span>
        <h2 class="cards-section-title">Everything You Need for Production VR Browsing</h2>
      </div>

      <div class="features-showcase-grid">
        
        <!-- Card 1 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-red"></div>
          <div class="card-header-row">
            <div class="promo-icon red">🎬</div>
            <span class="metric-pill green">70+ FPS Hardware</span>
          </div>
          <h3 class="promo-title">True 70+ FPS Hardware Video</h3>
          <p class="promo-desc">
            Direct Qualcomm Snapdragon VPU hardware decoding via native Android <code class="inline-code">VirtualDisplay</code>. Zero black screens on YouTube, Twitch, and HTML5 video, rendered directly to Unreal Dynamic Materials.
          </p>
          <div class="promo-tags">
            <span>Snapdragon XR2</span>
            <span>0.4ms Latency</span>
            <span>0 Black Screens</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-cyan"></div>
          <div class="card-header-row">
            <div class="promo-icon cyan">🪶</div>
            <span class="metric-pill cyan">24 KB (0.02 MB)</span>
          </div>
          <h3 class="promo-title">24 KB Zero-Bloat Footprint</h3>
          <p class="promo-desc">
            Reuses Meta Quest OS System WebKit directly. Adds only 24 KB to your packaged APK compared to 250 MB bloated CEF binaries, saving thermal headroom, memory bandwidth, and battery life.
          </p>
          <div class="promo-tags">
            <span>99.9% Smaller</span>
            <span>0 MB CEF Bloat</span>
            <span>0 RAM Waste</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-purple"></div>
          <div class="card-header-row">
            <div class="promo-icon purple">🎯</div>
            <span class="metric-pill purple">W3C Pointer Ready</span>
          </div>
          <h3 class="promo-title">Full W3C VR Laser Interaction</h3>
          <p class="promo-desc">
            Line trace from VR motion controllers directly to any 3D mesh. Converts raycast UV hits into native web clicks, CSS hover states, kinetic touch dragging, and analog thumbstick scrolling.
          </p>
          <div class="promo-tags">
            <span>Raycast UV Clicks</span>
            <span>CSS Hover</span>
            <span>Touch Dragging</span>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-blue"></div>
          <div class="card-header-row">
            <div class="promo-icon blue">🖥️</div>
            <span class="metric-pill blue">Scalable N-Displays</span>
          </div>
          <h3 class="promo-title">Unlimited Multi-Monitor Workspaces</h3>
          <p class="promo-desc">
            Run as many concurrent 3D screens as your VR project needs (ChatGPT, Trello, Discord, Docs) with complete instance isolation, independent session cookies, and per-display TargetFPS caps.
          </p>
          <div class="promo-tags">
            <span>0 Crosstalk</span>
            <span>Independent TargetFPS</span>
            <span>Virtual Desktops</span>
          </div>
        </div>

        <!-- Card 5 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-amber"></div>
          <div class="card-header-row">
            <div class="promo-icon amber">🔄</div>
            <span class="metric-pill amber">&lt; 1ms JSON Bridge</span>
          </div>
          <h3 class="promo-title">Two-Way JavaScript Bridge</h3>
          <p class="promo-desc">
            Execute arbitrary JavaScript in the web DOM via <code class="inline-code">ExecuteJavaScript()</code> and receive structured JSON events back into Unreal Blueprints via <code class="inline-code">window.quest3d.postMessage()</code>.
          </p>
          <div class="promo-tags">
            <span>Two-Way Sync</span>
            <span>Custom Web HUD</span>
            <span>Real-Time Events</span>
          </div>
        </div>

        <!-- Card 6 -->
        <div class="feature-promo-card glass-card">
          <div class="card-glow-bg glow-green"></div>
          <div class="card-header-row">
            <div class="promo-icon green">🔒</div>
            <span class="metric-pill green">0 Permissions</span>
          </div>
          <h3 class="promo-title">100% Meta Store Compliant</h3>
          <p class="promo-desc">
            Requires <strong>zero dangerous Android runtime permissions</strong> (zero camera, zero mic, zero external storage). Guaranteed automated ingestion pass for Meta Horizon Store and App Lab submissions.
          </p>
          <div class="promo-tags">
            <span>Store Approved</span>
            <span>No Android Popups</span>
            <span>Enterprise Ready</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const videoSrc = computed(() => withBase('/Gameplay.mp4'))

const marqueeSpecs = [
  { icon: '⚡', title: 'Snapdragon VPU', sub: '70+ FPS Hardware Video' },
  { icon: '🪶', title: '24 KB Footprint', sub: '0 MB Heavy CEF Bloat' },
  { icon: '🎯', title: 'W3C Laser Pointer', sub: 'Sub-Pixel UV Raycasts' },
  { icon: '🖥️', title: 'Multi-Monitor', sub: 'Scalable N-Displays' },
  { icon: '🔄', title: 'Two-Way JS Bridge', sub: '< 1ms JSON Sync' },
  { icon: '🔒', title: '100% Meta Store Compliant', sub: '0 Permissions' },
  { icon: '⌨️', title: 'Virtual Keyboard', sub: 'Auto 3D Focus Summon' },
  { icon: '🎮', title: '40+ Blueprint Nodes', sub: '1-Node Drag & Drop' }
]
</script>

<style scoped>
.top-hero-wrapper {
  position: relative;
  width: 100%;
  padding: 0 0 2rem 0;
  overflow: hidden;
}

/* ========================================================================= */
/* 100% FULL-WIDTH MARQUEE TICKER (RIGHT AFTER NAVBAR)                       */
/* ========================================================================= */
.top-marquee-container {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: rgba(10, 15, 29, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(56, 189, 248, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  padding: 0.55rem 0;
  margin-bottom: 3rem;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  user-select: none;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: marquee-scroll 58s linear infinite;
  padding-right: 0.75rem;
}

.marquee-track:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.marquee-pill-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.18);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.marquee-pill-item:hover {
  background: rgba(56, 189, 248, 0.12);
  border-color: #38bdf8;
  transform: translateY(-1px);
}

.m-icon {
  font-size: 0.95rem;
  line-height: 1;
}

.m-text-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.m-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.m-dot {
  color: #38bdf8;
  font-weight: bold;
}

.m-sub {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

/* Light Theme overrides for marquee */
html:not(.dark) .top-marquee-container {
  background: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
  border-top: 1px solid #e2e8f0 !important;
}

html:not(.dark) .marquee-pill-item {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}

html:not(.dark) .marquee-pill-item:hover {
  background: #e0f2fe !important;
  border-color: #0284c7 !important;
}

/* ========================================================================= */
/* GLOWS & CONTAINER                                                         */
/* ========================================================================= */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.orb-left {
  top: 5%;
  left: 5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%);
}

.orb-right {
  top: 25%;
  right: 5%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, #818cf8 0%, rgba(129, 140, 248, 0) 70%);
}

.top-hero-container {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ========================================================================= */
/* TWO-COLUMN HERO SPLIT                                                     */
/* ========================================================================= */
.hero-split-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 4.5rem;
}

/* Left Pitch */
.hero-pitch-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
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
  font-size: 2.65rem;
  line-height: 1.18;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  border-top: none !important;
}

.hero-master-gradient-sub {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  line-height: 1.35;
  font-weight: 800;
  background: linear-gradient(135deg, #38bdf8 20%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
}

.hero-master-subtitle {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

/* CTA Action Buttons: Clean 2-Row Hierarchy */
.hero-actions-container {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
}

.action-row-primary {
  display: flex;
  width: 100%;
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem 1.6rem;
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

.action-row-secondary {
  display: flex;
  gap: 0.85rem;
  width: 100%;
}

.hero-cta-secondary {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(56, 189, 248, 0.4);
}

/* Right Side: Video + Hardware Badges */
.hero-video-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

/* Hardware Support Row (Over Video) */
.hw-support-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  width: 100%;
}

.hw-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
  margin-right: 0.2rem;
}

.hw-chip {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--vp-c-text-2);
}

.hw-chip.ue {
  background: rgba(56, 189, 248, 0.12);
  border-color: #38bdf8;
  color: #38bdf8;
}

/* ========================================================================= */
/* RIGHT PROMOTIONAL VIDEO FRAME                                             */
/* ========================================================================= */
.promo-video-frame {
  width: 100%;
  max-width: 520px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.2);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.promo-video-frame:hover {
  transform: translateY(-4px);
  border-color: #38bdf8;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(56, 189, 248, 0.35);
}

.video-frame-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: #090d16;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.v-live-tag {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.v-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
  animation: pulse-glow 1.5s infinite;
}

.v-live-txt {
  font-size: 0.74rem;
  font-weight: 900;
  color: #94a3b8;
  letter-spacing: 0.06em;
}

.v-meta-badges {
  display: flex;
  gap: 0.4rem;
}

.v-badge-res {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.v-badge-fps {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  color: #10b981;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.video-canvas-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #060911;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.gameplay-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-center-content {
  position: relative;
  z-index: 2;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-play-orb {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 35px rgba(239, 68, 68, 0.85);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.video-play-orb:hover {
  transform: scale(1.12);
}

.play-arrow {
  color: #ffffff;
  font-size: 1.4rem;
  margin-left: 3px;
}

.orb-ripple {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(239, 68, 68, 0.6);
  animation: orb-pulse 2s infinite;
}

@keyframes orb-pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.v-stage-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.3rem;
}

.v-stage-sub {
  font-size: 0.82rem;
  color: #94a3b8;
}

.video-bottom-controls {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(15, 23, 42, 0.85);
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
}

.v-ctrl-play {
  color: #38bdf8;
  font-size: 0.85rem;
  cursor: pointer;
}

.v-ctrl-progress {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.v-progress-active {
  height: 100%;
  background: #38bdf8;
}

.v-ctrl-time {
  font-size: 0.68rem;
  color: #94a3b8;
  font-family: monospace;
}

.v-ctrl-hd {
  font-size: 0.65rem;
  font-weight: 800;
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.video-frame-footer {
  padding: 0.85rem 1.25rem;
  background: #090d16;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.v-footer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #cbd5e1;
}

/* ========================================================================= */
/* THE 6 ANIMATED & BEAUTIFUL PRODUCT FEATURE CARDS                          */
/* ========================================================================= */
.section-divider-heading {
  text-align: center;
  margin-bottom: 2rem;
}

.sub-label {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #38bdf8;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  display: block;
}

.cards-section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  border-top: none !important;
}

.features-showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-promo-card {
  position: relative;
  padding: 1.85rem;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-glow-bg {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.glow-red { background: rgba(239, 68, 68, 0.4); }
.glow-cyan { background: rgba(56, 189, 248, 0.4); }
.glow-purple { background: rgba(168, 85, 247, 0.4); }
.glow-blue { background: rgba(59, 130, 246, 0.4); }
.glow-amber { background: rgba(245, 158, 11, 0.4); }
.glow-green { background: rgba(16, 185, 129, 0.4); }

.feature-promo-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(56, 189, 248, 0.2);
}

.feature-promo-card:hover .card-glow-bg {
  opacity: 1;
}

.feature-promo-card:hover .promo-icon {
  transform: scale(1.1) rotate(-3deg);
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.promo-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.promo-icon.red { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; }
.promo-icon.cyan { background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; }
.promo-icon.purple { background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; }
.promo-icon.blue { background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; }
.promo-icon.amber { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; }
.promo-icon.green { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }

.metric-pill {
  font-size: 0.74rem;
  font-weight: 800;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}
.metric-pill.green { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; }
.metric-pill.cyan { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid #38bdf8; }
.metric-pill.purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid #a855f7; }
.metric-pill.blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid #3b82f6; }
.metric-pill.amber { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid #f59e0b; }

.promo-title {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.6rem;
  border-top: none !important;
}

.promo-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.inline-code {
  background: rgba(255, 255, 255, 0.08);
  color: #0284c7;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.promo-tags {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.promo-tags span {
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-2);
}

/* Light Theme Enhancements */
html:not(.dark) .hw-chip {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #334155 !important;
}

html:not(.dark) .hw-chip.ue {
  background: #e0f2fe !important;
  border-color: #0284c7 !important;
  color: #0284c7 !important;
}

html:not(.dark) .promo-video-frame {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
}

html:not(.dark) .video-frame-topbar,
html:not(.dark) .video-frame-footer {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

html:not(.dark) .v-footer-info {
  color: #334155 !important;
}

html:not(.dark) .feature-promo-card {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}

html:not(.dark) .feature-promo-card:hover {
  border-color: #0284c7 !important;
  box-shadow: 0 12px 32px rgba(2, 132, 199, 0.15) !important;
}

html:not(.dark) .promo-tags span {
  background: #f1f5f9 !important;
  border-color: #e2e8f0 !important;
  color: #334155 !important;
}

@media (max-width: 1024px) {
  .hero-split-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-pitch-left {
    align-items: center;
    text-align: center;
  }
  .hero-actions-left {
    justify-content: center;
  }
  .hw-support-row {
    justify-content: center;
  }
  .features-showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero-master-title {
    font-size: 2.1rem;
  }
  .features-showcase-grid {
    grid-template-columns: 1fr;
  }
}
</style>

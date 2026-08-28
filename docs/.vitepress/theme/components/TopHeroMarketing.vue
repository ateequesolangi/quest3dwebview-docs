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
      <!-- KEY PRODUCT FEATURES SHOWCASE GRID (VISUAL & STRAIGHTFORWARD)             -->
      <!-- ========================================================================= -->
      <div class="features-showcase-grid">
        
        <!-- Feature 1 -->
        <div class="feature-promo-card glass-card">
          <div class="card-header-row">
            <div class="promo-icon red">🎬</div>
            <span class="metric-pill green">70+ FPS Hardware</span>
          </div>
          <h3 class="promo-title">True 70+ FPS Hardware Video</h3>
          <p class="promo-desc">
            Direct Qualcomm Snapdragon VPU hardware decoding via native <code class="inline-code">VirtualDisplay</code>. Zero black screens on YouTube, Twitch, and HTML5 video, rendered directly to Unreal Dynamic Materials.
          </p>
          <div class="promo-tags">
            <span>Snapdragon XR2</span>
            <span>0.4ms Latency</span>
            <span>0 Black Screens</span>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-promo-card glass-card">
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

        <!-- Feature 3 -->
        <div class="feature-promo-card glass-card">
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

        <!-- Feature 4 -->
        <div class="feature-promo-card glass-card">
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

        <!-- Feature 5 -->
        <div class="feature-promo-card glass-card">
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

        <!-- Feature 6 -->
        <div class="feature-promo-card glass-card">
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
// Clean straightforward component
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
/* FEATURES PROMO GRID                                                       */
/* ========================================================================= */
.features-showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.feature-promo-card {
  padding: 1.85rem;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.feature-promo-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.45);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15);
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.promo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.promo-icon.red { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; }
.promo-icon.cyan { background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; }
.promo-icon.purple { background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; }
.promo-icon.blue { background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; }
.promo-icon.amber { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; }
.promo-icon.green { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }

.metric-pill {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
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
  font-size: 0.9rem;
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

@media (max-width: 960px) {
  .features-showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-master-title {
    font-size: 2.3rem;
  }
}

@media (max-width: 640px) {
  .features-showcase-grid {
    grid-template-columns: 1fr;
  }
}
</style>

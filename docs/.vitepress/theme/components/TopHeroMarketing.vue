<template>
  <div class="top-hero-wrapper">
    <!-- Ambient Holographic Glows -->
    <div class="glow-orb orb-left"></div>
    <div class="glow-orb orb-right"></div>

    <div class="top-hero-container">
      <div class="hero-main-grid">
        
        <!-- Left Content Column -->
        <div class="hero-left-col">
          <div class="hero-top-badge">
            <span class="pulse-indicator"></span>
            <span class="badge-txt">UNREAL ENGINE 5.5 • META QUEST NATIVE</span>
          </div>

          <h1 class="hero-master-title">
            The Ultimate <span class="gradient-text">70+ FPS</span><br />
            Web Browser Engine for VR
          </h1>

          <p class="hero-master-subtitle">
            Render live 1080p web video, scalable multi-monitor workspaces, and interactive HTML5 web apps directly onto any 3D mesh with zero black screens, zero CPU lag, and zero APK bloat.
          </p>

          <!-- Interactive Feature Chips -->
          <div class="hero-feature-chips">
            <div
              v-for="(chip, index) in featureChips"
              :key="chip.title"
              class="chip-item"
              :class="{ active: activeMode === chip.mode }"
              @click="activeMode = chip.mode"
            >
              <span class="chip-icon">{{ chip.icon }}</span>
              <span class="chip-title">{{ chip.title }}</span>
            </div>
          </div>

          <!-- Hero Action Buttons -->
          <div class="hero-action-group">
            <a href="/quest3dwebview-docs/getting-started/quick-start" class="hero-cta-primary glow-btn">
              <span>🚀 5-Minute Quick Start</span>
              <span class="btn-arrow">→</span>
            </a>
            <a href="/quest3dwebview-docs/api-reference/blueprint-functions" class="hero-cta-secondary">
              <span>🎮 Live Blueprint Simulator</span>
            </a>
          </div>

          <!-- Trust & Compatibility Badges -->
          <div class="hero-trust-bar">
            <div class="trust-pill"><span class="check-icon">✓</span> Snapdragon XR2 Hardware VPU</div>
            <div class="trust-pill"><span class="check-icon">✓</span> 24 KB Zero Bloat</div>
            <div class="trust-pill"><span class="check-icon">✓</span> 0 Permissions Required</div>
          </div>
        </div>

        <!-- Right 3D Interactive Hologram Column -->
        <div class="hero-right-col">
          <div class="hologram-3d-wrapper">
            <div class="hologram-card glass-panel" :class="activeModeClass">
              
              <!-- Hologram Window Titlebar -->
              <div class="holo-titlebar">
                <div class="holo-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="holo-url-bar">
                  <span class="lock-icon">🔒</span>
                  <span class="url-text">{{ currentModeData.url }}</span>
                </div>
                <div class="holo-fps-tag">
                  <span class="fps-pulse"></span>
                  70+ FPS
                </div>
              </div>

              <!-- Hologram Live Viewport Surface -->
              <div class="holo-screen-surface">
                <!-- Mode 1: Cinema 70+ FPS Video -->
                <div v-if="activeMode === 'video'" class="holo-mode-content mode-video">
                  <div class="video-center-graphic">
                    <div class="vpu-pulse-ring">
                      <span class="play-symbol">▶</span>
                    </div>
                    <div class="video-info-badge">
                      <span class="yt-pill">YouTube 4K • 70+ FPS</span>
                      <span class="latency-pill">0.4ms Render Latency</span>
                    </div>
                  </div>

                  <!-- Live Equalizer Soundwaves -->
                  <div class="sound-equalizer">
                    <div v-for="i in 16" :key="i" class="eq-bar" :style="{ animationDelay: (i * 0.08) + 's' }"></div>
                  </div>
                </div>

                <!-- Mode 2: Multi-Monitor Cockpit -->
                <div v-else-if="activeMode === 'multi'" class="holo-mode-content mode-multi">
                  <div class="multi-monitor-cockpit">
                    <div class="monitor-panel left">
                      <span class="mon-title">ChatGPT</span>
                      <span class="mon-fps">30 FPS</span>
                    </div>
                    <div class="monitor-panel center main">
                      <span class="mon-title">YouTube Cinema</span>
                      <span class="mon-fps active">70+ FPS</span>
                    </div>
                    <div class="monitor-panel right">
                      <span class="mon-title">Trello Board</span>
                      <span class="mon-fps">30 FPS</span>
                    </div>
                  </div>
                  <div class="multi-info-bar">
                    <span>⚡ Scalable N-Display Instances • Zero Crosstalk</span>
                  </div>
                </div>

                <!-- Mode 3: VR Laser Interaction -->
                <div v-else-if="activeMode === 'laser'" class="holo-mode-content mode-laser">
                  <div class="laser-ray-visual">
                    <div class="laser-origin">Controller Laser</div>
                    <div class="laser-line"></div>
                    <div class="laser-target-hit">
                      <div class="hit-dot"></div>
                      <div class="hit-ring"></div>
                    </div>
                  </div>
                  <div class="laser-action-card">
                    <span class="w3c-tag">W3C Pointer Hover Active</span>
                    <span class="uv-coords">Hit UV: (0.54, 0.76) ➔ ClickUV()</span>
                  </div>
                </div>

                <!-- Mode 4: Bi-Directional JS Bridge -->
                <div v-else-if="activeMode === 'bridge'" class="holo-mode-content mode-bridge">
                  <div class="bridge-sync-nodes">
                    <div class="b-node ue">🎮 Unreal Engine 5</div>
                    <div class="b-pulse-arrows">⇄ JSON Bridge ⇄</div>
                    <div class="b-node web">🌐 Web DOM App</div>
                  </div>
                  <div class="bridge-payload-preview">
                    <code>window.quest3d.postMessage({ event: "buy", price: 50 });</code>
                  </div>
                </div>

                <!-- Mode 5: Virtual Keyboard Focus -->
                <div v-else-if="activeMode === 'keyboard'" class="holo-mode-content mode-keyboard">
                  <div class="keyboard-focus-input">
                    <span class="cursor-line">|</span> Search in VR World...
                  </div>
                  <div class="keyboard-sim-keys">
                    <div class="k-row"><span class="key">Q</span><span class="key">W</span><span class="key">E</span><span class="key">R</span><span class="key">T</span><span class="key">Y</span><span class="key">U</span></div>
                    <div class="k-row"><span class="key">A</span><span class="key">S</span><span class="key">D</span><span class="key">F</span><span class="key">G</span><span class="key">H</span><span class="key">J</span></div>
                  </div>
                  <div class="kb-status">⌨️ OnTextInputFocusChanged ➔ 3D Keyboard Summoned</div>
                </div>

                <!-- Mode 6: 24 KB Zero Bloat -->
                <div v-else-if="activeMode === 'bloat'" class="holo-mode-content mode-bloat">
                  <div class="bloat-compare-grid">
                    <div class="bloat-card cef">
                      <span class="bc-name">CEF / GeckoView</span>
                      <span class="bc-size">+250 MB Extra</span>
                    </div>
                    <div class="bloat-card quest">
                      <span class="bc-name">Quest 3D WebView</span>
                      <span class="bc-size win">24 KB (0.02 MB)</span>
                    </div>
                  </div>
                  <div class="bloat-winner-bar">
                    <span>🚀 99.9% Leaner • Reuses Meta Quest OS Chromium</span>
                  </div>
                </div>

              </div>

              <!-- Hologram Footer Interactive Mode Bar -->
              <div class="holo-footer-mode-bar">
                <button
                  v-for="chip in featureChips"
                  :key="chip.mode"
                  class="mode-switch-btn"
                  :class="{ active: activeMode === chip.mode }"
                  @click="activeMode = chip.mode"
                >
                  <span>{{ chip.icon }}</span>
                  <span class="btn-lbl">{{ chip.shortTitle }}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMode = ref('video')

const featureChips = [
  {
    mode: 'video',
    icon: '🎬',
    title: '70+ FPS Hardware Video',
    shortTitle: 'Video',
    url: 'https://youtube.com/watch?v=VR_Cinema_4K'
  },
  {
    mode: 'multi',
    icon: '🖥️',
    title: 'Unlimited Multi-Monitor',
    shortTitle: 'Multi-Screen',
    url: 'workspace://unlimited-virtual-desktops'
  },
  {
    mode: 'laser',
    icon: '🎯',
    title: 'W3C VR Laser Hover',
    shortTitle: 'VR Laser',
    url: 'https://app.dashboard.io/vr'
  },
  {
    mode: 'bridge',
    icon: '🔄',
    title: 'Two-Way JS Bridge',
    shortTitle: 'JS Bridge',
    url: 'https://api.yourgame.com/hud'
  },
  {
    mode: 'keyboard',
    icon: '⌨️',
    title: 'Auto 3D Keyboard Focus',
    shortTitle: 'Keyboard',
    url: 'https://google.com/search?q=VR'
  },
  {
    mode: 'bloat',
    icon: '🪶',
    title: '24 KB Zero-Bloat',
    shortTitle: '24 KB Bloat',
    url: 'meta://system-webview-native'
  }
]

const currentModeData = computed(() => {
  return featureChips.find(c => c.mode === activeMode.value) || featureChips[0]
})

const activeModeClass = computed(() => {
  return `theme-${activeMode.value}`
})
</script>

<style scoped>
.top-hero-wrapper {
  position: relative;
  width: 100%;
  padding: 3rem 0.5rem 2.5rem 0.5rem;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.orb-left {
  top: -10%;
  left: 5%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%);
}

.orb-right {
  top: 15%;
  right: 5%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #818cf8 0%, rgba(129, 140, 248, 0) 70%);
}

.top-hero-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.hero-main-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;
}

/* Left Hero Column */
.hero-top-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
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
  50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 14px #38bdf8; }
  100% { transform: scale(0.95); opacity: 0.8; }
}

.hero-master-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.85rem;
  line-height: 1.15;
  font-weight: 900;
  color: #f8fafc;
  margin-bottom: 1.2rem;
  border-top: none !important;
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 20%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-master-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 1.75rem;
}

/* Feature Chips */
.hero-feature-chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.chip-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.25s ease;
}

.chip-item:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(56, 189, 248, 0.4);
  color: #f8fafc;
  transform: translateY(-2px);
}

.chip-item.active {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.25);
}

.chip-icon {
  font-size: 1.05rem;
}

/* Actions */
.hero-action-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
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
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(56, 189, 248, 0.4);
}

.hero-trust-bar {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.trust-pill {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.check-icon {
  color: #10b981;
  font-weight: bold;
}

/* Right 3D Hologram Column */
.hologram-3d-wrapper {
  perspective: 1200px;
}

.hologram-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.2);
  transform: rotateY(-6deg) rotateX(3deg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hologram-card:hover {
  transform: rotateY(0deg) rotateX(0deg) scale(1.02);
  border-color: rgba(56, 189, 248, 0.6);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(56, 189, 248, 0.35);
}

.holo-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background: #0f172a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.holo-dots {
  display: flex;
  gap: 0.35rem;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.holo-url-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #1e293b;
  padding: 0.25rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #94a3b8;
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
}

.holo-fps-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.fps-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  animation: pulse-fps 1.5s infinite;
}

@keyframes pulse-fps {
  0% { opacity: 0.6; }
  50% { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0.6; }
}

.holo-screen-surface {
  position: relative;
  height: 250px;
  background: radial-gradient(circle at center, #131d33 0%, #070b14 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
}

/* Video Mode */
.mode-video {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.vpu-pulse-ring {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
  animation: vpu-glow 2s infinite ease-in-out;
}

@keyframes vpu-glow {
  0% { transform: scale(0.95); box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
  50% { transform: scale(1.08); box-shadow: 0 0 40px rgba(239, 68, 68, 0.9); }
  100% { transform: scale(0.95); box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
}

.play-symbol {
  color: #fff;
  font-size: 1.4rem;
  margin-left: 4px;
}

.video-info-badge {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}

.yt-pill {
  background: #ef4444;
  color: #fff;
  font-weight: 800;
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.latency-pill {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  font-weight: 700;
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.sound-equalizer {
  position: absolute;
  bottom: 12px;
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 24px;
}

.eq-bar {
  width: 4px;
  background: linear-gradient(180deg, #38bdf8, #818cf8);
  border-radius: 2px;
  animation: eq-bounce 1.2s infinite ease-in-out alternate;
}

@keyframes eq-bounce {
  0% { height: 4px; }
  100% { height: 22px; }
}

/* Multi-monitor Mode */
.multi-monitor-cockpit {
  display: flex;
  gap: 0.6rem;
  width: 100%;
  justify-content: center;
}

.monitor-panel {
  padding: 0.75rem 0.6rem;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.monitor-panel.main {
  border-color: #38bdf8;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
  transform: scale(1.08);
}

.mon-fps {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.mon-fps.active {
  color: #10b981;
  font-weight: 900;
}

.multi-info-bar {
  margin-top: 1.25rem;
  font-size: 0.78rem;
  color: #38bdf8;
  font-weight: 700;
}

/* Laser Mode */
.laser-ray-visual {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}

.laser-origin {
  background: #0284c7;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 800;
}

.laser-line {
  height: 2px;
  width: 120px;
  background: linear-gradient(90deg, #38bdf8, #ef4444);
  box-shadow: 0 0 8px #ef4444;
}

.laser-target-hit {
  position: relative;
  width: 16px;
  height: 16px;
}

.hit-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 10px #ef4444;
}

.laser-action-card {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.w3c-tag {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.uv-coords {
  font-size: 0.75rem;
  color: #f8fafc;
  font-family: monospace;
}

/* Bridge Mode */
.bridge-sync-nodes {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.b-node {
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 800;
}
.b-node.ue { background: rgba(56, 189, 248, 0.2); border: 1px solid #38bdf8; color: #fff; }
.b-node.web { background: rgba(129, 140, 248, 0.2); border: 1px solid #818cf8; color: #fff; }
.b-pulse-arrows { font-size: 0.72rem; color: #10b981; font-weight: 900; }
.bridge-payload-preview { margin-top: 1rem; font-size: 0.72rem; color: #38bdf8; background: #0c1220; padding: 0.5rem 0.75rem; border-radius: 6px; }

/* Keyboard Mode */
.keyboard-focus-input {
  background: #1e293b;
  border: 1px solid #38bdf8;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  color: #f8fafc;
  font-size: 0.8rem;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
  margin-bottom: 0.75rem;
}
.cursor-line { color: #38bdf8; animation: blink 1s infinite; font-weight: bold; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.keyboard-sim-keys { display: flex; flex-direction: column; gap: 0.25rem; }
.k-row { display: flex; gap: 0.25rem; }
.key { background: #334155; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; color: #f8fafc; }
.kb-status { margin-top: 0.75rem; font-size: 0.72rem; color: #38bdf8; font-weight: 700; }

/* Bloat Mode */
.bloat-compare-grid { display: flex; gap: 1rem; width: 100%; }
.bloat-card { flex: 1; padding: 0.8rem; border-radius: 8px; text-align: center; display: flex; flex-direction: column; gap: 0.3rem; }
.bloat-card.cef { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); }
.bloat-card.quest { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }
.bc-name { font-size: 0.72rem; color: #94a3b8; }
.bc-size { font-size: 0.95rem; font-weight: 900; }
.bc-size.win { color: #10b981; }
.bloat-winner-bar { margin-top: 1rem; font-size: 0.75rem; color: #38bdf8; font-weight: 700; }

/* Footer Mode Switcher */
.holo-footer-mode-bar {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background: #090d16;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.mode-switch-btn {
  padding: 0.65rem 0.25rem;
  background: none;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-switch-btn:last-child {
  border-right: none;
}

.mode-switch-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #f8fafc;
}

.mode-switch-btn.active {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  font-weight: 800;
}

.btn-lbl {
  font-size: 0.68rem;
  white-space: nowrap;
}

@media (max-width: 960px) {
  .hero-main-grid {
    grid-template-columns: 1fr;
  }
  .hero-master-title {
    font-size: 2.2rem;
  }
  .hero-feature-chips {
    grid-template-columns: repeat(2, 1fr);
  }
  .hologram-card {
    transform: none;
  }
}

@media (max-width: 600px) {
  .hero-feature-chips {
    grid-template-columns: 1fr;
  }
  .holo-footer-mode-bar {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

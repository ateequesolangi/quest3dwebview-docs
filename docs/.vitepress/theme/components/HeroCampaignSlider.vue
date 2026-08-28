<template>
  <div class="campaign-slider-wrapper">
    <!-- Ambient Glow Backdrops -->
    <div class="ambient-glow cyan-glow"></div>
    <div class="ambient-glow purple-glow"></div>

    <div class="campaign-container">
      <!-- Main Slide Showcase Card -->
      <div class="slide-card glass-panel" :key="currentSlideIndex">
        <div class="slide-badge-row">
          <span class="campaign-badge promo-pill">
            <span class="pulse-dot"></span>
            {{ currentSlide.badge }}
          </span>
          <span class="engine-badge">Unreal Engine 5.5 • Meta Quest</span>
        </div>

        <div class="slide-body-grid">
          <!-- Text Content Column -->
          <div class="slide-text-col">
            <h2 class="slide-headline" v-html="currentSlide.headline"></h2>
            <p class="slide-subtext">{{ currentSlide.subtext }}</p>

            <div class="slide-highlights">
              <div v-for="(feat, idx) in currentSlide.features" :key="idx" class="highlight-item">
                <span class="check-icon">✦</span>
                <span>{{ feat }}</span>
              </div>
            </div>

            <div class="slide-cta-row">
              <a :href="currentSlide.ctaLink" class="primary-btn glow-on-hover">
                <span>{{ currentSlide.ctaText }}</span>
                <span class="arrow-icon">→</span>
              </a>
              <a href="/quest3dwebview-docs/getting-started/quick-start" class="secondary-btn">
                <span>5-Min Quickstart</span>
              </a>
            </div>
          </div>

          <!-- Interactive Visual Card Column -->
          <div class="slide-visual-col">
            <div class="visual-mockup-frame">
              <!-- Header Bar of Mockup -->
              <div class="mockup-header">
                <div class="window-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="mockup-url-bar">
                  <span class="lock-icon">🔒</span>
                  <span class="url-text">{{ currentSlide.visual.url }}</span>
                </div>
                <div class="mockup-fps-badge">{{ currentSlide.visual.fpsBadge }}</div>
              </div>

              <!-- Visual Screen Content -->
              <div class="mockup-screen-area" :class="currentSlide.visual.themeClass">
                <div class="screen-watermark">3D MESH RENDERED</div>
                
                <!-- Dynamic Visual Component based on slide -->
                <div v-if="currentSlide.id === 'video'" class="video-visual-content">
                  <div class="video-play-pulse">
                    <span class="play-triangle">▶</span>
                  </div>
                  <div class="video-overlay-bar">
                    <span class="live-tag">70+ FPS VPU DIRECT</span>
                    <span class="time-stamp">0.4ms Render Latency</span>
                  </div>
                </div>

                <div v-else-if="currentSlide.id === 'bloat'" class="bloat-visual-content">
                  <div class="comparison-row">
                    <div class="comp-box bad">
                      <div class="comp-label">CEF / GeckoView</div>
                      <div class="comp-val">~250 MB</div>
                      <div class="comp-bar bad-bar"></div>
                    </div>
                    <div class="comp-box good">
                      <div class="comp-label">Quest 3D WebView</div>
                      <div class="comp-val">0.02 MB (24 KB)</div>
                      <div class="comp-bar good-bar"></div>
                    </div>
                  </div>
                  <div class="comp-summary">🚀 99.9% Lighter • 0 MB Extra Engine Bloat</div>
                </div>

                <div v-else-if="currentSlide.id === 'bidirectional'" class="bridge-visual-content">
                  <div class="bridge-flow-diagram">
                    <div class="bridge-node ue-node">
                      <span class="node-icon">🎮</span>
                      <span class="node-label">Unreal Engine</span>
                      <span class="node-code">ExecuteJS()</span>
                    </div>
                    <div class="bridge-arrows">
                      <span class="arrow-right">➔ JSON Payload ➔</span>
                      <span class="arrow-left">◀ postMessage() ◀</span>
                    </div>
                    <div class="bridge-node web-node">
                      <span class="node-icon">🌐</span>
                      <span class="node-label">Web App DOM</span>
                      <span class="node-code">window.quest3d</span>
                    </div>
                  </div>
                  <div class="bridge-status-tag">✦ Real-Time Event Sync (< 1ms Latency)</div>
                </div>

                <div v-else-if="currentSlide.id === 'laser'" class="laser-visual-content">
                  <div class="laser-beam-animation">
                    <div class="laser-hit-point"></div>
                    <div class="laser-ray"></div>
                  </div>
                  <div class="laser-card-preview">
                    <div class="interactive-btn-demo active-hover">
                      <span>W3C Laser Hovered!</span>
                      <span class="sub-uv">UV: (0.64, 0.42)</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="currentSlide.id === 'multiscreen'" class="multi-visual-content">
                  <div class="screen-mini-cockpit">
                    <div class="mini-screen left"><span>ChatGPT</span><small>30 FPS</small></div>
                    <div class="mini-screen center active"><span>YouTube</span><small>70+ FPS</small></div>
                    <div class="mini-screen right"><span>Trello</span><small>30 FPS</small></div>
                  </div>
                  <div class="multi-status">⚡ Unlimited Multi-Instance Isolated • Zero Crosstalk</div>
                </div>

                <div v-else-if="currentSlide.id === 'keyboard'" class="keyboard-visual-content">
                  <div class="focused-input-demo">
                    <span class="cursor-blink">|</span> Search in VR...
                  </div>
                  <div class="keyboard-grid-mini">
                    <div class="key-row"><span class="k">Q</span><span class="k">W</span><span class="k">E</span><span class="k">R</span><span class="k">T</span><span class="k">Y</span></div>
                    <div class="key-row"><span class="k">A</span><span class="k">S</span><span class="k">D</span><span class="k">F</span><span class="k">G</span><span class="k">H</span></div>
                  </div>
                  <div class="auto-focus-tag">✦ Auto DOM Focus Bridge Active</div>
                </div>
              </div>

              <!-- Mockup Footer Stats -->
              <div class="mockup-footer">
                <div class="stat-pill"><span class="lbl">Memory:</span> <strong>{{ currentSlide.visual.ram }}</strong></div>
                <div class="stat-pill"><span class="lbl">CPU Cost:</span> <strong>{{ currentSlide.visual.cpu }}</strong></div>
                <div class="stat-pill"><span class="lbl">Perms:</span> <strong>0 Required</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Navigation Tabs / Selector Bar -->
      <div class="slider-selector-bar">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="selector-pill"
          :class="{ active: currentSlideIndex === index }"
          @click="selectSlide(index)"
        >
          <span class="pill-icon">{{ slide.icon }}</span>
          <span class="pill-title">{{ slide.navTitle }}</span>
          <div v-if="currentSlideIndex === index" class="pill-progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    id: 'video',
    icon: '🎬',
    navTitle: '70+ FPS Video',
    badge: '🔥 NO MORE BLACK SCREENS',
    headline: 'Say Goodbye to Black Screens.<br/><span class="gradient-text">Hello 70+ FPS Web Video.</span>',
    subtext: 'Direct Snapdragon VPU hardware decoding straight onto your 3D meshes. Stream YouTube 4K, Twitch, and HTML5 video at 70+ FPS with 0% CPU decoding overhead.',
    features: [
      'Zero black screen bug on Meta Quest Vulkan',
      'Atomic double-buffered Bitmap swap (zero screen tearing)',
      'Dirty-frame gating: 0.0ms GPU cost when video pauses'
    ],
    ctaText: 'Explore Video Pipeline',
    ctaLink: '/quest3dwebview-docs/features/rendering',
    visual: {
      url: 'https://youtube.com/watch?v=VR_Cinema_4K',
      fpsBadge: '70+ FPS • VPU',
      themeClass: 'video-theme',
      ram: '16.5 MB',
      cpu: '< 1%'
    }
  },
  {
    id: 'bloat',
    icon: '🪶',
    navTitle: '24 KB Footprint',
    badge: '⚡ 99.9% LIGHTER THAN CEF',
    headline: 'Why add 250 MB of Bloat?<br/><span class="gradient-text">We take only 24 KB.</span>',
    subtext: 'Reuses the Chromium engine already built into Meta Quest OS. Your APK stays razor-lean with instant Meta Horizon Store compliance and zero permission prompts.',
    features: [
      '24 Kilobyte total plugin binary footprint',
      'Zero dangerous Android runtime permissions',
      'Instant Meta Horizon Store automated pass'
    ],
    ctaText: 'View Architecture',
    ctaLink: '/quest3dwebview-docs/architecture/how-it-works',
    visual: {
      url: 'meta://system-webview-native',
      fpsBadge: '0 MB Bloat',
      themeClass: 'bloat-theme',
      ram: 'System-Shared',
      cpu: '0.0ms Idle'
    }
  },
  {
    id: 'bidirectional',
    icon: '🔄',
    navTitle: 'Bi-Directional JS',
    badge: '⚡ TWO-WAY UNREAL ↔ WEB',
    headline: 'Two-Way JavaScript Bridge.<br/><span class="gradient-text">Unreal & DOM in Real-Time Sync.</span>',
    subtext: 'Execute arbitrary JavaScript inside any web app and receive real-time JSON payloads back into Unreal Blueprint with window.quest3d.postMessage().',
    features: [
      'ExecuteJavaScript() node for full DOM manipulation',
      'window.quest3d.postMessage() -> OnJavaScriptMessage delegate',
      'Instant game state, inventory, analytics & authentication sync'
    ],
    ctaText: 'Explore JS Bridge',
    ctaLink: '/quest3dwebview-docs/features/javascript-bridge',
    visual: {
      url: 'https://api.yourgame.com/dashboard',
      fpsBadge: 'Bi-Directional Sync',
      themeClass: 'bridge-theme',
      ram: 'Zero-Copy',
      cpu: '< 0.1ms Bridge'
    }
  },
  {
    id: 'laser',
    icon: '🖱️',
    navTitle: 'VR Laser Pointer',
    badge: '🎯 1-NODE VR INTERACTION',
    headline: 'Your VR Laser Pointer<br/><span class="gradient-text">Just Became a Real Mouse.</span>',
    subtext: 'Full W3C pointer events, CSS hover animations, dropdown menus, and analog thumbstick scrolling wired in a single Line Trace node.',
    features: [
      'Native W3C hover (pointerover, mousemove, menus)',
      'ClickUV & continuous kinetic touch dragging',
      'ScrollBy for smooth analog thumbstick scrolling'
    ],
    ctaText: 'See VR Laser Guide',
    ctaLink: '/quest3dwebview-docs/features/vr-interaction',
    visual: {
      url: 'https://app.interface.io/dashboard',
      fpsBadge: '1:1 Laser UV',
      themeClass: 'laser-theme',
      ram: 'Lock-Free',
      cpu: '0.01ms Trace'
    }
  },
  {
    id: 'multiscreen',
    icon: '🖥️',
    navTitle: 'Multi-Monitor',
    badge: '🚀 UNLIMITED MULTI-MONITOR',
    headline: 'Build Virtual Offices &<br/><span class="gradient-text">Unlimited Multi-Monitor Workspaces.</span>',
    subtext: 'Run as many concurrent 3D screens as your VR project needs (ChatGPT, YouTube, Trello, Discord, Docs) with zero crosstalk, isolated instances, and independent TargetFPS caps.',
    features: [
      'Unlimited simultaneous screen instances (scalable N-displays)',
      'Custom per-screen TargetFPS (15 to 70+ FPS)',
      'Auto dynamic material binding on any 3D mesh'
    ],
    ctaText: 'Multi-Screen Tutorial',
    ctaLink: '/quest3dwebview-docs/walkthroughs/multi-monitor-workspace',
    visual: {
      url: 'workspace://cockpit-multi-display',
      fpsBadge: 'Scalable N-Displays',
      themeClass: 'multi-theme',
      ram: 'Multi-Display',
      cpu: 'Dynamic Gated'
    }
  },
  {
    id: 'keyboard',
    icon: '⌨️',
    navTitle: 'VR Keyboard Bridge',
    badge: '✨ SEAMLESS VR TYPING',
    headline: 'Automatic DOM Focus.<br/><span class="gradient-text">Seamless 3D Typing.</span>',
    subtext: 'Automatically detects when a user laser-clicks any web input field, textarea, or search bar—summoning your 3D VR keyboard instantly.',
    features: [
      'OnTextInputFocusChanged event delegate',
      'SendText & SendKey (Backspace, Enter, Tab, Arrows)',
      'Supports voice dictation and clipboard pasting'
    ],
    ctaText: 'Virtual Keyboard Setup',
    ctaLink: '/quest3dwebview-docs/features/keyboard-input',
    visual: {
      url: 'https://google.com/search?q=VR',
      fpsBadge: 'Auto-Focus Active',
      themeClass: 'keyboard-theme',
      ram: 'Instant Bridge',
      cpu: 'Event Driven'
    }
  }
]

const currentSlideIndex = ref(0)
const progressPercent = ref(0)
let timer = null
let progressTimer = null

const currentSlide = computed(() => slides[currentSlideIndex.value])

function startAutoSlide() {
  stopAutoSlide()
  progressPercent.value = 0
  
  const intervalTime = 6000 // 6 seconds per slide
  const stepTime = 50
  const stepIncrement = (stepTime / intervalTime) * 100

  progressTimer = setInterval(() => {
    progressPercent.value += stepIncrement
    if (progressPercent.value >= 100) {
      nextSlide()
    }
  }, stepTime)
}

function stopAutoSlide() {
  if (progressTimer) clearInterval(progressTimer)
}

function nextSlide() {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length
  progressPercent.value = 0
}

function selectSlide(index) {
  currentSlideIndex.value = index
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.campaign-slider-wrapper {
  position: relative;
  width: 100%;
  margin: 1.5rem 0 3.5rem 0;
  padding: 0 0.5rem;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.cyan-glow {
  top: 10%;
  left: 15%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%);
}

.purple-glow {
  bottom: 10%;
  right: 15%;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, #818cf8 0%, rgba(129, 140, 248, 0) 70%);
}

.campaign-container {
  position: relative;
  z-index: 1;
  max-width: 1152px;
  margin: 0 auto;
}

.glass-panel {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 24px;
  padding: 2.25rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.campaign-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
  animation: pulse-ring 1.8s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
  70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(56, 189, 248, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}

.engine-badge {
  font-size: 0.82rem;
  color: #94a3b8;
  font-weight: 500;
}

.slide-body-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.25rem;
  align-items: center;
}

.slide-headline {
  font-size: 2.15rem;
  line-height: 1.25;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.slide-subtext {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.slide-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.75rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-1);
}

.check-icon {
  color: #38bdf8;
  font-weight: bold;
}

.slide-cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #0284c7, #38bdf8);
  color: #04121e !important;
  text-decoration: none !important;
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.4);
  transition: all 0.25s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(56, 189, 248, 0.6);
}

.secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.4rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0 !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(56, 189, 248, 0.4);
}

/* Visual Mockup Container */
.visual-mockup-frame {
  background: #090d16;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
}

.mockup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.9rem;
  background: #0f172a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.window-dots {
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

.mockup-url-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #1e293b;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #94a3b8;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
}

.mockup-fps-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.mockup-screen-area {
  position: relative;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  background: radial-gradient(circle at center, #131d33 0%, #080c14 100%);
  overflow: hidden;
}

.screen-watermark {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.1em;
  font-weight: 800;
}

/* Visual elements */
.video-play-pulse {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
}

.play-triangle {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 3px;
}

.video-overlay-bar {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
}

.live-tag {
  background: #ef4444;
  color: #fff;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.time-stamp {
  color: #38bdf8;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Bloat visual */
.comparison-row {
  display: flex;
  gap: 1rem;
  width: 100%;
}
.comp-box {
  flex: 1;
  padding: 0.75rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  text-align: center;
}
.comp-box.bad { border: 1px solid rgba(239, 68, 68, 0.3); }
.comp-box.good { border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); }
.comp-label { font-size: 0.72rem; color: #94a3b8; margin-bottom: 0.25rem; }
.comp-val { font-size: 1rem; font-weight: 800; }
.comp-box.bad .comp-val { color: #ef4444; }
.comp-box.good .comp-val { color: #10b981; }
.comp-bar { height: 4px; border-radius: 2px; margin-top: 0.5rem; }
.bad-bar { background: #ef4444; width: 100%; }
.good-bar { background: #10b981; width: 6%; }
.comp-summary { margin-top: 0.9rem; font-size: 0.78rem; color: #38bdf8; font-weight: 600; }

/* Bridge visual */
.bridge-flow-diagram {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}
.bridge-node {
  background: #1e293b;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}
.ue-node { border-color: #38bdf8; background: rgba(56, 189, 248, 0.1); }
.web-node { border-color: #818cf8; background: rgba(129, 140, 248, 0.1); }
.node-icon { font-size: 1.25rem; }
.node-label { font-size: 0.75rem; font-weight: 800; color: #f8fafc; margin-top: 0.2rem; }
.node-code { font-size: 0.65rem; color: #38bdf8; font-family: monospace; }
.bridge-arrows {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
}
.arrow-right { color: #38bdf8; }
.arrow-left { color: #818cf8; }
.bridge-status-tag { margin-top: 0.9rem; font-size: 0.75rem; color: #38bdf8; font-weight: 600; }

/* Laser visual */
.laser-card-preview { text-align: center; }
.interactive-btn-demo {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid #38bdf8;
  color: #fff;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
}
.sub-uv { font-size: 0.7rem; color: #38bdf8; font-weight: normal; }

/* Multi-screen visual */
.screen-mini-cockpit {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}
.mini-screen {
  padding: 0.6rem 0.5rem;
  border-radius: 6px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
}
.mini-screen.active {
  border-color: #38bdf8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
}
.mini-screen small { font-size: 0.65rem; color: #94a3b8; font-weight: normal; }
.multi-status { margin-top: 0.8rem; font-size: 0.75rem; color: #10b981; font-weight: 600; }

/* Keyboard visual */
.focused-input-demo {
  background: #1e293b;
  border: 1px solid #38bdf8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #f8fafc;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
  margin-bottom: 0.75rem;
}
.cursor-blink { animation: blink 1s infinite; color: #38bdf8; font-weight: bold; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.keyboard-grid-mini { display: flex; flex-direction: column; gap: 0.25rem; }
.key-row { display: flex; gap: 0.25rem; }
.k { background: #334155; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
.auto-focus-tag { margin-top: 0.75rem; font-size: 0.72rem; color: #38bdf8; font-weight: 600; }

.mockup-footer {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0.75rem;
  background: #0c1220;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-pill {
  font-size: 0.72rem;
  color: #94a3b8;
}
.stat-pill strong { color: #f8fafc; }

/* Slider Selector Tabs */
.slider-selector-bar {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.selector-pill {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 0.35rem;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  color: #94a3b8;
  overflow: hidden;
  transition: all 0.25s ease;
}

.selector-pill:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(56, 189, 248, 0.4);
  color: #f8fafc;
}

.selector-pill.active {
  background: rgba(30, 41, 59, 0.95);
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 4px 16px rgba(56, 189, 248, 0.2);
}

.pill-icon {
  font-size: 1.2rem;
}

.pill-title {
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.pill-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  transition: width 0.05s linear;
}

@media (max-width: 900px) {
  .slide-body-grid {
    grid-template-columns: 1fr;
  }
  .slider-selector-bar {
    grid-template-columns: repeat(3, 1fr);
  }
  .slide-headline {
    font-size: 1.75rem;
  }
}

@media (max-width: 600px) {
  .slider-selector-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<template>
  <div class="marketing-sections-container">
    
    <!-- ========================================================================= -->
    <!-- SECTION 1: LIVE PERFORMANCE STATS COUNTER GRID                            -->
    <!-- ========================================================================= -->
    <section class="section-block">
      <div class="section-header text-center">
        <span class="section-pill">⚡ HARDWARE OPTIMIZED</span>
        <h2 class="section-title">Engineered for Snapdragon XR2 Silicon</h2>
        <p class="section-subtitle">Real-world benchmarks measured live on Meta Quest 3 standalone headsets.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon-wrap cyan">⚡</div>
          <div class="stat-number">0.4<span class="unit">ms</span></div>
          <div class="stat-label">Render Latency</div>
          <div class="stat-desc">NDK direct memory pixel streaming directly into Unreal RHI GPU textures.</div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon-wrap green">🎬</div>
          <div class="stat-number">60<span class="unit">FPS</span></div>
          <div class="stat-label">Hardware Video Sync</div>
          <div class="stat-desc">1080p YouTube, Twitch & HTML5 video decoded on Snapdragon VPU chip.</div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon-wrap purple">🪶</div>
          <div class="stat-number">24<span class="unit">KB</span></div>
          <div class="stat-label">Ultra-Lean Footprint</div>
          <div class="stat-desc">Zero 250MB CEF/GeckoView bloat. Reuses Meta Quest OS Chromium.</div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon-wrap amber">🔒</div>
          <div class="stat-number">0<span class="unit">Perms</span></div>
          <div class="stat-label">Horizon Store Pass</div>
          <div class="stat-desc">Requires zero dangerous runtime permissions. 100% submission ready.</div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 2: HEAD-TO-HEAD COMPARISON MATRIX                                  -->
    <!-- ========================================================================= -->
    <section class="section-block">
      <div class="section-header text-center">
        <span class="section-pill">🥊 HEAD-TO-HEAD MATRIX</span>
        <h2 class="section-title">Why VR Developers Choose Quest 3D WebView</h2>
        <p class="section-subtitle">See how we stack up against standard Unreal UMG WebBrowser and heavy CEF plugins.</p>
      </div>

      <div class="comparison-table-wrapper glass-card">
        <table class="comp-table">
          <thead>
            <tr>
              <th class="feature-col">Feature / Capability</th>
              <th class="winner-col">
                <div class="col-header-badge">
                  <span class="crown">👑</span> Quest 3D WebView
                </div>
              </th>
              <th>Standard UMG WebBrowser</th>
              <th>Third-Party CEF Plugins</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in comparisonData" :key="idx" :class="{ highlight: row.isHighlight }">
              <td class="feature-title">
                <strong>{{ row.title }}</strong>
                <div class="feature-desc">{{ row.desc }}</div>
              </td>
              <td class="winner-cell">
                <span class="badge-win">{{ row.ourValue }}</span>
              </td>
              <td class="standard-cell">{{ row.umgValue }}</td>
              <td class="standard-cell">{{ row.cefValue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 3: INTERACTIVE BLUEPRINT PLAYGROUND                                -->
    <!-- ========================================================================= -->
    <section class="section-block">
      <div class="section-header text-center">
        <span class="section-pill">🎮 INTERACTIVE PLAYGROUND</span>
        <h2 class="section-title">40+ Blueprint Nodes. 1-Click Integration.</h2>
        <p class="section-subtitle">Click between common VR workflows to see how clean and concise your Blueprints will be.</p>
      </div>

      <div class="playground-wrapper glass-card">
        <!-- Tab Selectors -->
        <div class="playground-tabs">
          <button
            v-for="(tab, index) in playgroundTabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === index }"
            @click="activeTab = index"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.title }}</span>
          </button>
        </div>

        <!-- Tab Content Area -->
        <div class="playground-content-grid">
          <!-- Code / Blueprint View -->
          <div class="code-view-col">
            <div class="code-header">
              <span class="file-name">{{ currentTab.fileName }}</span>
              <span class="lang-tag">{{ currentTab.lang }}</span>
            </div>
            <pre class="code-block"><code>{{ currentTab.code }}</code></pre>
          </div>

          <!-- Interactive Visual Output Preview -->
          <div class="preview-col">
            <div class="preview-title">Live VR Result Preview</div>
            <div class="preview-viewport" :class="currentTab.previewTheme">
              <div class="viewport-badge">{{ currentTab.previewBadge }}</div>
              <div class="viewport-body" v-html="currentTab.previewHtml"></div>
              <div class="viewport-footer">
                <span>⚡ TargetFPS: {{ currentTab.fps }}</span>
                <span>Latency: {{ currentTab.latency }}</span>
              </div>
            </div>
            <div class="preview-explainer">{{ currentTab.explainer }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 4: INDUSTRY USE CASES                                             -->
    <!-- ========================================================================= -->
    <section class="section-block">
      <div class="section-header text-center">
        <span class="section-pill">🚀 VERSATILITY</span>
        <h2 class="section-title">Built For Every VR Use Case</h2>
        <p class="section-subtitle">From immersive game worlds to enterprise XR simulation cockpits.</p>
      </div>

      <div class="usecase-grid">
        <div class="usecase-card glass-card">
          <div class="usecase-icon">🎬</div>
          <h3 class="usecase-title">In-Game VR Cinemas & Arcades</h3>
          <p class="usecase-desc">Stream live YouTube 4K videos, Twitch gaming channels, and WebGL mini-games on giant virtual IMAX screens inside your VR games.</p>
          <div class="usecase-tags">
            <span>YouTube 1080p60</span>
            <span>Curved Cylinders</span>
            <span>Spatial Audio</span>
          </div>
        </div>

        <div class="usecase-card glass-card">
          <div class="usecase-icon">💼</div>
          <h3 class="usecase-title">Multi-Monitor Virtual Workspaces</h3>
          <p class="usecase-desc">Create your own Virtual Desktop or Immersed-style productivity hub. Run ChatGPT, Slack, Trello, and Google Docs on separate 3D screens.</p>
          <div class="usecase-tags">
            <span>Multi-Instance</span>
            <span>3D Virtual Keyboard</span>
            <span>TargetFPS 30</span>
          </div>
        </div>

        <div class="usecase-card glass-card">
          <div class="usecase-icon">🏥</div>
          <h3 class="usecase-title">Enterprise XR & Training Simulators</h3>
          <p class="usecase-desc">Display real-time medical patient telemetry, flight manuals, PDF guides, and web dashboards directly inside industrial digital twins.</p>
          <div class="usecase-tags">
            <span>Bi-Directional JS</span>
            <span>Live Telemetry</span>
            <span>0% Crash Rate</span>
          </div>
        </div>

        <div class="usecase-card glass-card">
          <div class="usecase-icon">🏎️</div>
          <h3 class="usecase-title">3D Web Product Configurators</h3>
          <p class="usecase-desc">Embed live e-commerce websites and real-time car/house customizers directly into architectural and automotive Unreal experiences.</p>
          <div class="usecase-tags">
            <span>JSON Sync</span>
            <span>W3C Hover</span>
            <span>Dynamic Materials</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 5: INTERACTIVE FAQ ACCORDION                                      -->
    <!-- ========================================================================= -->
    <section class="section-block">
      <div class="section-header text-center">
        <span class="section-pill">❓ COMMON QUESTIONS</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know about licensing, platform support, and capabilities.</p>
      </div>

      <div class="faq-accordion-wrap">
        <div
          v-for="(faq, fIndex) in faqList"
          :key="fIndex"
          class="faq-item glass-card"
          :class="{ open: openFaqIndex === fIndex }"
          @click="toggleFaq(fIndex)"
        >
          <div class="faq-question">
            <span>{{ faq.q }}</span>
            <span class="faq-chevron">{{ openFaqIndex === fIndex ? '−' : '+' }}</span>
          </div>
          <div v-if="openFaqIndex === fIndex" class="faq-answer">
            <p>{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 6: HIGH-CONVERTING BOTTOM CALL-TO-ACTION BANNER                   -->
    <!-- ========================================================================= -->
    <section class="cta-banner-section">
      <div class="cta-banner-card glass-card">
        <div class="cta-glow"></div>
        <div class="cta-content">
          <span class="cta-pill">⚡ INSTANT ACCESS</span>
          <h2 class="cta-title">Ready to Supercharge Your Meta Quest VR Project?</h2>
          <p class="cta-desc">Get the complete 1080p60 hardware video pipeline, 40+ Blueprint nodes, and full documentation today.</p>
          
          <div class="cta-button-group">
            <a href="/quest3dwebview-docs/getting-started/quick-start" class="cta-primary-btn">
              <span>Get Started in 5 Minutes</span>
              <span class="btn-arrow">→</span>
            </a>
            <a href="/quest3dwebview-docs/api-reference/blueprint-functions" class="cta-secondary-btn">
              <span>Explore 40+ Blueprint Nodes</span>
            </a>
          </div>

          <div class="cta-trust-row">
            <span>✓ Lifetime Updates</span>
            <span>✓ Unreal Engine 5.5 Compatible</span>
            <span>✓ Meta Horizon Store Ready</span>
            <span>✓ Dedicated Support</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}

const comparisonData = [
  {
    title: '1080p60 Hardware Web Video',
    desc: 'Hardware-decoded YouTube, Twitch, and HTML5 video streaming on 3D meshes.',
    ourValue: '✅ 60 FPS (Zero Black Screens)',
    umgValue: '❌ Black Screen Bug (Vulkan)',
    cefValue: '⚠️ Heavy Frame Drops',
    isHighlight: true
  },
  {
    title: 'Plugin APK Size & Bloat',
    desc: 'Impact on your packaged APK download size.',
    ourValue: '✅ 0.02 MB (24 Kilobytes)',
    umgValue: '0 MB (Built-in)',
    cefValue: '❌ +250 MB Extra Bloat',
    isHighlight: true
  },
  {
    title: 'Multi-Instance Workspaces',
    desc: 'Run ChatGPT, YouTube, and Trello simultaneously on separate 3D screens.',
    ourValue: '✅ Multi-Screen Isolated',
    umgValue: '❌ Mutex Collisions & Crashes',
    cefValue: '⚠️ Massive RAM Exhaustion',
    isHighlight: true
  },
  {
    title: 'W3C VR Laser Hover & Pointing',
    desc: 'Support for web dropdown menus, tooltips, and hover states via VR line traces.',
    ourValue: '✅ Full W3C Pointer Events',
    umgValue: '❌ Tap Only (No Hover)',
    cefValue: '⚠️ Partial Support',
    isHighlight: false
  },
  {
    title: 'Android Permissions Required',
    desc: 'Runtime permissions needed from the user in VR.',
    ourValue: '✅ 0 Permissions Needed',
    umgValue: '0 Permissions',
    cefValue: '❌ Requires Storage/Network Perms',
    isHighlight: false
  },
  {
    title: 'Setup & Integration Speed',
    desc: 'Time required to place and render your first 3D web screen.',
    ourValue: '✅ Under 5 Minutes',
    umgValue: '10+ Complex UMG Steps',
    cefValue: 'Weeks of Custom C++/NDK',
    isHighlight: false
  }
]

const playgroundTabs = [
  {
    id: 'laser',
    icon: '🎯',
    title: 'VR Laser Click',
    fileName: 'VRPawn.uasset (Blueprint)',
    lang: 'Blueprint',
    code: `// On Controller Trigger Pressed:
LineTraceByChannel(ControllerForward, 500cm)
  -> HitResult.FindCollisionUV()
  -> TargetWebView.ClickUV(HitUV);`,
    previewTheme: 'laser-preview',
    previewBadge: 'ClickUV Executed',
    previewHtml: '<div class="preview-btn-mock"><span>Button Clicked!</span><small>UV: (0.52, 0.78)</small></div>',
    fps: '60 Hz',
    latency: '0.01 ms',
    explainer: 'Extracts exact UV coordinates from VR controller line trace and dispatches instant clicks.'
  },
  {
    id: 'video',
    icon: '🎬',
    title: '1080p Video',
    fileName: 'BP_CinemaScreen.uasset',
    lang: 'Blueprint',
    code: `// Control HTML5 Video Playback:
TargetWebView.PlayMedia();
TargetWebView.SetMediaVolume(0.85);
TargetWebView.SetTargetFPS(60.0);`,
    previewTheme: 'video-preview',
    previewBadge: 'MediaCodec Hardware Active',
    previewHtml: '<div class="preview-video-mock"><div class="badge-yt">YouTube 1080p60</div><div class="vol-bar">Volume: 85%</div></div>',
    fps: '60 Hz',
    latency: '0.40 ms',
    explainer: 'Direct Snapdragon VPU hardware decoding with zero CPU overhead.'
  },
  {
    id: 'bridge',
    icon: '🔄',
    title: 'Two-Way JS Bridge',
    fileName: 'WebBridge.uasset',
    lang: 'JavaScript ↔ Blueprint',
    code: `// Unreal -> Web DOM:
TargetWebView.ExecuteJavaScript("updateScore(1500);");

// Web DOM -> Unreal:
window.quest3d.postMessage(JSON.stringify({ item: "Shield" }));`,
    previewTheme: 'bridge-preview',
    previewBadge: 'Bidirectional JSON Sync',
    previewHtml: '<div class="preview-bridge-mock"><code>{ item: "Shield", price: 100 }</code></div>',
    fps: 'Event-Driven',
    latency: '< 0.1 ms',
    explainer: 'Seamless JSON exchange between Unreal Engine gameplay and web application DOM.'
  },
  {
    id: 'keyboard',
    icon: '⌨️',
    title: '3D Virtual Keyboard',
    fileName: 'WBP_Keyboard.uasset',
    lang: 'Blueprint',
    code: `// Listen for user clicking any web input field:
OnTextInputFocusChanged(WebView, bFocused) -> {
    VirtualKeyboardWidget.SetVisibility(bFocused ? Visible : Collapsed);
};`,
    previewTheme: 'keyboard-preview',
    previewBadge: 'Focus Detected',
    previewHtml: '<div class="preview-keyboard-mock"><input placeholder="Search in VR..." readonly /></div>',
    fps: 'Instant',
    latency: '0.00 ms',
    explainer: 'Automatically summons your 3D VR keyboard whenever web inputs gain focus.'
  },
  {
    id: 'mute',
    icon: '🔇',
    title: 'One-Click Audio Mute',
    fileName: 'DetailsPanel.ini',
    lang: 'Details Panel / BP',
    code: `// Details Panel Checkbox or Blueprint Node:
TargetWebView.SetMediaMuted(true);
bool bIsMuted = TargetWebView.IsMediaMuted();`,
    previewTheme: 'mute-preview',
    previewBadge: 'Audio Muted',
    previewHtml: '<div class="preview-mute-mock"><span>🔇 Audio Muted Automatically</span></div>',
    fps: 'Static',
    latency: '0.00 ms',
    explainer: 'Mutes background video walls and ambient screens automatically on page load.'
  }
]

const currentTab = computed(() => playgroundTabs[activeTab.value])

const faqList = [
  {
    q: 'Does Quest 3D WebView work on Quest 2, Quest 3, Quest 3S, and Quest Pro?',
    a: 'Yes! Quest 3D WebView is 100% compatible with all Meta Quest standalone headsets running Android / Meta Horizon OS. It takes full advantage of the Snapdragon XR2 Gen 2 chip on Quest 3/3S for effortless 1080p60 video.'
  },
  {
    q: 'Why does standard UMG WebBrowser show black screens on YouTube?',
    a: 'Standard UMG WebBrowser uses software canvas drawing which cannot capture Android hardware video overlay surfaces. Quest 3D WebView creates an isolated hardware VirtualDisplay backed by an ImageReader, capturing hardware video directly at 60 FPS.'
  },
  {
    q: 'How many simultaneous web screens can I run in my VR level?',
    a: 'You can run 2–3 active 1080p60 video screens (YouTube, Twitch) simultaneously, or 1 active video screen plus 5–8 productivity panels (ChatGPT, Trello, Discord, Docs) without dropping below 72 FPS in VR.'
  },
  {
    q: 'Does this plugin require any dangerous Android runtime permissions?',
    a: 'Zero! The plugin uses standard internet access without requiring camera, microphone, or external storage permissions, ensuring smooth automated pass through Meta Horizon Store review.'
  },
  {
    q: 'Can I load local offline HTML/CSS/JS files without internet?',
    a: 'Yes! You can load offline files using file:/// URLs or data: URIs, making it perfect for offline training simulators, museum kiosks, and standalone VR installations.'
  }
]
</script>

<style scoped>
.marketing-sections-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

.section-block {
  margin: 4.5rem 0;
}

.section-header {
  margin-bottom: 2.5rem;
}

.text-center {
  text-align: center;
}

.section-pill {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  margin-bottom: 0.8rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #f8fafc;
  line-height: 1.25;
  margin-bottom: 0.6rem;
  border-top: none !important;
}

.section-subtitle {
  font-size: 1.05rem;
  color: #94a3b8;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.5;
}

.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.stat-card {
  padding: 1.75rem 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
}

.stat-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  margin: 0 auto 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.stat-icon-wrap.cyan { background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; }
.stat-icon-wrap.green { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }
.stat-icon-wrap.purple { background: rgba(129, 140, 248, 0.15); border: 1px solid #818cf8; }
.stat-icon-wrap.amber { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; }

.stat-number {
  font-size: 2.4rem;
  font-weight: 900;
  color: #f8fafc;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.stat-number .unit {
  font-size: 1.1rem;
  color: #38bdf8;
  margin-left: 0.15rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.stat-desc {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.45;
}

/* Comparison Table */
.comparison-table-wrapper {
  overflow-x: auto;
  padding: 1rem;
}

.comp-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.comp-table th {
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 800;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.comp-table th.winner-col {
  color: #38bdf8;
}

.col-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(56, 189, 248, 0.15);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #38bdf8;
}

.comp-table td {
  padding: 1.1rem 1rem;
  font-size: 0.88rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-title strong {
  color: #f8fafc;
  font-size: 0.95rem;
}

.feature-desc {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.winner-cell {
  background: rgba(56, 189, 248, 0.04);
  font-weight: 700;
}

.badge-win {
  color: #10b981;
  font-weight: 800;
}

.standard-cell {
  color: #cbd5e1;
}

/* Playground */
.playground-wrapper {
  padding: 1.5rem;
}

.playground-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
}

.tab-btn.active {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  color: #38bdf8;
}

.playground-content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.5rem;
  align-items: center;
}

.code-view-col {
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.9rem;
  background: #0f172a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.78rem;
  color: #94a3b8;
}

.lang-tag {
  color: #38bdf8;
  font-weight: 700;
}

.code-block {
  padding: 1.1rem;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0;
}

.preview-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.preview-viewport {
  background: radial-gradient(circle at center, #1e293b 0%, #0b0f19 100%);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 14px;
  padding: 1.5rem 1rem;
  text-align: center;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.viewport-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  align-self: center;
}

.viewport-body {
  margin: 1rem 0;
}

.preview-btn-mock {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background: #38bdf8;
  color: #04121e;
  font-weight: 800;
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
}

.preview-video-mock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.badge-yt { background: #ef4444; color: #fff; padding: 0.3rem 0.7rem; border-radius: 6px; font-weight: 800; font-size: 0.8rem; }
.vol-bar { font-size: 0.75rem; color: #38bdf8; }

.preview-bridge-mock {
  background: #0f172a;
  border: 1px solid #818cf8;
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.78rem;
  color: #818cf8;
}

.preview-keyboard-mock input {
  background: #0f172a;
  border: 1px solid #38bdf8;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  color: #f8fafc;
  font-size: 0.8rem;
  outline: none;
}

.preview-mute-mock span {
  font-size: 0.85rem;
  color: #f59e0b;
  font-weight: 700;
}

.viewport-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #64748b;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.5rem;
}

.preview-explainer {
  font-size: 0.82rem;
  color: #cbd5e1;
  line-height: 1.45;
}

/* Use Cases */
.usecase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.usecase-card {
  padding: 1.75rem;
  position: relative;
}

.usecase-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
}

.usecase-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.usecase-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  border-top: none !important;
}

.usecase-desc {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.55;
  margin-bottom: 1.25rem;
}

.usecase-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.usecase-tags span {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
}

/* FAQ */
.faq-accordion-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 850px;
  margin: 0 auto;
}

.faq-item {
  padding: 1.25rem 1.5rem;
  cursor: pointer;
}

.faq-item.open {
  border-color: rgba(56, 189, 248, 0.4);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
  color: #f8fafc;
}

.faq-chevron {
  font-size: 1.3rem;
  color: #38bdf8;
  font-weight: 800;
}

.faq-answer {
  margin-top: 0.85rem;
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.6;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.85rem;
}

/* Bottom CTA Banner */
.cta-banner-section {
  margin: 5rem 0 2rem 0;
}

.cta-banner-card {
  position: relative;
  padding: 3.5rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
  border: 1px solid rgba(56, 189, 248, 0.35);
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: -50%;
  left: 30%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 750px;
  margin: 0 auto;
}

.cta-pill {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 800;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  margin-bottom: 1rem;
}

.cta-title {
  font-size: 2.3rem;
  font-weight: 900;
  color: #f8fafc;
  line-height: 1.25;
  margin-bottom: 0.8rem;
  border-top: none !important;
}

.cta-desc {
  font-size: 1.05rem;
  color: #cbd5e1;
  line-height: 1.55;
  margin-bottom: 2rem;
}

.cta-button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.cta-primary-btn {
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
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.5);
  transition: all 0.25s ease;
}

.cta-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(56, 189, 248, 0.7);
}

.cta-secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.cta-secondary-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(56, 189, 248, 0.4);
}

.cta-trust-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: 0.82rem;
  font-weight: 600;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .playground-content-grid {
    grid-template-columns: 1fr;
  }
  .usecase-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 1.75rem;
  }
  .cta-title {
    font-size: 1.75rem;
  }
}
</style>

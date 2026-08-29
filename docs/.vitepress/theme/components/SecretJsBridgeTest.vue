<template>
  <div class="bridge-test-container">
    
    <!-- Top Secret Header Banner -->
    <div class="test-header glass-card">
      <div class="header-badge-row">
        <span class="secret-tag">🔐 SECRET DEVELOPER TESTBED</span>
        <span class="bridge-status-pill" :class="isBridgeAvailable ? 'connected' : 'simulated'">
          <span class="status-dot"></span>
          {{ isBridgeAvailable ? '🟢 Native Quest 3D Bridge Active' : '🟡 Standalone Browser (Simulated Mode)' }}
        </span>
      </div>

      <h1 class="test-title">Bidirectional JavaScript Bridge Tester</h1>
      <p class="test-desc">
        Use this interactive laboratory inside your Meta Quest headset (or desktop browser) to test real-time two-way messaging between Unreal Engine 5.5 Blueprints and the WebKit DOM.
      </p>

      <div class="url-copy-box">
        <span class="url-label">Direct URL for BP InitializeWithURL:</span>
        <code class="url-code">{{ testbedUrl }}</code>
        <button class="copy-url-btn" @click="copyUrl">
          {{ copied ? '✅ Copied!' : '📋 Copy URL' }}
        </button>
      </div>
    </div>

    <!-- Main Grid: Outgoing (Web -> UE) & Incoming (UE -> Web) -->
    <div class="test-grid">
      
      <!-- Panel 1: Send Message to Unreal Engine (Web -> Unreal) -->
      <div class="test-panel glass-card">
        <div class="panel-header">
          <div class="p-icon-wrap cyan">📤</div>
          <div>
            <h2 class="panel-title">1. Web ➔ Unreal Engine</h2>
            <p class="panel-subtitle">Calls <code class="inline-code">window.quest3d.postMessage()</code></p>
          </div>
        </div>

        <!-- Custom Message Input -->
        <div class="input-group">
          <label class="input-label">Custom Payload (String or JSON):</label>
          <div class="input-row">
            <input
              v-model="customMessage"
              type="text"
              class="test-input"
              placeholder='e.g. {"event":"buy_item","id":42}'
              @keyup.enter="sendCustomMessage"
            />
            <button class="send-btn primary" @click="sendCustomMessage">
              <span>Send ➔</span>
            </button>
          </div>
        </div>

        <!-- Quick Event Presets -->
        <div class="preset-section">
          <span class="preset-label">Quick Action Presets:</span>
          <div class="preset-btn-grid">
            <button class="preset-btn" @click="sendPreset('player_ready', { status: 'ready', ping: 12 })">
              <span>🎮 Player Ready</span>
            </button>
            <button class="preset-btn" @click="sendPreset('purchase_item', { item: 'Laser_Rifle', cost: 250 })">
              <span>🛒 Buy Laser Rifle</span>
            </button>
            <button class="preset-btn" @click="sendPreset('spawn_actor', { class: 'BP_Companion', x: 120, y: 340 })">
              <span>🤖 Spawn Actor</span>
            </button>
            <button class="preset-btn" @click="sendPreset('change_level', { map: 'VR_Showroom_Night' })">
              <span>🌌 Change Level</span>
            </button>
          </div>
        </div>

        <!-- Outgoing Console Log -->
        <div class="log-section">
          <div class="log-header">
            <span>Sent Messages History ({{ outgoingLogs.length }})</span>
            <button class="clear-log-btn" @click="outgoingLogs = []">Clear</button>
          </div>
          <div class="log-terminal">
            <div v-if="outgoingLogs.length === 0" class="log-empty">
              No outgoing messages sent yet. Click any button above!
            </div>
            <div v-for="(log, i) in outgoingLogs" :key="i" class="log-entry outgoing">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-arrow">➔</span>
              <span class="log-msg">{{ log.payload }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Panel 2: Receive from Unreal Engine (Unreal -> Web) -->
      <div class="test-panel glass-card">
        <div class="panel-header">
          <div class="p-icon-wrap green">📥</div>
          <div>
            <h2 class="panel-title">2. Unreal Engine ➔ Web</h2>
            <p class="panel-subtitle">Executed via <code class="inline-code">ExecuteJavaScript()</code></p>
          </div>
        </div>

        <!-- Live Status Display Cards from Unreal -->
        <div class="state-dashboard">
          <div class="state-card">
            <span class="state-label">Player Health</span>
            <div class="health-bar-wrap">
              <div class="health-fill" :style="{ width: playerHealth + '%' }"></div>
            </div>
            <span class="state-val">{{ playerHealth }} / 100 HP</span>
          </div>

          <div class="state-card">
            <span class="state-label">Gold Coins</span>
            <span class="state-val gold">🪙 {{ playerCoins }}</span>
          </div>

          <div class="state-card">
            <span class="state-label">Current Map</span>
            <span class="state-val cyan">🗺️ {{ currentMap }}</span>
          </div>
        </div>

        <!-- Simulate Unreal Incoming Call Locally -->
        <div class="simulate-ue-box">
          <span class="sim-label">Simulate Unreal Trigger (Tests JavaScript Handlers):</span>
          <div class="sim-btn-row">
            <button class="sim-btn" @click="simulateUnrealCommand('health', -20)">💥 Damage -20 HP</button>
            <button class="sim-btn" @click="simulateUnrealCommand('health', 25)">💚 Heal +25 HP</button>
            <button class="sim-btn" @click="simulateUnrealCommand('coins', 100)">🪙 +100 Coins</button>
            <button class="sim-btn" @click="simulateUnrealCommand('map', 'Cyber_Matrix_VR')">🌌 Set Map</button>
          </div>
        </div>

        <!-- Incoming Console Log -->
        <div class="log-section">
          <div class="log-header">
            <span>Incoming Unreal Messages ({{ incomingLogs.length }})</span>
            <button class="clear-log-btn" @click="incomingLogs = []">Clear</button>
          </div>
          <div class="log-terminal incoming-term">
            <div v-if="incomingLogs.length === 0" class="log-empty">
              Waiting for Unreal Engine call via <code class="inline-code">window.receiveFromUnreal(data)</code>...
            </div>
            <div v-for="(log, i) in incomingLogs" :key="i" class="log-entry incoming">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-arrow">⬅</span>
              <span class="log-msg">{{ log.payload }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Panel 3: Virtual Keyboard Focus Test -->
    <div class="keyboard-test-section glass-card">
      <div class="panel-header">
        <div class="p-icon-wrap purple">⌨️</div>
        <div>
          <h2 class="panel-title">3. Virtual Keyboard Focus Test</h2>
          <p class="panel-subtitle">Tests DOM <code class="inline-code">focusin</code> & <code class="inline-code">focusout</code> for Quest 3D Keyboard auto-summoning</p>
        </div>
      </div>

      <div class="kb-inputs-grid">
        <div class="kb-field">
          <label>Player Name Input:</label>
          <input
            type="text"
            placeholder="Click to test focus..."
            class="test-input"
            @focus="onInputFocus('Player Name')"
            @blur="onInputBlur('Player Name')"
          />
        </div>

        <div class="kb-field">
          <label>Chat / Message Input:</label>
          <input
            type="text"
            placeholder="Type in VR keyboard..."
            class="test-input"
            @focus="onInputFocus('Chat Message')"
            @blur="onInputBlur('Chat Message')"
          />
        </div>

        <div class="kb-status-box" :class="{ focused: isFieldFocused }">
          <span class="kb-status-label">Keyboard Focus State:</span>
          <strong>{{ focusStatusText }}</strong>
        </div>
      </div>
    </div>

    <!-- Blueprint Quick Guide Snippets -->
    <div class="bp-code-guide glass-card">
      <div class="panel-header">
        <div class="p-icon-wrap amber">📘</div>
        <div>
          <h2 class="panel-title">Blueprint Integration Reference</h2>
          <p class="panel-subtitle">Copy-paste logic for Unreal Engine 5.5</p>
        </div>
      </div>

      <div class="bp-tabs-code">
        <div class="code-block-box">
          <div class="code-title">Unreal Engine Blueprint (Sending to Web):</div>
          <pre class="code-pre"><code>[ QuestWebViewComponent ] ──► [ Execute JavaScript ]
                                 └── Script: "window.receiveFromUnreal(JSON.stringify({ event: 'damage', amount: 20 }));"</code></pre>
        </div>

        <div class="code-block-box">
          <div class="code-title">Unreal Engine Blueprint (Receiving from Web):</div>
          <pre class="code-pre"><code>[ QuestWebViewComponent ] ──► ( Event OnJavaScriptMessage )
                                       │
                                       ▼ (Message: String)
                                 [ Parse JSON String ] ──► [ Switch on Event ]</code></pre>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testbedUrl = ref('https://ateequesolangi.github.io/quest3dwebview-docs/secret/js-bridge-test')
const isBridgeAvailable = ref(false)
const customMessage = ref('{"event":"test_ping","timestamp":' + Date.now() + '}')
const copied = ref(false)

const playerHealth = ref(100)
const playerCoins = ref(450)
const currentMap = ref('VR_Lobby_Main')

const isFieldFocused = ref(false)
const focusStatusText = ref('No Input Focused (Keyboard Hidden)')

const outgoingLogs = ref([])
const incomingLogs = ref([])

function getTimeString() {
  const d = new Date()
  return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0')
}

function copyUrl() {
  navigator.clipboard.writeText(testbedUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2500)
}

function sendToUnreal(msgString) {
  outgoingLogs.value.unshift({
    time: getTimeString(),
    payload: msgString
  })

  // 1. Official Quest 3D WebView Bridge API
  if (typeof window !== 'undefined' && window.quest3d && typeof window.quest3d.postMessage === 'function') {
    window.quest3d.postMessage(msgString)
  }
  // 2. Android Bridge Fallback
  else if (typeof window !== 'undefined' && window.Android && typeof window.Android.postMessage === 'function') {
    window.Android.postMessage(msgString)
  } else {
    console.log('[Bridge Testbed] Dispatched to Unreal (Simulated):', msgString)
  }
}

function sendCustomMessage() {
  if (!customMessage.value.trim()) return
  sendToUnreal(customMessage.value)
}

function sendPreset(eventName, data) {
  const payload = JSON.stringify({
    event: eventName,
    ...data,
    sentAt: Date.now()
  })
  sendToUnreal(payload)
}

function onReceiveFromUnreal(rawMessage) {
  incomingLogs.value.unshift({
    time: getTimeString(),
    payload: typeof rawMessage === 'object' ? JSON.stringify(rawMessage) : String(rawMessage)
  })

  try {
    const data = typeof rawMessage === 'object' ? rawMessage : JSON.parse(rawMessage)
    if (data.event === 'damage' || data.event === 'heal' || data.event === 'health') {
      playerHealth.value = Math.max(0, Math.min(100, playerHealth.value + (data.amount || data.value || 0)))
    } else if (data.event === 'coins' || data.event === 'gold') {
      playerCoins.value += (data.amount || data.value || 0)
    } else if (data.event === 'map' || data.event === 'level') {
      currentMap.value = data.map || data.name || 'Unknown_Map'
    }
  } catch (e) {
    // Non-JSON plain string
  }
}

function simulateUnrealCommand(type, val) {
  if (type === 'health') {
    onReceiveFromUnreal({ event: val < 0 ? 'damage' : 'heal', amount: val })
  } else if (type === 'coins') {
    onReceiveFromUnreal({ event: 'coins', amount: val })
  } else if (type === 'map') {
    onReceiveFromUnreal({ event: 'map', map: val })
  }
}

function onInputFocus(fieldName) {
  isFieldFocused.value = true
  focusStatusText.value = `Focused: "${fieldName}" (Keyboard Summoned ⌨️)`
  sendPreset('input_focused', { field: fieldName })
}

function onInputBlur(fieldName) {
  isFieldFocused.value = false
  focusStatusText.value = 'No Input Focused (Keyboard Dismissed)'
  sendPreset('input_blurred', { field: fieldName })
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    testbedUrl.value = window.location.href

    // Check if native bridge exists
    isBridgeAvailable.value = !!(window.quest3d && window.quest3d.postMessage) || !!(window.Android && window.Android.postMessage)

    // Expose global receiver for Unreal's ExecuteJavaScript
    window.receiveFromUnreal = onReceiveFromUnreal
    window.setPlayerHealth = (hp) => onReceiveFromUnreal({ event: 'health', amount: hp - playerHealth.value })
    window.addLog = (msg) => onReceiveFromUnreal({ event: 'log', message: msg })

    // Auto welcome message in incoming terminal
    incomingLogs.value.push({
      time: getTimeString(),
      payload: 'Bridge Testbed Initialized & Ready for ExecuteJavaScript()'
    })
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    delete window.receiveFromUnreal
    delete window.setPlayerHealth
    delete window.addLog
  }
})
</script>

<style scoped>
.bridge-test-container {
  max-width: 1140px;
  margin: 2rem auto 4rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.glass-card {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.75rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

/* Header */
.test-header {
  border-color: rgba(56, 189, 248, 0.35);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(2, 132, 199, 0.15));
}

.header-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.secret-tag {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  letter-spacing: 0.06em;
}

.bridge-status-pill {
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.bridge-status-pill.connected { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; }
.bridge-status-pill.simulated { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #f59e0b; }

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
}

.test-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.6rem;
  border-top: none !important;
}

.test-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.url-copy-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #090d16;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.6rem 1rem;
  border-radius: 10px;
  flex-wrap: wrap;
}

.url-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
}

.url-code {
  font-family: monospace;
  font-size: 0.85rem;
  color: #38bdf8;
  flex: 1;
  word-break: break-all;
}

.copy-url-btn {
  background: #0284c7;
  color: #fff;
  border: none;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;
}
.copy-url-btn:hover { background: #0369a1; }

/* Main 2-Column Grid */
.test-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.p-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}
.p-icon-wrap.cyan { background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; }
.p-icon-wrap.green { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; }
.p-icon-wrap.purple { background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; }
.p-icon-wrap.amber { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; }

.panel-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
  border-top: none !important;
}

.panel-subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.inline-code {
  background: rgba(255, 255, 255, 0.08);
  color: #0284c7;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-family: monospace;
}

/* Inputs & Buttons */
.input-group {
  margin-bottom: 1.25rem;
}

.input-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 0.45rem;
}

.input-row {
  display: flex;
  gap: 0.5rem;
}

.test-input {
  flex: 1;
  padding: 0.65rem 0.95rem;
  border-radius: 10px;
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f8fafc;
  font-size: 0.88rem;
  outline: none;
  font-family: monospace;
}
.test-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
}

.send-btn {
  padding: 0.65rem 1.15rem;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.send-btn.primary {
  background: linear-gradient(135deg, #0284c7, #38bdf8);
  color: #04121e;
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
}
.send-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(56, 189, 248, 0.6);
}

/* Presets */
.preset-section {
  margin-bottom: 1.5rem;
}

.preset-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.preset-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--vp-c-text-1);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}
.preset-btn:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  color: #38bdf8;
}

/* Terminal Log */
.log-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.74rem;
  font-weight: 800;
  color: #94a3b8;
}

.clear-log-btn {
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.72rem;
  cursor: pointer;
}
.clear-log-btn:hover { color: #ef4444; }

.log-terminal {
  background: #060911;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  height: 150px;
  overflow-y: auto;
  padding: 0.65rem 0.85rem;
  font-family: monospace;
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.log-empty {
  color: #475569;
  text-align: center;
  margin: auto 0;
  font-style: italic;
}

.log-entry {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
}
.log-time { color: #64748b; flex-shrink: 0; font-size: 0.7rem; }
.log-arrow { color: #38bdf8; font-weight: bold; flex-shrink: 0; }
.log-entry.incoming .log-arrow { color: #10b981; }
.log-msg { color: #e2e8f0; word-break: break-all; }

/* Dashboard Cards */
.state-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  margin-bottom: 1.25rem;
}

.state-card {
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.75rem 0.65rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
}

.state-label { font-size: 0.72rem; color: #94a3b8; font-weight: 700; }
.state-val { font-size: 0.92rem; font-weight: 900; color: #f8fafc; }
.state-val.gold { color: #f59e0b; }
.state-val.cyan { color: #38bdf8; font-size: 0.8rem; }

.health-bar-wrap {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}
.health-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #10b981);
  transition: width 0.3s ease;
}

.simulate-ue-box {
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.85rem;
  border-radius: 10px;
}

.sim-label {
  display: block;
  font-size: 0.74rem;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}

.sim-btn-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
}

.sim-btn {
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}
.sim-btn:hover { background: #38bdf8; color: #04121e; }

/* Keyboard Section */
.kb-inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 1rem;
  align-items: flex-end;
}

.kb-field label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.kb-status-box {
  padding: 0.75rem 1rem;
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: #94a3b8;
  transition: all 0.3s ease;
}
.kb-status-box.focused {
  border-color: #a855f7;
  background: rgba(168, 85, 247, 0.15);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}
.kb-status-box strong { color: #f8fafc; }

/* Blueprint Code */
.bp-tabs-code {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-block-box {
  background: #060911;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1rem;
}

.code-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}

.code-pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
  font-size: 0.78rem;
  color: #e2e8f0;
  line-height: 1.5;
  overflow-x: auto;
}

/* Light Theme Overrides */
html:not(.dark) .glass-card {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;
}

html:not(.dark) .test-header {
  background: linear-gradient(135deg, #ffffff, #e0f2fe) !important;
  border-color: #0284c7 !important;
}

html:not(.dark) .url-copy-box {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
}

html:not(.dark) .test-input {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
}

html:not(.dark) .preset-btn {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  color: #334155 !important;
}

html:not(.dark) .preset-btn:hover {
  background: #e0f2fe !important;
  border-color: #0284c7 !important;
  color: #0284c7 !important;
}

html:not(.dark) .state-card {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

html:not(.dark) .state-val { color: #0f172a !important; }

@media (max-width: 900px) {
  .test-grid, .kb-inputs-grid, .bp-tabs-code {
    grid-template-columns: 1fr;
  }
}
</style>

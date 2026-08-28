<template>
  <div class="bp-guide-wrapper">
    <!-- Header Section -->
    <div class="bp-guide-header">
      <div class="header-badge">✦ COMPLETE BLUEPRINT INTERACTIVE GUIDE</div>
      <h1 class="header-title">All 40+ Blueprint Nodes & Interactive Simulator</h1>
      <p class="header-desc">
        Explore every Blueprint node available in <strong>Quest 3D WebView</strong>. Filter by category, search by node name, and click <strong>Simulate Node</strong> to see live animated execution in VR!
      </p>

      <!-- Search & Filter Controls -->
      <div class="controls-bar glass-card">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search nodes (e.g. ClickUV, GoBack, SetMediaMuted, ExecuteJavaScript...)"
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
        </div>

        <div class="category-pills">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="cat-pill"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectedCategory = cat.id"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
            <span class="count-badge">{{ getCategoryCount(cat.id) }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Filter Summary -->
    <div class="results-meta">
      <span>Showing <strong>{{ filteredNodes.length }}</strong> of <strong>{{ allNodes.length }}</strong> Nodes</span>
      <span v-if="selectedCategory !== 'all' || searchQuery" class="filter-tag">
        Filtered • <a href="javascript:void(0)" @click="resetFilters">Reset Filters</a>
      </span>
    </div>

    <!-- Interactive Nodes Grid -->
    <div class="nodes-grid">
      <div
        v-for="node in filteredNodes"
        :key="node.name"
        class="node-card glass-card"
        :class="{ active: activeSimulatedNode === node.name }"
      >
        <!-- Node Top Header -->
        <div class="node-header">
          <div class="node-type-badge" :class="node.typeClass">
            {{ node.type }}
          </div>
          <div class="node-cat-tag">
            <span>{{ node.categoryIcon }}</span>
            <span>{{ node.category }}</span>
          </div>
        </div>

        <!-- Node Blueprint Visual Simulation Box -->
        <div class="bp-node-visual">
          <div class="bp-node-titlebar" :class="node.titlebarClass">
            <span class="bp-fn-icon">ƒ</span>
            <span class="bp-node-name">{{ node.name }}</span>
          </div>
          <div class="bp-node-body">
            <!-- Left Pins (Inputs) -->
            <div class="bp-pins-col inputs">
              <div v-if="node.type !== 'Pure'" class="pin exec-pin in">
                <span class="pin-icon exec">▶</span>
                <span class="pin-name">Exec</span>
              </div>
              <div class="pin target-pin">
                <span class="pin-icon obj">●</span>
                <span class="pin-name">Target (Self)</span>
              </div>
              <div v-for="param in node.inputs" :key="param.name" class="pin param-pin in">
                <span class="pin-icon" :class="param.typeClass">●</span>
                <span class="pin-name">{{ param.name }}</span>
                <span class="param-type-sub">({{ param.type }})</span>
              </div>
            </div>

            <!-- Right Pins (Outputs) -->
            <div class="bp-pins-col outputs">
              <div v-if="node.type !== 'Pure'" class="pin exec-pin out">
                <span class="pin-name">Then</span>
                <span class="pin-icon exec">▶</span>
              </div>
              <div v-for="out in node.outputs" :key="out.name" class="pin param-pin out">
                <span class="pin-name">{{ out.name }}</span>
                <span class="pin-icon" :class="out.typeClass">●</span>
                <span class="param-type-sub">({{ out.type }})</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Node Description -->
        <p class="node-desc">{{ node.description }}</p>

        <!-- Code Snippet -->
        <div class="node-code-snippet">
          <div class="code-header">
            <span>Blueprint Syntax</span>
            <button class="copy-btn" @click="copyCode(node.code, node.name)">
              {{ copiedNode === node.name ? 'Copied! ✓' : 'Copy' }}
            </button>
          </div>
          <pre><code>{{ node.code }}</code></pre>
        </div>

        <!-- Live Interactive Simulation Drawer -->
        <div class="sim-section">
          <button
            class="sim-trigger-btn"
            :class="{ active: activeSimulatedNode === node.name }"
            @click="toggleSim(node.name)"
          >
            <span>{{ activeSimulatedNode === node.name ? '⏹ Close Simulator' : '▶ Simulate Node in VR' }}</span>
          </button>

          <div v-if="activeSimulatedNode === node.name" class="sim-viewport">
            <div class="sim-header">
              <span>VR Headset Live Simulation</span>
              <span class="sim-badge">{{ node.simBadge }}</span>
            </div>
            <div class="sim-screen" v-html="node.simHtml"></div>
            <div class="sim-log">{{ node.simLog }}</div>
          </div>
        </div>

        <!-- Tip / Notes Footer -->
        <div v-if="node.tip" class="node-tip">
          <strong>Tip:</strong> {{ node.tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const activeSimulatedNode = ref(null)
const copiedNode = ref(null)

const categories = [
  { id: 'all', name: 'All Nodes', icon: '🌐' },
  { id: 'nav', name: 'Navigation & Lifecycle', icon: '🧭' },
  { id: 'input', name: 'VR Laser & Touch', icon: '🎯' },
  { id: 'keyboard', name: 'Keyboard & Text', icon: '⌨️' },
  { id: 'media', name: 'Media & Audio', icon: '🎬' },
  { id: 'js', name: 'JavaScript Bridge', icon: '🔄' },
  { id: 'perf', name: 'Performance & Materials', icon: '⚡' },
  { id: 'events', name: 'Events & Delegates', icon: '⚡' }
]

function getCategoryCount(catId) {
  if (catId === 'all') return allNodes.length
  return allNodes.filter(n => n.categoryKey === catId).length
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

function toggleSim(nodeName) {
  activeSimulatedNode.value = activeSimulatedNode.value === nodeName ? null : nodeName
}

function copyCode(code, name) {
  navigator.clipboard.writeText(code)
  copiedNode.value = name
  setTimeout(() => { copiedNode.value = null }, 2000)
}

const allNodes = [
  // NAVIGATION & LIFECYCLE
  {
    name: 'LoadURL',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Url', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Navigates the WebView to any HTTP/HTTPS webpage, local file:/// URI, or data: string.',
    code: `TargetWebView->LoadURL(TEXT("https://www.youtube.com"));`,
    simBadge: 'Navigation Dispatched',
    simHtml: '<div class="sim-box nav-sim"><div class="sim-url-bar">https://www.youtube.com</div><div class="sim-load-bar animated"></div></div>',
    simLog: '[VR_LOG] Navigating to https://www.youtube.com -> Page Loading (100%)',
    tip: 'If the WebView has not been initialized yet, LoadURL automatically initializes it and navigates in one step.'
  },
  {
    name: 'InitializeWithURL',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'InURL', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Sets custom InitialURL and initializes the Android hardware display pipeline in a single step at runtime.',
    code: `TargetWebView->InitializeWithURL(TEXT("https://chatgpt.com"));`,
    simBadge: 'Hardware Init + Nav',
    simHtml: '<div class="sim-box init-sim"><span>⚡ Hardware VirtualDisplay Created</span><small>URL: https://chatgpt.com</small></div>',
    simLog: '[VR_LOG] Hardware VirtualDisplay allocated -> InitialURL bound',
    tip: 'Ideal when bInitializeOnBeginPlay is unchecked and you want to load dynamic URLs from save data.'
  },
  {
    name: 'GoBack',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Navigates backward in browser history. Fully supports Single-Page Applications (YouTube, React) via HTML5 history fallback.',
    code: `TargetWebView->GoBack();`,
    simBadge: 'History Backward',
    simHtml: '<div class="sim-box back-sim"><span>◀ Navigating Back</span><small>Page Title: YouTube Cinema</small></div>',
    simLog: '[VR_LOG] Dispatched GoBack -> History popState executed',
    tip: 'Crash-guarded and thread-safe. Will never crash on GameThread execution.'
  },
  {
    name: 'GoForward',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Navigates forward in browser history with automatic single-page app support.',
    code: `TargetWebView->GoForward();`,
    simBadge: 'History Forward',
    simHtml: '<div class="sim-box fwd-sim"><span>▶ Navigating Forward</span><small>Page Title: Video Player</small></div>',
    simLog: '[VR_LOG] Dispatched GoForward -> Forward navigation complete'
  },
  {
    name: 'Reload',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Refreshes the active webpage and resets dirty frame flags for a clean reload.',
    code: `TargetWebView->Reload();`,
    simBadge: 'Page Reloading',
    simHtml: '<div class="sim-box reload-sim"><span class="spin-icon">🔄</span> Reloading DOM & CSS...</div>',
    simLog: '[VR_LOG] Reload called -> DOM and styles refreshed at 70+ FPS'
  },
  {
    name: 'StopLoading',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Halts any active network request, resource download, or frame parsing.',
    code: `TargetWebView->StopLoading();`,
    simBadge: 'Transfer Halted',
    simHtml: '<div class="sim-box stop-sim"><span>⏹ Page Load Cancelled</span></div>',
    simLog: '[VR_LOG] StopLoading executed -> Ongoing network transfer halted'
  },
  {
    name: 'CanGoBack',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'Boolean', typeClass: 't-bool' }],
    description: 'Returns True if backward history exists. Thread-safe atomic read on GameThread (0 crash risk).',
    code: `bool bCanBack = TargetWebView->CanGoBack();`,
    simBadge: 'Atomic State Check',
    simHtml: '<div class="sim-box bool-sim"><span class="val-true">TRUE (History: 3 entries)</span></div>',
    simLog: '[VR_LOG] CanGoBack() -> true (Atomic read: 0.001 ms)'
  },
  {
    name: 'CanGoForward',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'Boolean', typeClass: 't-bool' }],
    description: 'Returns True if forward history exists. Thread-safe atomic read on GameThread.',
    code: `bool bCanFwd = TargetWebView->CanGoForward();`,
    simBadge: 'Atomic State Check',
    simHtml: '<div class="sim-box bool-sim"><span class="val-false">FALSE (At Top of Stack)</span></div>',
    simLog: '[VR_LOG] CanGoForward() -> false (Atomic read: 0.001 ms)'
  },
  {
    name: 'GetInstanceName',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'String', typeClass: 't-str' }],
    description: 'Returns the user-defined label of this WebView instance (e.g. "YouTube Cinema", "ChatGPT Workspace").',
    code: `FString Name = TargetWebView->GetInstanceName();`,
    simBadge: 'Instance Label',
    simHtml: '<div class="sim-box name-sim"><strong>"YouTube Cinema"</strong></div>',
    simLog: '[VR_LOG] GetInstanceName() -> "YouTube Cinema"'
  },
  {
    name: 'GetInstanceId',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'Integer', typeClass: 't-int' }],
    description: 'Returns the numeric internal instance ID used for multi-screen isolation.',
    code: `int32 Id = TargetWebView->GetInstanceId();`,
    simBadge: 'Runtime ID',
    simHtml: '<div class="sim-box id-sim"><span>InstanceId = 2</span></div>',
    simLog: '[VR_LOG] GetInstanceId() -> 2 (Unique VirtualDisplay Slot)'
  },

  // VR LASER & TOUCH INPUT
  {
    name: 'ClickUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UV', type: 'Vector2D', typeClass: 't-vec' }],
    outputs: [],
    description: 'Performs a synthetic tap (Down then Up) at normalized [0,1] UV coordinates from a VR controller line trace.',
    code: `// From HitResult.FindCollisionUV():
TargetWebView->ClickUV(HitUV);`,
    simBadge: 'VR Laser Click',
    simHtml: '<div class="sim-box click-sim"><div class="laser-dot"></div><span>Button Triggered! (UV: 0.50, 0.50)</span></div>',
    simLog: '[VR_LOG] ClickUV(0.5, 0.5) -> TouchDown + TouchUp dispatched'
  },
  {
    name: 'SendHoverEventUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [
      { name: 'Action', type: 'EQuestWebViewTouchAction', typeClass: 't-enum' },
      { name: 'UV', type: 'Vector2D', typeClass: 't-vec' }
    ],
    outputs: [],
    description: 'Dispatches W3C compliant hover and mousemove events to the webpage (opens dropdown menus, tooltips, CSS hovers).',
    code: `TargetWebView->SendHoverEventUV(EQuestWebViewTouchAction::Move, HitUV);`,
    simBadge: 'W3C Pointer Hover',
    simHtml: '<div class="sim-box hover-sim"><div class="hover-btn active">Menu Opened on Hover</div></div>',
    simLog: '[VR_LOG] SendHoverEventUV -> ACTION_HOVER_MOVE + W3C pointermove'
  },
  {
    name: 'SendTouchEventUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [
      { name: 'Action', type: 'EQuestWebViewTouchAction', typeClass: 't-enum' },
      { name: 'UV', type: 'Vector2D', typeClass: 't-vec' }
    ],
    outputs: [],
    description: 'Dispatches raw continuous touch events (Down, Move, Up, Cancel) using normalized UV coordinates.',
    code: `TargetWebView->SendTouchEventUV(EQuestWebViewTouchAction::Down, UV);`,
    simBadge: 'Touch Gesture',
    simHtml: '<div class="sim-box touch-sim"><span>Touch Action: Down (UV: 0.32, 0.81)</span></div>',
    simLog: '[VR_LOG] SendTouchEventUV(Down, 0.32, 0.81) -> Android MotionEvent'
  },
  {
    name: 'ScrollBy',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [
      { name: 'DeltaX', type: 'Integer', typeClass: 't-int' },
      { name: 'DeltaY', type: 'Integer', typeClass: 't-int' }
    ],
    outputs: [],
    description: 'Scrolls the active webpage in pixel offsets. Ideal for mapping VR thumbstick axes to smooth web scrolling.',
    code: `// Wire VR Thumbstick Y-Axis:
TargetWebView->ScrollBy(0, FMath::RoundToInt(ThumbstickY * 50.0f));`,
    simBadge: 'Thumbstick Scroll',
    simHtml: '<div class="sim-box scroll-sim"><div class="scroll-anim-bar">Scrolling DeltaY: +50px</div></div>',
    simLog: '[VR_LOG] ScrollBy(0, 50) -> Smooth web scroll dispatched'
  },
  {
    name: 'BeginDragUV / DragToUV / EndDragUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UV', type: 'Vector2D', typeClass: 't-vec' }],
    outputs: [],
    description: 'Convenience wrappers for kinetic dragging, dragging Trello cards, sliders, and Google Maps panoramas.',
    code: `TargetWebView->BeginDragUV(StartUV);
TargetWebView->DragToUV(CurrentUV);
TargetWebView->EndDragUV(ReleaseUV);`,
    simBadge: 'Drag Gesture',
    simHtml: '<div class="sim-box drag-sim"><div class="drag-item">Trello Card Dragged</div></div>',
    simLog: '[VR_LOG] Drag gesture tracked across UV space'
  },

  // KEYBOARD & TEXT
  {
    name: 'SendText',
    category: 'Keyboard & Text',
    categoryKey: 'keyboard',
    categoryIcon: '⌨️',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Text', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Inserts the provided string directly at the current cursor position in the focused HTML input field.',
    code: `TargetWebView->SendText(TEXT("Unreal Engine 5.5 VR"));`,
    simBadge: 'Text Input Injected',
    simHtml: '<div class="sim-box text-sim"><input value="Unreal Engine 5.5 VR" readonly /></div>',
    simLog: '[VR_LOG] SendText("Unreal Engine 5.5 VR") -> DOM value inserted'
  },
  {
    name: 'SendKey',
    category: 'Keyboard & Text',
    categoryKey: 'keyboard',
    categoryIcon: '⌨️',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Key', type: 'EQuestWebViewKey', typeClass: 't-enum' }],
    outputs: [],
    description: 'Dispatches virtual control keys (Backspace, Enter, Tab, Delete, Arrow Keys, Escape) to active web inputs.',
    code: `TargetWebView->SendKey(EQuestWebViewKey::Enter);`,
    simBadge: 'Key Dispatched',
    simHtml: '<div class="sim-box key-sim"><span class="k-tag">ENTER</span> ➔ Form Submitted</div>',
    simLog: '[VR_LOG] SendKey(Enter) -> KeyEvent dispatched'
  },

  // MEDIA & AUDIO
  {
    name: 'PlayMedia',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Starts or resumes playback of HTML5 <video> or <audio> elements on the active webpage.',
    code: `TargetWebView->PlayMedia();`,
    simBadge: 'HTML5 Video Playing',
    simHtml: '<div class="sim-box play-sim"><span class="status-live">▶ PLAYING 70+ FPS</span></div>',
    simLog: '[VR_LOG] PlayMedia() -> HTMLMediaElement.play() executed'
  },
  {
    name: 'PauseMedia',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Pauses active HTML5 video or audio playback.',
    code: `TargetWebView->PauseMedia();`,
    simBadge: 'Video Paused',
    simHtml: '<div class="sim-box pause-sim"><span class="status-pause">⏸ PAUSED</span></div>',
    simLog: '[VR_LOG] PauseMedia() -> HTMLMediaElement.pause() executed'
  },
  {
    name: 'TogglePlayPause',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Toggles between playing and paused states on any active video/audio element.',
    code: `TargetWebView->TogglePlayPause();`,
    simBadge: 'Toggle State',
    simHtml: '<div class="sim-box toggle-sim"><span>⏯ Toggled Video State</span></div>',
    simLog: '[VR_LOG] TogglePlayPause() executed'
  },
  {
    name: 'SetMediaVolume',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Volume', type: 'Float', typeClass: 't-flt' }],
    outputs: [],
    description: 'Sets media volume from 0.0 (Silent) to 1.0 (Full volume).',
    code: `TargetWebView->SetMediaVolume(0.75f);`,
    simBadge: 'Volume 75%',
    simHtml: '<div class="sim-box vol-sim"><div class="vol-meter"><div class="vol-fill" style="width: 75%"></div></div></div>',
    simLog: '[VR_LOG] SetMediaVolume(0.75) -> Audio level updated'
  },
  {
    name: 'SetMediaMuted',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'bInMuted', type: 'Boolean', typeClass: 't-bool' }],
    outputs: [],
    description: 'Mutes or unmutes all HTML5 media on the active webpage dynamically at runtime.',
    code: `TargetWebView->SetMediaMuted(true);`,
    simBadge: 'Mute Toggled',
    simHtml: '<div class="sim-box mute-sim"><span class="mute-txt">🔇 Audio Muted</span></div>',
    simLog: '[VR_LOG] SetMediaMuted(true) -> Media elements muted'
  },
  {
    name: 'IsMediaMuted',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'Boolean', typeClass: 't-bool' }],
    description: 'Pure getter returning whether audio is currently muted.',
    code: `bool bMuted = TargetWebView->IsMediaMuted();`,
    simBadge: 'State Query',
    simHtml: '<div class="sim-box bool-sim"><span class="val-true">bMuted = TRUE</span></div>',
    simLog: '[VR_LOG] IsMediaMuted() -> true'
  },
  {
    name: 'PlayDetectedVideoWithMediaPlayer',
    category: 'Media & Audio',
    categoryKey: 'media',
    categoryIcon: '🎬',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Player', type: 'UMediaPlayer*', typeClass: 't-obj' }],
    outputs: [{ name: 'Return Value', type: 'Boolean', typeClass: 't-bool' }],
    description: 'Routes a detected direct video container URL (.mp4, .webm) into an Unreal UMediaPlayer for custom processing.',
    code: `bool bSuccess = TargetWebView->PlayDetectedVideoWithMediaPlayer(MyMediaPlayer);`,
    simBadge: 'MediaPlayer Route',
    simHtml: '<div class="sim-box route-sim"><span>🎬 Video URL Bound to UMediaPlayer</span></div>',
    simLog: '[VR_LOG] PlayDetectedVideoWithMediaPlayer() -> true'
  },

  // JAVASCRIPT & SESSION
  {
    name: 'ExecuteJavaScript',
    category: 'JavaScript & Session',
    categoryKey: 'js',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Script', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Executes arbitrary JavaScript within the active web page DOM context.',
    code: `TargetWebView->ExecuteJavaScript(TEXT("document.body.style.filter = 'invert(1)';"));`,
    simBadge: 'JS Executed',
    simHtml: '<div class="sim-box js-sim"><code>eval("document.body.style.filter = \'invert(1)\'")</code></div>',
    simLog: '[VR_LOG] ExecuteJavaScript -> Script evaluated in DOM'
  },
  {
    name: 'ClearCache',
    category: 'JavaScript & Session',
    categoryKey: 'js',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Purges the HTTP disk and memory cache for the active WebView instance.',
    code: `TargetWebView->ClearCache();`,
    simBadge: 'Cache Purged',
    simHtml: '<div class="sim-box cache-sim"><span>🧹 HTTP Disk & RAM Cache Cleared</span></div>',
    simLog: '[VR_LOG] ClearCache() -> Temporary assets purged'
  },
  {
    name: 'ClearCookies',
    category: 'JavaScript & Session',
    categoryKey: 'js',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Clears shared Android WebView cookies, signing all active web instances out.',
    code: `TargetWebView->ClearCookies();`,
    simBadge: 'Cookies Cleared',
    simHtml: '<div class="sim-box cookie-sim"><span>🍪 All Browser Cookies Flushed</span></div>',
    simLog: '[VR_LOG] ClearCookies() -> CookieManager flushed'
  },
  {
    name: 'SetUserAgent',
    category: 'JavaScript & Session',
    categoryKey: 'js',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UserAgent', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Overrides the HTTP User-Agent string (pass empty string to restore default).',
    code: `TargetWebView->SetUserAgent(TEXT("Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."));`,
    simBadge: 'UA Spoofed',
    simHtml: '<div class="sim-box ua-sim"><span>💻 Desktop Chrome User-Agent Active</span></div>',
    simLog: '[VR_LOG] SetUserAgent() -> Desktop web layout requested'
  },

  // PERFORMANCE & MATERIALS
  {
    name: 'SetTargetFPS',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'FPS', type: 'Float', typeClass: 't-flt' }],
    outputs: [],
    description: 'Adjusts the texture update frequency cap (range 1.0 to 60.0 Hz) to save mobile GPU memory bandwidth.',
    code: `TargetWebView->SetTargetFPS(30.0f);`,
    simBadge: 'TargetFPS Clamped',
    simHtml: '<div class="sim-box fps-sim"><span class="fps-txt">30.0 Hz Clamped (50% Bandwidth Saved)</span></div>',
    simLog: '[VR_LOG] SetTargetFPS(30.0) -> Frame rate clamped'
  },
  {
    name: 'PauseRendering / ResumeRendering',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Suspends and resumes GPU texture updates while keeping the web session and audio alive in the background.',
    code: `TargetWebView->PauseRendering();
TargetWebView->ResumeRendering();`,
    simBadge: 'Render Paused',
    simHtml: '<div class="sim-box pause-render-sim"><span>0.00 ms GPU Cost (Texture Updates Suspended)</span></div>',
    simLog: '[VR_LOG] PauseRendering() -> GPU texture uploads suspended'
  },
  {
    name: 'SetMaterial',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'InMaterial', type: 'UMaterialInterface*', typeClass: 't-obj' }],
    outputs: [{ name: 'Return Value', type: 'UMaterialInstanceDynamic*', typeClass: 't-obj' }],
    description: 'Assigns a base material and creates/binds a dynamic material instance automatically.',
    code: `UMaterialInstanceDynamic* MID = TargetWebView->SetMaterial(BaseMaterial);`,
    simBadge: 'MID Bound',
    simHtml: '<div class="sim-box mat-sim"><span>🎨 Dynamic Material Bound to Mesh</span></div>',
    simLog: '[VR_LOG] SetMaterial -> Texture parameter "WebViewTexture" assigned'
  },

  // EVENTS & DELEGATES
  {
    name: 'OnTextInputFocusChanged',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '⚡',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'WebView', type: 'UQuestWebViewComponent*', typeClass: 't-obj' },
      { name: 'bFocused', type: 'Boolean', typeClass: 't-bool' }
    ],
    description: 'Fired when user clicks any web text input or textarea. Use this to show/hide 3D VR virtual keyboards.',
    code: `// Bind in Event Graph:
Event OnTextInputFocusChanged(WebView, bFocused) -> {
    KeyboardWidget.SetVisibility(bFocused ? Visible : Collapsed);
};`,
    simBadge: 'Focus Event Fired',
    simHtml: '<div class="sim-box focus-event-sim"><span>⌨️ bFocused: TRUE ➔ Summoning 3D Keyboard</span></div>',
    simLog: '[VR_LOG] OnTextInputFocusChanged broadcast (bFocused: true)'
  },
  {
    name: 'OnJavaScriptMessage',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '⚡',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [{ name: 'Message', type: 'String', typeClass: 't-str' }],
    description: 'Fired when webpage JavaScript calls window.quest3d.postMessage("...").',
    code: `Event OnJavaScriptMessage(Message) -> {
    PrintString("Received: " + Message);
};`,
    simBadge: 'JS Message Received',
    simHtml: '<div class="sim-box msg-sim"><code>{"event":"buy_item","id":42}</code></div>',
    simLog: '[VR_LOG] OnJavaScriptMessage broadcast -> JSON payload received'
  },
  {
    name: 'OnLoadCompleted',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '⚡',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'Url', type: 'String', typeClass: 't-str' },
      { name: 'Title', type: 'String', typeClass: 't-str' }
    ],
    description: 'Fired when the webpage has finished loading and the title is ready.',
    code: `Event OnLoadCompleted(Url, Title) -> {
    PageTitleWidget.SetText(Title);
};`,
    simBadge: 'Page Loaded Event',
    simHtml: '<div class="sim-box loaded-sim"><span>✓ Loaded: "YouTube Cinema"</span></div>',
    simLog: '[VR_LOG] OnLoadCompleted broadcast ("https://youtube.com", "YouTube Cinema")'
  },
  {
    name: 'OnVideoDetected',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '⚡',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'Url', type: 'String', typeClass: 't-str' },
      { name: 'bIsPlayable', type: 'Boolean', typeClass: 't-bool' },
      { name: 'UVPosition', type: 'Vector2D', typeClass: 't-vec' },
      { name: 'UVSize', type: 'Vector2D', typeClass: 't-vec' }
    ],
    description: 'Fired whenever an HTML5 <video> tag is mounted or starts streaming in the webpage.',
    code: `Event OnVideoDetected(Url, bIsPlayable, UVPosition, UVSize) -> { ... };`,
    simBadge: 'Video Tag Found',
    simHtml: '<div class="sim-box video-detect-sim"><span>🎬 Video Rect: (0, 0) Size: (1, 1)</span></div>',
    simLog: '[VR_LOG] OnVideoDetected broadcast -> Video rect bounds mapped'
  }
]

const filteredNodes = computed(() => {
  return allNodes.filter(node => {
    const matchesCategory = selectedCategory.value === 'all' || node.categoryKey === selectedCategory.value
    const matchesSearch = !searchQuery.value ||
      node.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      node.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<style scoped>
.bp-guide-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 1rem 0 3rem 0;
  padding: 0;
  box-sizing: border-box;
}

.bp-guide-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 800;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  margin-bottom: 0.8rem;
}

.header-title {
  font-size: 2.1rem;
  font-weight: 900;
  color: #f8fafc;
  line-height: 1.25;
  margin-bottom: 0.8rem;
  border-top: none !important;
}

.header-desc {
  font-size: 1rem;
  color: #94a3b8;
  max-width: 720px;
  margin: 0 auto 1.5rem auto;
  line-height: 1.55;
}

.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

/* Controls Bar */
.controls-bar {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 0.85rem 2.8rem;
  border-radius: 12px;
  background: #090d16;
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #f8fafc;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.3);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.1rem;
  cursor: pointer;
}

.category-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
}

.cat-pill.active {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  color: #38bdf8;
}

.count-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  font-size: 0.72rem;
}

.results-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  font-size: 0.88rem;
  color: #94a3b8;
}

.results-meta strong {
  color: #f8fafc;
}

.filter-tag a {
  color: #38bdf8;
  text-decoration: none;
  font-weight: 700;
}

/* Nodes Grid */
.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.node-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
}

.node-card:hover {
  border-color: rgba(56, 189, 248, 0.35);
  transform: translateY(-2px);
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.node-type-badge {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  text-transform: uppercase;
}
.node-type-badge.callable { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
.node-type-badge.pure { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); }
.node-type-badge.event { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); }

.node-cat-tag {
  font-size: 0.78rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

/* Blueprint Node Visual */
.bp-node-visual {
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.bp-node-titlebar {
  padding: 0.45rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.85rem;
  color: #f8fafc;
}
.tb-blue { background: linear-gradient(90deg, #0284c7, #0369a1); }
.tb-green { background: linear-gradient(90deg, #059669, #047857); }
.tb-red { background: linear-gradient(90deg, #dc2626, #b91c1c); }

.bp-fn-icon {
  font-family: serif;
  font-size: 1rem;
  font-weight: bold;
}

.bp-node-body {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  gap: 1rem;
}

.bp-pins-col {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.bp-pins-col.outputs {
  align-items: flex-end;
}

.pin {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #e2e8f0;
}

.pin-icon { font-size: 0.65rem; }
.pin-icon.exec { color: #fff; }
.pin-icon.obj { color: #38bdf8; }
.pin-icon.t-str { color: #f43f5e; }
.pin-icon.t-bool { color: #dc2626; }
.pin-icon.t-int { color: #10b981; }
.pin-icon.t-flt { color: #a855f7; }
.pin-icon.t-vec { color: #f59e0b; }
.pin-icon.t-enum { color: #0284c7; }

.param-type-sub {
  font-size: 0.65rem;
  color: #64748b;
}

.node-desc {
  font-size: 0.88rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Code Snippet */
.node-code-snippet {
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.6rem;
  background: #0f172a;
  font-size: 0.72rem;
  color: #94a3b8;
}

.copy-btn {
  background: none;
  border: none;
  color: #38bdf8;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.node-code-snippet pre {
  margin: 0;
  padding: 0.6rem;
  font-size: 0.78rem;
  font-family: monospace;
  color: #e2e8f0;
  overflow-x: auto;
}

/* Sim Section */
.sim-section {
  margin-top: auto;
}

.sim-trigger-btn {
  width: 100%;
  padding: 0.55rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sim-trigger-btn:hover {
  background: rgba(56, 189, 248, 0.25);
}

.sim-trigger-btn.active {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #ef4444;
}

.sim-viewport {
  margin-top: 0.75rem;
  background: #0b0f19;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 10px;
  padding: 0.75rem;
}

.sim-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.sim-badge {
  color: #10b981;
  font-weight: 700;
}

.sim-screen {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.75rem;
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
}

.sim-log {
  margin-top: 0.5rem;
  font-family: monospace;
  font-size: 0.7rem;
  color: #38bdf8;
}

.node-tip {
  margin-top: 0.75rem;
  font-size: 0.78rem;
  color: #94a3b8;
  border-left: 2px solid #38bdf8;
  padding-left: 0.5rem;
}

@media (max-width: 900px) {
  .nodes-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="bp-guide-wrapper">
    <!-- Header Section -->
    <div class="bp-guide-header">
      <div class="header-badge">✦ COMPLETE BLUEPRINT API REFERENCE</div>
      <h1 class="header-title">All 40+ Blueprint Nodes & Visual Guide</h1>
      <p class="header-desc">
        Explore every Blueprint node available in <strong>Quest 3D WebView</strong>. Filter by category, search by node name, and inspect visual Unreal Engine pin signatures and syntax snippets.
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

        <!-- Node Blueprint Visual Pin Diagram -->
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
            <span>Blueprint / C++ Syntax</span>
            <button class="copy-btn" @click="copyCode(node.code, node.name)">
              {{ copiedNode === node.name ? 'Copied! ✓' : 'Copy' }}
            </button>
          </div>
          <pre><code>{{ node.code }}</code></pre>
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
const copiedNode = ref(null)

const categories = [
  { id: 'all', name: 'All Nodes', icon: '🌐' },
  { id: 'nav', name: 'Navigation & Lifecycle', icon: '🧭' },
  { id: 'input', name: 'VR Laser & Touch', icon: '🎯' },
  { id: 'keyboard', name: 'Keyboard & Text', icon: '⌨️' },
  { id: 'media', name: 'Media & Audio', icon: '🎬' },
  { id: 'bridge', name: 'JavaScript Bridge', icon: '🔄' },
  { id: 'perf', name: 'Performance & Materials', icon: '⚡' },
  { id: 'events', name: 'Events & Delegates', icon: '🔔' }
]

function getCategoryCount(catId) {
  if (catId === 'all') return allNodes.length
  return allNodes.filter(n => n.categoryKey === catId).length
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

function copyCode(code, name) {
  navigator.clipboard.writeText(code)
  copiedNode.value = name
  setTimeout(() => {
    if (copiedNode.value === name) copiedNode.value = null
  }, 2000)
}

const allNodes = [
  // NAVIGATION & LIFECYCLE
  {
    name: 'InitializeWebView',
    category: 'Navigation & Lifecycle',
    categoryKey: 'nav',
    categoryIcon: '🧭',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Initializes the hardware Android VirtualDisplay rendering pipeline and loads the configured InitialURL.',
    code: `TargetWebView->InitializeWebView();`,
    tip: 'Call once in BeginPlay after placing actor in level.'
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
    description: 'Sets a custom startup URL and initializes the Android WebView pipeline in a single step.',
    code: `TargetWebView->InitializeWithURL(TEXT("https://youtube.com"));`
  },
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
    description: 'Navigates the active WebView instance to the specified web address.',
    code: `TargetWebView->LoadURL(TEXT("https://chatgpt.com"));`
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
    description: 'Navigates backward in browser history. Features automatic HTML5 SPA fallback for React/Next/YouTube.',
    code: `TargetWebView->GoBack();`
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
    description: 'Navigates forward in browser history. Features automatic HTML5 SPA fallback.',
    code: `TargetWebView->GoForward();`
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
    description: 'Refreshes the active webpage content.',
    code: `TargetWebView->Reload();`
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
    description: 'Cancels any ongoing HTTP page load request.',
    code: `TargetWebView->StopLoading();`
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
    description: 'Pure getter returning true if backward browser history exists. Thread-safe.',
    code: `bool bCanBack = TargetWebView->CanGoBack();`
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
    description: 'Pure getter returning true if forward browser history exists. Thread-safe.',
    code: `bool bCanFwd = TargetWebView->CanGoForward();`
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
    description: 'Returns the user-friendly instance label (e.g. "Main Display").',
    code: `FString Name = TargetWebView->GetInstanceName();`
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
    description: 'Performs a synthetic click/tap at normalized UV coordinates (0.0 to 1.0) obtained from VR raycasts.',
    code: `TargetWebView->ClickUV(FVector2D(0.5f, 0.5f));`,
    tip: 'Obtain UV from FindCollisionUV node on HitResult.'
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
      { name: 'Action', type: 'EQuestHoverAction', typeClass: 't-enum' },
      { name: 'UV', type: 'Vector2D', typeClass: 't-vec' }
    ],
    outputs: [],
    description: 'Dispatches W3C pointer move, enter, and exit events for CSS hover effects and cursor styling.',
    code: `TargetWebView->SendHoverEventUV(EQuestHoverAction::Move, HitUV);`
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
      { name: 'Action', type: 'EQuestTouchAction', typeClass: 't-enum' },
      { name: 'UV', type: 'Vector2D', typeClass: 't-vec' }
    ],
    outputs: [],
    description: 'Dispatches raw Android touch events (Down, Move, Up, Cancel) using normalized UV coordinates.',
    code: `TargetWebView->SendTouchEventUV(EQuestTouchAction::Down, HitUV);`
  },
  {
    name: 'BeginDragUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UV', type: 'Vector2D', typeClass: 't-vec' }],
    outputs: [],
    description: 'Initiates a continuous touch drag gesture at the specified UV coordinate.',
    code: `TargetWebView->BeginDragUV(HitUV);`
  },
  {
    name: 'DragToUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UV', type: 'Vector2D', typeClass: 't-vec' }],
    outputs: [],
    description: 'Updates an ongoing touch drag position to the new UV coordinates.',
    code: `TargetWebView->DragToUV(CurrentHitUV);`
  },
  {
    name: 'EndDragUV',
    category: 'VR Laser & Touch',
    categoryKey: 'input',
    categoryIcon: '🎯',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'UV', type: 'Vector2D', typeClass: 't-vec' }],
    outputs: [],
    description: 'Releases an ongoing touch drag gesture with velocity calculation.',
    code: `TargetWebView->EndDragUV(ReleaseUV);`
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
      { name: 'DeltaX', type: 'Float', typeClass: 't-flt' },
      { name: 'DeltaY', type: 'Float', typeClass: 't-flt' }
    ],
    outputs: [],
    description: 'Scrolls the active webpage content smoothly in pixel offsets (ideal for thumbstick scrolling).',
    code: `TargetWebView->ScrollBy(0.0f, ThumbstickY * 50.0f);`
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
    description: 'Inserts a string of text directly into the currently focused web input field or textarea.',
    code: `TargetWebView->SendText(TEXT("Hello VR World"));`
  },
  {
    name: 'SendKey',
    category: 'Keyboard & Text',
    categoryKey: 'keyboard',
    categoryIcon: '⌨️',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Key', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Dispatches special navigation keystrokes ("Backspace", "Enter", "Tab", "Delete", "ArrowLeft", etc.).',
    code: `TargetWebView->SendKey(TEXT("Backspace"));`
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
    description: 'Starts or resumes HTML5 video and audio playback on the active webpage.',
    code: `TargetWebView->PlayMedia();`
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
    code: `TargetWebView->PauseMedia();`
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
    code: `TargetWebView->TogglePlayPause();`
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
    code: `TargetWebView->SetMediaVolume(0.75f);`
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
    code: `TargetWebView->SetMediaMuted(true);`
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
    code: `bool bMuted = TargetWebView->IsMediaMuted();`
  },

  // JAVASCRIPT BRIDGE
  {
    name: 'ExecuteJavaScript',
    category: 'JavaScript Bridge',
    categoryKey: 'bridge',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [{ name: 'Script', type: 'String', typeClass: 't-str' }],
    outputs: [],
    description: 'Runs arbitrary JavaScript in the active DOM context with sub-millisecond execution.',
    code: `TargetWebView->ExecuteJavaScript(TEXT("document.title = 'Updated from UE5';"));`
  },
  {
    name: 'ClearCache',
    category: 'JavaScript Bridge',
    categoryKey: 'bridge',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Purges HTTP disk cache and temporary assets for this instance.',
    code: `TargetWebView->ClearCache();`
  },
  {
    name: 'ClearCookies',
    category: 'JavaScript Bridge',
    categoryKey: 'bridge',
    categoryIcon: '🔄',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Clears shared Android WebView session cookies.',
    code: `TargetWebView->ClearCookies();`
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
    description: 'Dynamically caps frame rate (15.0 to 70.0+ FPS) for this specific instance to conserve battery/GPU.',
    code: `TargetWebView->SetTargetFPS(30.0f);`
  },
  {
    name: 'PauseRendering',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Suspends GPU texture updates while keeping the web session and audio alive in the background.',
    code: `TargetWebView->PauseRendering();`
  },
  {
    name: 'ResumeRendering',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Callable',
    typeClass: 'callable',
    titlebarClass: 'tb-blue',
    inputs: [],
    outputs: [],
    description: 'Resumes GPU texture updates after being paused.',
    code: `TargetWebView->ResumeRendering();`
  },
  {
    name: 'IsRenderingPaused',
    category: 'Performance & Materials',
    categoryKey: 'perf',
    categoryIcon: '⚡',
    type: 'Pure',
    typeClass: 'pure',
    titlebarClass: 'tb-green',
    inputs: [],
    outputs: [{ name: 'Return Value', type: 'Boolean', typeClass: 't-bool' }],
    description: 'Pure getter returning true if texture updates are currently paused.',
    code: `bool bPaused = TargetWebView->IsRenderingPaused();`
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
    code: `UMaterialInstanceDynamic* MID = TargetWebView->SetMaterial(BaseMaterial);`
  },

  // EVENTS & DELEGATES
  {
    name: 'OnTextInputFocusChanged',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '🔔',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'WebView', type: 'UQuestWebViewComponent*', typeClass: 't-obj' },
      { name: 'bFocused', type: 'Boolean', typeClass: 't-bool' }
    ],
    description: 'Fired when user clicks any web text input or textarea. Use this to show/hide 3D VR virtual keyboards.',
    code: `Event OnTextInputFocusChanged(WebView, bFocused) -> {
    KeyboardWidget.SetVisibility(bFocused ? Visible : Collapsed);
};`
  },
  {
    name: 'OnJavaScriptMessage',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '🔔',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [{ name: 'Message', type: 'String', typeClass: 't-str' }],
    description: 'Fired when webpage JavaScript calls window.quest3d.postMessage("...").',
    code: `Event OnJavaScriptMessage(Message) -> {
    PrintString("Received: " + Message);
};`
  },
  {
    name: 'OnLoadCompleted',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '🔔',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'Url', type: 'String', typeClass: 't-str' },
      { name: 'bSuccess', type: 'Boolean', typeClass: 't-bool' }
    ],
    description: 'Fired when the webpage finishes loading HTML, CSS, and DOM assets completely.',
    code: `Event OnLoadCompleted(Url, bSuccess) -> { ... };`
  },
  {
    name: 'OnLoadError',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '🔔',
    type: 'Event Delegate',
    typeClass: 'event',
    titlebarClass: 'tb-red',
    inputs: [],
    outputs: [
      { name: 'ErrorCode', type: 'Integer', typeClass: 't-int' },
      { name: 'Description', type: 'String', typeClass: 't-str' },
      { name: 'FailingUrl', type: 'String', typeClass: 't-str' }
    ],
    description: 'Fired when a network error or HTTP failure occurs during page navigation.',
    code: `Event OnLoadError(ErrorCode, Description, FailingUrl) -> { ... };`
  },
  {
    name: 'OnVideoDetected',
    category: 'Events & Delegates',
    categoryKey: 'events',
    categoryIcon: '🔔',
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
    code: `Event OnVideoDetected(Url, bIsPlayable, UVPosition, UVSize) -> { ... };`
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
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.85rem;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.bp-node-titlebar.tb-blue { background: linear-gradient(90deg, #0284c7, #0369a1); }
.bp-node-titlebar.tb-green { background: linear-gradient(90deg, #059669, #047857); }
.bp-node-titlebar.tb-red { background: linear-gradient(90deg, #dc2626, #b91c1c); }

.bp-fn-icon {
  font-style: italic;
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
  margin-top: auto;
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

# Blueprint Functions Reference (40+ Nodes)

Complete alphabetical reference of all `UFUNCTION` nodes provided by `UQuestWebViewComponent`.

---

## Lifecycle & Initialization
* **`InitializeWebView()`** — Initializes the Android hardware display pipeline with configured `InitialURL`.
* **`InitializeWithURL(InURL)`** — Sets custom URL and initializes pipeline in a single step.
* **`SetInitialURL(InURL)`** — Updates the startup URL property before initialization.
* **`SetInstanceName(InName)`** — Updates the user-friendly label for this instance.
* **`GetInstanceName()`** *(Pure)* — Returns the user-friendly instance label.
* **`GetInstanceId()`** *(Pure)* — Returns the runtime numeric instance ID.

---

## Navigation & Browser State
* **`LoadURL(Url)`** — Navigates to the specified URL.
* **`GoBack()`** — Navigates backward in history (supports single-page apps).
* **`GoForward()`** — Navigates forward in history (supports single-page apps).
* **`Reload()`** — Refreshes the active webpage.
* **`StopLoading()`** — Cancels ongoing page load.
* **`CanGoBack()`** *(Pure)* — Returns true if backward history exists.
* **`CanGoForward()`** *(Pure)* — Returns true if forward history exists.

---

## VR & Touch Input
* **`ClickUV(UV)`** — Performs a synthetic tap/click at normalized UV coordinates.
* **`SendHoverEventUV(Action, UV)`** — Sends W3C pointer move/enter/exit events using UV coordinates.
* **`SendTouchEventUV(Action, UV)`** — Sends continuous touch down/move/up events using UV coordinates.
* **`BeginDragUV(UV)`** — Initiates a touch drag gesture at the specified UV coordinate.
* **`DragToUV(UV)`** — Moves an ongoing drag gesture to the specified UV coordinate.
* **`EndDragUV(UV)`** — Releases an ongoing drag gesture at the specified UV coordinate.
* **`ScrollBy(DeltaX, DeltaY)`** — Scrolls the active webpage in pixel offsets (ideal for thumbstick scrolling).
* **`SendHoverEvent(Action, PixelX, PixelY)`** — Pixel-space hover dispatcher.
* **`SendTouchEvent(Action, PixelX, PixelY)`** — Pixel-space touch dispatcher.

---

## Virtual Keyboard & Text
* **`SendText(Text)`** — Inserts characters at the currently focused web input.
* **`SendKey(Key)`** — Dispatches navigation keys (`Backspace`, `Enter`, `Tab`, `Delete`, arrow keys).

---

## Media & Audio Controls
* **`PlayMedia()`** — Starts/resumes HTML5 video or audio playback.
* **`PauseMedia()`** — Pauses HTML5 video or audio playback.
* **`TogglePlayPause()`** — Toggles HTML5 video or audio playback state.
* **`SetMediaVolume(Volume)`** — Sets audio volume (`0.0` to `1.0`).
* **`SetMediaMuted(bInMuted)`** — Mutes or unmutes HTML5 audio.
* **`IsMediaMuted()`** *(Pure)* — Returns true if media audio is currently muted.
* **`PlayDetectedVideoWithMediaPlayer(Player)`** — Routes detected direct video container to `UMediaPlayer`.
* **`TryStart3DSpatialAudio()`** — Attempts to route direct media audio to spatial audio component.
* **`SetUse3DSpatialAudio(bEnable)`** — Enables/disables direct spatial audio path at runtime.

---

## JavaScript & Session
* **`ExecuteJavaScript(Script)`** — Runs arbitrary JavaScript in the active webpage DOM.
* **`ClearCache()`** — Purges HTTP disk cache for this instance.
* **`ClearCookies()`** — Clears shared Android WebView cookies.
* **`SetUserAgent(UserAgent)`** — Overrides the browser HTTP User-Agent header.

---

## Performance & Materials
* **`SetTargetFPS(FPS)`** — Adjusts the frame rate cap (`1.0` to `60.0` Hz).
* **`PauseRendering()`** — Suspends GPU texture updates while keeping web session alive.
* **`ResumeRendering()`** — Resumes GPU texture updates.
* **`IsRenderingPaused()`** *(Pure)* — Returns true if rendering is currently suspended.
* **`SetMaterial(InMaterial)`** — Assigns a base material and creates a dynamic material instance.
* **`SetMaterialInstance(MaterialInstance)`** — Binds an existing dynamic material instance.

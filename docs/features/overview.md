# Features Overview

**Quest 3D WebView** provides an end-to-end web browser engine for Unreal Engine 5 on Meta Quest, organized into 11 dedicated functional systems.

---

## 🧭 Feature Matrix

| Feature Area | Description | Primary Blueprint Nodes |
| :--- | :--- | :--- |
| **Hardware Video Pipeline** | 1080p60 YouTube/HTML5 video rendering on 3D meshes | `SetMaterial`, `SetMaterialInstance`, `SetTargetFPS` |
| **Multi-Instance Isolation** | Isolated instances with individual ID allocation | `InstanceName`, `GetInstanceName`, `GetInstanceId` |
| **VR Laser & W3C Hover** | Direct UV raycasting with W3C pointer events | `ClickUV`, `SendHoverEventUV`, `SendTouchEventUV` |
| **Gestures & Scrolling** | Kinetic touch dragging and thumbstick scrolling | `BeginDragUV`, `DragToUV`, `EndDragUV`, `ScrollBy` |
| **Browser Navigation** | Crash-proof back/forward/reload with SPA support | `GoBack`, `GoForward`, `Reload`, `CanGoBack`, `CanGoForward` |
| **Virtual Keyboard Bridge** | Automatic DOM focus detection for 3D keyboards | `OnTextInputFocusChanged`, `SendText`, `SendKey` |
| **Media Playback Controls** | Control video/audio play state, volume, and mute | `PlayMedia`, `PauseMedia`, `TogglePlayPause`, `SetMediaVolume` |
| **JavaScript Bridge** | Two-way communication between Unreal & Web | `ExecuteJavaScript`, `OnJavaScriptMessage` |
| **Audio Controls** | Details panel mute option and opt-in spatial audio | `bMuted`, `SetMediaMuted`, `IsMediaMuted`, `TryStart3DSpatialAudio` |
| **Session & Privacy** | Cookie clearing, HTTP cache purging, user agent | `ClearCookies`, `ClearCache`, `SetUserAgent` |
| **Performance Optimization** | Dynamic frame rate limiting & rendering pause | `SetTargetFPS`, `PauseRendering`, `ResumeRendering` |

---

## 🎨 Blueprint Architecture

All features are exposed directly on `UQuestWebViewComponent`, meaning you can interact with any screen in your 3D world simply by dragging a reference to the component in your Actor Blueprint or Character Controller.

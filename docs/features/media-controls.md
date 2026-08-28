# HTML5 Media & Playback Controls

**Quest 3D WebView** includes high-level Blueprint nodes to control audio and video playback on any webpage without needing to write custom JavaScript.

---

## Media Control Nodes

| Blueprint Node | Target Elements | Description |
| :--- | :--- | :--- |
| **`PlayMedia()`** | HTML5 `<video>`, `<audio>` | Resumes or starts playback of media on the page. |
| **`PauseMedia()`** | HTML5 `<video>`, `<audio>` | Pauses all active media streams. |
| **`TogglePlayPause()`** | HTML5 `<video>`, `<audio>` | Toggles between play and pause states. |
| **`SetMediaVolume(Volume)`** | HTML5 `<video>`, `<audio>` | Sets audio volume from `0.0` (Silent) to `1.0` (Full). |
| **`SetMediaMuted(bInMuted)`** | HTML5 `<video>`, `<audio>` | Mutes or unmutes all page audio elements. |
| **`IsMediaMuted()`** | Component State | Returns `True` if audio is currently muted. |

---

## Details Panel Mute Toggle

If you want a WebView instance to start completely silent (useful for background monitors or ambient video walls):

1. Select `QuestWebViewComponent` in the Details Panel.
2. Under **Quest WebView | Audio**, check **`Mute Audio` = `True`**.
3. When the level starts (and on every subsequent page navigation), the component will automatically apply mute constraints to all video/audio streams.

# Performance, TargetFPS & Pausing

This page explains how to maximize performance and battery life on Meta Quest headsets using **Quest 3D WebView**'s optimization controls.

---

## 1. Frame Rate Limiting (`TargetFPS`)

In multi-screen VR environments, updating 4 or 5 full 1080p60 texture buffers simultaneously can saturate mobile GPU memory bandwidth.

* **`TargetFPS` (Property & Node):** Clamps the maximum texture update frequency (range: `1.0` to `60.0` Hz).
* **Blueprint Node:** `SetTargetFPS(FPS)`

### Recommended Settings by Screen Type:
| Screen Usage | Target FPS | Bandwidth Impact |
| :--- | :---: | :--- |
| **Primary Cinema / YouTube Video** | `60.0 Hz` | Full 60 FPS video smoothness |
| **Productivity Tools (ChatGPT, Docs)** | `30.0 Hz` | 50% memory bandwidth savings |
| **Ambient Status Displays / Clocks** | `15.0 Hz` | 75% memory bandwidth savings |

---

## 2. Dynamic Rendering Pausing

When a user turns their back to a virtual monitor, uploading texture frames is unnecessary.

* **`PauseRendering()`:** Suspends all texture pixel copies and GPU texture updates. The web session and audio playback continue running normally in the background.
* **`ResumeRendering()`:** Immediately resumes active texture updates.
* **`IsRenderingPaused()`:** Pure getter returning the current pause state.

::: tip Automatic Dirty-Frame Gating
Even without pausing, Quest 3D WebView automatically executes **0 texture uploads** whenever the DOM is static, eliminating battery drain when reading static pages!
:::

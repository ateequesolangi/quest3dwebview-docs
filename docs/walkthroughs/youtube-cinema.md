# Walkthrough 5: 1080p60 YouTube Cinema

Build a massive curved virtual theater for full 1080p60 YouTube video streaming.

---

## 🎯 Objective
Create a giant curved cinema screen with play/pause controls and volume sliders.

---

## 🛠️ Step 1: Create a Curved Cylinder Mesh
1. Use a curved cylinder slice mesh with UVs mapped smoothly from `(0,0)` to `(1,1)`.
2. Apply `M_WebScreen` with `Responsive AA = True`.
3. Add `QuestWebViewComponent` with:
   * **Initial URL:** `https://www.youtube.com/tv` (or standard `https://www.youtube.com`)
   * **Width / Height:** `1920` / `1080` (or `2560` / `1440` for 2K IMAX)
   * **Target FPS:** `60.0`

---

## 🛠️ Step 2: Build UMG Media Controller Dock
Create a floating UMG widget in front of the viewer with buttons:
* **Play / Pause:** Calls `TogglePlayPause()`.
* **Mute Toggle:** Calls `SetMediaMuted(bMuted)`.
* **Volume Slider:** On Value Changed $\to$ calls `SetMediaVolume(Value)`.

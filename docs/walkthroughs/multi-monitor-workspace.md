# Walkthrough 3: Multi-Monitor Workspaces (Scalable Multi-Screen)

This tutorial walks through building a multi-monitor productivity workspace in VR. **Quest 3D WebView is not limited to 3 screens**—you can create, spawn, and run as many concurrent web screens as your VR project needs.

---

## 🎯 Objective
Set up scalable virtual monitors with dedicated instances, custom URLs, independent `TargetFPS` limits, and dynamic runtime selection.

---

## 🛠️ Step 1: Place or Spawn Screen Actors
You can place pre-configured `BP_WebScreen` actors in the level or spawn them dynamically via Blueprint (`SpawnActorFromClass`):

### Example Multi-Screen Setup:
1. **Screen 1 (AI Assistant):**
   * **Instance Name:** `"ChatGPT Assistant"`
   * **Initial URL:** `https://chatgpt.com`
   * **Target FPS:** `30.0`
2. **Screen 2 (Cinema & Video):**
   * **Instance Name:** `"YouTube Cinema"`
   * **Initial URL:** `https://www.youtube.com`
   * **Target FPS:** `70.0`
3. **Screen 3 (Project Board):**
   * **Instance Name:** `"Trello Board"`
   * **Initial URL:** `https://trello.com`
   * **Target FPS:** `30.0`
4. **Screen 4 (Team Chat):**
   * **Instance Name:** `"Discord / Slack"`
   * **Initial URL:** `https://discord.com/app`
   * **Target FPS:** `20.0`
5. **Screen 5 (Live Telemetry / Analytics):**
   * **Instance Name:** `"System Analytics"`
   * **Initial URL:** `https://grafana.internal/dashboard`
   * **Target FPS:** `15.0`

---

## 🛠️ Step 2: Dynamic ComboBox Screen Selector

To build a dropdown switcher in your player controller or VR wrist menu:

1. On `BeginPlay` (or on demand), call **`GetAllActorsWithComponent(UQuestWebViewComponent)`**.
2. Loop through each returned component and call **`GetInstanceName()`**.
3. Add the names to your UMG `ComboBoxString` dropdown options.
4. When the user selects a screen in the dropdown, store the active component reference to route keyboard typing, media controls, and navigation buttons!

---

## ⚡ Multi-Screen Performance Optimization Tips

When running 4, 6, or 10+ simultaneous screens:

* **Stagger TargetFPS:** Keep high framerates (60–70+ FPS) on active video displays, and set text/documentation panels to 20–30 FPS.
* **Dirty-Frame Gating:** Quest 3D WebView executes **0 pixel copies** on static web panels automatically.
* **Pause Behind-Player Screens:** Call `PauseRendering()` when screens leave the player's immediate view cone.

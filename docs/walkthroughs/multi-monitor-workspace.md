# Walkthrough 3: Multi-Monitor 3-Screen Workspace

This tutorial walks through building a productivity triple-monitor workspace running ChatGPT, YouTube, and Trello simultaneously.

---

## 🎯 Objective
Set up three virtual monitors with dedicated instances, custom URLs, and optimal performance profiles.

---

## 🛠️ Step 1: Place 3 Screen Actors
Drag three instances of `BP_WebScreen` into your level and arrange them in a curved cockpit around the player:

1. **Left Screen:**
   * **Instance Name:** `"ChatGPT Assistant"`
   * **Initial URL:** `https://chatgpt.com`
   * **Target FPS:** `30.0`
2. **Center Screen (Main Display):**
   * **Instance Name:** `"YouTube Cinema"`
   * **Initial URL:** `https://www.youtube.com`
   * **Target FPS:** `60.0`
3. **Right Screen:**
   * **Instance Name:** `"Trello Board"`
   * **Initial URL:** `https://trello.com`
   * **Target FPS:** `30.0`

---

## 🛠️ Step 2: Dynamic ComboBox Screen Selector

To build a dropdown switcher in your player controller:

1. On `BeginPlay`, call **`GetAllActorsWithComponent(UQuestWebViewComponent)`**.
2. Loop through each returned component and call **`GetInstanceName()`**.
3. Add the names to your UMG `ComboBoxString` dropdown options.
4. When the user selects a screen in the dropdown, store the active component reference to route keyboard typing and media controls!

# Multi-Instance Isolation

**Quest 3D WebView** is built from the ground up to support **multiple concurrent web screens** running simultaneously in the same 3D VR environment.

---

## How Multi-Instance Isolation Works

When multiple `BP_WebScreen` actors are placed in a level or spawned dynamically at runtime:
1. On `BeginPlay`, each component receives an unconditionally incremented, unique runtime **`InstanceId`** (`NextInstanceId++`).
2. In the Android layer, each `InstanceId` creates its own dedicated:
   * Android `VirtualDisplay` instance
   * `ImageReader` swapchain
   * Chromium `WebView` container
   * Dedicated render update handler thread

```
                     Unreal Engine 5 VR Level
  ┌───────────────────────┬───────────────────────┬───────────────────────┐
  │  Screen 1: ChatGPT    │  Screen 2: YouTube    │  Screen 3: Trello     │
  │  Instance ID = 1      │  Instance ID = 2      │  Instance ID = 3      │
  └───────────┬───────────┴───────────┬───────────┴───────────┬───────────┘
              │                       │                       │
              ▼                       ▼                       ▼
      VirtualDisplay #1       VirtualDisplay #2       VirtualDisplay #3
      (TargetFPS = 30)        (TargetFPS = 60)        (TargetFPS = 30)
```

---

## Naming & Identifying Instances

To make it easy to build UI docks, switchers, and dropdowns:
* **`InstanceName` (Property):** Set a descriptive label in the Details Panel (e.g. `"Primary YouTube"`, `"ChatGPT Workspace"`).
* **`SetInstanceName(InName)` / `GetInstanceName()` (Nodes):** Dynamically read or update labels from Blueprint.
* **`GetInstanceId()` (Node):** Returns the numeric internal instance identifier.

---

## Recommended Multi-Instance Best Practices

To maintain a rock-solid **72+ FPS** on Meta Quest when running 3 to 6 active screens:

1. **Stagger Video Framerates:**
   * Keep your primary video screen at `TargetFPS = 60.0`.
   * Set secondary static screens (ChatGPT, Trello, Discord) to `TargetFPS = 30.0`.
2. **Use 720p on Secondary Panels:**
   * Set secondary panels to `Width = 1280, Height = 720` to reduce GPU texture memory overhead by 55%.
3. **Pause Out-of-Sight Panels:**
   * Call `PauseRendering()` on screens that are positioned behind the player's field of view.

# 5-Minute Quick Start

Follow this guide to render your first live 3D web screen in under 5 minutes!

---

## Step 1: Create an Unlit Screen Material

1. In the Content Browser, right-click and create a new **Material** (e.g. `M_WebScreen`).
2. Open the material and configure the **Details Panel**:
   * **Shading Model:** `Unlit`
   * **Two Sided:** `True` (optional, for transparent panels)
   * **Responsive AA:** `True` (recommended for razor-sharp text)
3. In the Material Graph:
   * Add a **`TextureSampleParameter2D`** node.
   * Set its **Parameter Name** to `WebViewTexture`.
   * Connect its **RGB** output directly into **Emissive Color**.
4. Save and close the material.

```
┌──────────────────────────────────────┐
│ TextureSampleParameter2D             │
│ Parameter Name: "WebViewTexture"     │──► [ Emissive Color ]
└──────────────────────────────────────┘
```

---

## Step 2: Create a Screen Actor Blueprint

1. Right-click in Content Browser $\to$ **Blueprint Class** $\to$ choose **Actor** (e.g. `BP_WebScreen`).
2. Open the Blueprint and click **+ Add**:
   * Add a **Static Mesh Component** (set its mesh to a standard `Plane` or `Cube`).
   * Add a **Quest WebView Component** (`UQuestWebViewComponent`).
3. Select the **Quest WebView Component** and configure the **Details Panel**:
   * **Initial URL:** `https://www.youtube.com` (or any website).
   * **Material Asset:** Select `M_WebScreen` created in Step 1.
   * **Target FPS:** `60.0`.
   * **Width / Height:** `1920` / `1080`.
   * **Mute Audio:** `False` (or `True` if you want it muted on startup).

---

## Step 3: Place & Package for Meta Quest

1. Drag `BP_WebScreen` into your level.
2. Rotate and scale the screen to your desired virtual monitor size.
3. Package your project for **Android (ASTC)** or launch directly onto your Meta Quest headset via USB-C / Meta Quest Link:
   * **Platforms → Android → Package Project**

---

## What Happens Automatically:
* On `BeginPlay`, `QuestWebViewComponent` automatically initializes the Android `VirtualDisplay` hardware pipeline.
* It dynamically creates a `MaterialInstanceDynamic` from `M_WebScreen`, assigns it to the Actor's Static Mesh, and continuously streams 1080p60 hardware frames into `WebViewTexture`!

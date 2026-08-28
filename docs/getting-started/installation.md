# Installation & Setup

This guide walks you through installing **Quest 3D WebView** into your Unreal Engine 5 project.

---

## 1. Plugin Installation

1. Close Unreal Editor.
2. Locate your Unreal project directory (where your `.uproject` file is located).
3. Create a `Plugins` folder if it doesn't already exist.
4. Copy the `Quest3DWebView` plugin folder into `YourProject/Plugins/`:
   ```
   YourProject/
   ├── Config/
   ├── Content/
   ├── Plugins/
   │   └── Quest3DWebView/
   │       ├── Source/
   │       ├── Content/
   │       └── Quest3DWebView.uplugin
   └── YourProject.uproject
   ```
5. Open your project in Unreal Editor.
6. Navigate to **Edit → Plugins** and verify that **Quest 3D WebView** is enabled.

---

## 2. Required Project Settings

To enable VR laser raycasts to extract precise UV coordinates from 3D meshes, you must enable **UV support from hit results**:

1. In Unreal Editor, go to **Edit → Project Settings**.
2. Search for **Support UV from Hit Results**.
3. Under **Engine → Physics → Optimization**, check the box:
   * **`Support UV From Hit Results` = `True`**

Alternatively, add the following directly to your `Config/DefaultEngine.ini`:

```ini
[/Script/Engine.PhysicsSettings]
bSupportUVFromHitResults=True
```

::: tip Why is this required?
When your VR motion controller performs a Line Trace against a 3D screen, Unreal Engine uses this flag to populate `HitResult.FaceIndex` and calculate the exact `(U, V)` coordinates where the laser intersects the polygon.
:::

---

## 3. Verifying Editor Test Mode

Quest 3D WebView includes a built-in **Editor Test Pattern Generator**. When you place a `QuestWebViewComponent` in a level and press **Play in Editor (PIE)** on Windows:
* The component generates an animated 60 FPS test card showing resolution, framerate, and crosshair coordinates.
* When packaged and deployed to Meta Quest (Android), the component automatically switches to the live Android Chromium hardware engine!

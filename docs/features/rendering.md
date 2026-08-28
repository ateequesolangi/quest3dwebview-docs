# Hardware Video & Rendering Pipeline

This page explains how **Quest 3D WebView** achieves smooth 1080p60 web video on 3D meshes without the black screens or performance bottlenecks common in standard VR web plugins.

---

## The Core Technical Innovation

In Unreal Engine mobile Vulkan, standard UMG WebBrowser plugins attempt to paint the DOM into an off-screen CPU software canvas before uploading pixels to a GPU texture. 

This fails on hardware-accelerated video (such as YouTube, Twitch, Netflix, or Vimeo) because modern Android video decoders write directly into private hardware GPU overlay surfaces (`SurfaceView`) that software canvases cannot read.

### The VirtualDisplay Solution

Quest 3D WebView creates an isolated Android **`VirtualDisplay`** backed by a hardware **`ImageReader`**:

```
┌─────────────────────────┐
│ Android System WebView  │
└───────────┬─────────────┘
            │ (Paints DOM & Video at 60 FPS)
            ▼
┌─────────────────────────┐
│ Hardware VirtualDisplay │
└───────────┬─────────────┘
            │ (Acquires Hardware Surface Frames)
            ▼
┌─────────────────────────┐
│ Hardware ImageReader    │
└───────────┬─────────────┘
            │ (Atomic Double-Buffered Bitmap Lock via NDK)
            ▼
┌─────────────────────────┐
│ AndroidBitmap_lockPixels│
└───────────┬─────────────┘
            │ (Direct memcpy to RHI Texture on Render Thread)
            ▼
┌─────────────────────────┐
│ Unreal Dynamic Texture  │──► Dynamic Material Instance on 3D Mesh
└─────────────────────────┘
```

---

## Key Benefits of This Architecture

1. **Zero Video Black Screens:**
   * HTML5 `<video>` tags and WebGL canvases are rendered natively by the Snapdragon GPU and VPU.
2. **Double-Buffered Atomic Swapping:**
   * Front and back buffers are swapped with atomic pointer operations, completely eliminating horizontal screen tearing during rapid 60 FPS video playback.
3. **Dirty-Frame Gating:**
   * If the webpage is idle (e.g. reading an article, viewing a static dashboard), the pipeline executes **zero pixel copies** and **zero GPU texture updates**, saving precious mobile battery life and thermals.

---

## Configuring Resolution & Materials

### Resolution Settings
You can customize the virtual display resolution in the Details Panel of `QuestWebViewComponent`:
* **Width:** `1920` (Default) | `1280` (720p Mode) | `2560` (1440p Mode) | `3840` (4K Mode)
* **Height:** `1080` (Default) | `720` (720p Mode) | `1440` (1440p Mode) | `2160` (4K Mode)

### Automatic Material Binding
If you assign a base material asset to the `MaterialAsset` property in the Details Panel, `QuestWebViewComponent` automatically:
1. Instantiates a `UMaterialInstanceDynamic` at runtime.
2. Applies the live `UTexture2DDynamic` to the parameter specified by `TextureMaterialParameterName` (default: `"WebViewTexture"`).
3. Assigns the material instance to the owning Actor's `UMeshComponent` automatically!

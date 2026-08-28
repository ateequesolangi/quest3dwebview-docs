# How It Works (Pipeline Architecture)

A deep dive into how **Quest 3D WebView** bridges Android's hardware rendering stack into Unreal Engine 5's rendering pipeline.

---

## The End-to-End Render Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Android Activity UI Thread                               │
│    Creates isolated WebView & attaches to Presentation      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Android VirtualDisplay + Presentation                    │
│    Hardware-renders DOM, CSS, WebGL, & MediaCodec Video     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. ImageReader Callback Thread                              │
│    Pulls hardware Image surface, locks Bitmap, sets Dirty   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Unreal Game Thread (Tick)                                │
│    Evaluates TargetFPS & queries IsFrameDirty               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Unreal Render Thread                                     │
│    Calls AndroidBitmap_lockPixels & RHIUpdateTexture2D      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Unreal 3D Material                                       │
│    Samples UTexture2DDynamic on 3D Mesh                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Why VirtualDisplay Wins Over Canvas Approaches

Standard WebView plugins on Android use `View.draw(Canvas)` or software off-screen rendering:
* ❌ `View.draw()` **cannot capture hardware overlay video surfaces** (`SurfaceView` / `MediaCodec`), producing a black screen on YouTube.
* ❌ Software rasterization forces CPU rendering of WebGL and modern CSS.

`VirtualDisplay` creates a real Android display target at the OS level:
* ✅ The OS treats the WebView as if it were a physical external monitor.
* ✅ Hardware video decoders write directly into the virtual display surface without restriction.

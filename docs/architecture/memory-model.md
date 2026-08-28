# Memory Model & Dirty-Frame Gating

Details on memory allocation, double-buffered Bitmap swaps, and dirty-frame gating.

---

## 1. Double-Buffered Front/Back Bitmaps

To prevent screen tearing when 60 FPS video is rendering simultaneously while Unreal's Render Thread copies pixels:

* **Back Buffer Bitmap:** Asynchronously written to by the `ImageReader` hardware surface listener.
* **Front Buffer Bitmap:** Locked and read by Unreal's Render Thread via `AndroidBitmap_lockPixels`.
* **Atomic Swap:** When a new frame arrives, the front and back buffer pointers are atomically swapped.

---

## 2. Memory Footprint by Resolution

Memory allocated per active `QuestWebViewComponent` instance:

| Resolution | Single Frame Buffer | Double-Buffer Total | GPU Texture | Total Instance RAM |
| :--- | :---: | :---: | :---: | :---: |
| **720p** (1280×720) | 3.68 MB | 7.37 MB | 3.68 MB | **~11.0 MB** |
| **1080p** (1920×1080) | 8.29 MB | 16.58 MB | 8.29 MB | **~24.8 MB** |
| **1440p** (2560×1440) | 14.74 MB | 29.49 MB | 14.74 MB | **~44.2 MB** |
| **4K** (3840×2160) | 33.17 MB | 66.35 MB | 33.17 MB | **~99.5 MB** |

---

## 3. Dirty-Frame Gating Architecture

When web content is static:
1. `mIsFrameDirty` remains `false`.
2. Unreal's `TickComponent` immediately skips texture upload logic in **0.001 ms**.
3. **Result:** Running 5 idle web tabs costs virtually **0% extra GPU and CPU overhead**!

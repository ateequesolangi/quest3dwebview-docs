# Video Detection & Extraction

**Quest 3D WebView** features automatic HTML5 `<video>` element detection, exposing video stream metadata and bounding rects directly to Blueprint.

---

## 1. The `OnVideoDetected` Delegate

Whenever a webpage mounts or plays an HTML5 `<video>` tag, the plugin automatically extracts its bounds and fires:

```text
[ QuestWebViewComponent ] ──► ( Event OnVideoDetected )
                                       ├── Url: String
                                       ├── bIsPlayable: Boolean
                                       ├── UVPosition: Vector2D
                                       └── UVSize: Vector2D
```

### Delegate Parameters:
* **`Url` (String):** The source URL of the video stream.
* **`bIsPlayable` (Boolean):** `True` if the video is a direct media container (`.mp4`, `.webm`) playable by Unreal's `UMediaPlayer`. `False` if it is a Media Source Extensions (blob/MSE) stream.
* **`UVPosition` (Vector2D):** Top-left coordinate of the video element in normalized `[0, 1]` UV space.
* **`UVSize` (Vector2D):** Width and height of the video element in normalized `[0, 1]` UV space.

---

## 2. Direct Unreal Media Player Routing

To route a detected direct video file directly into an Unreal Engine `UMediaPlayer`:

```text
[ QuestWebViewComponent ] ──► [ Play Detected Video With Media Player ]
                                    ├── Player: UMediaPlayer*
                                    └── Return Value: Boolean
```

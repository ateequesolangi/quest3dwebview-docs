# Component Properties (`UPROPERTY`)

Complete reference for all properties exposed by `UQuestWebViewComponent`.

---

## Configuration Properties

| Property | Type | Category | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`InstanceName`** | `FString` | `Quest WebView` | `"WebView"` | User-defined label to identify this instance in UI switchers. |
| **`bInitializeOnBeginPlay`** | `bool` | `Quest WebView` | `true` | When true, automatically initializes the Android WebView during `BeginPlay`. |
| **`InitialURL`** | `FString` | `Quest WebView` | `"https://www.google.com"` | Initial URL loaded on startup. |
| **`TargetFPS`** | `float` | `Quest WebView` | `60.0` | Texture update frequency cap (`1.0` to `60.0` Hz). |
| **`Width`** | `int32` | `Quest WebView` | `1920` | Virtual display render width in pixels. |
| **`Height`** | `int32` | `Quest WebView` | `1080` | Virtual display render height in pixels. |
| **`MaterialAsset`** | `UMaterialInterface*` | `Quest WebView` | `nullptr` | Base material asset used to instantiate and bind dynamic material. |
| **`TextureMaterialParameterName`** | `FName` | `Quest WebView` | `"WebViewTexture"` | Name of the texture parameter inside the material. |
| **`bMuted`** | `bool` | `Quest WebView\|Audio` | `false` | When true, mutes all HTML5 audio/video playback on page load. |
| **`bUse3DSpatialAudio`** | `bool` | `Quest WebView\|Audio` | `false` | Enables 3D positional audio path for direct media URLs. |
| **`SpatialMediaPlayer`** | `UMediaPlayer*` | `Quest WebView\|Audio` | `nullptr` | Media Player used to decode direct media URLs for spatial audio. |
| **`SpatialAudioComponent`** | `UMediaSoundComponent*` | `Quest WebView\|Audio` | `nullptr` | Dedicated Sound Component for spatial audio emission. |

---

## Read-Only / Transient State Properties

| Property | Type | Category | Description |
| :--- | :--- | :--- | :--- |
| **`InstanceId`** | `int32` | `Quest WebView` | Unique runtime identifier assigned to this component. |
| **`Texture`** | `UTexture2DDynamic*` | `Quest WebView` | Live GPU texture receiving hardware VirtualDisplay frames. |
| **`DynamicMaterialInstance`** | `UMaterialInstanceDynamic*` | `Quest WebView` | Dynamic material instance receiving the live texture. |
| **`CurrentURL`** | `FString` | `Quest WebView\|Navigation` | Currently loaded webpage URL. |
| **`PageTitle`** | `FString` | `Quest WebView\|Navigation` | Active webpage document title. |
| **`LoadProgress`** | `int32` | `Quest WebView\|Navigation` | Loading progress percentage (`0` to `100`). |
| **`bIsLoading`** | `bool` | `Quest WebView\|Navigation` | `True` while page loading is active. |
| **`bTextInputFocused`** | `bool` | `Quest WebView\|Input` | `True` while an HTML text input has user focus. |
| **`DetectedVideoUrl`** | `FString` | `Quest WebView\|Video` | Most recently detected `<video>` stream URL. |
| **`bDetectedVideoPlayable`** | `bool` | `Quest WebView\|Video` | `True` if detected video is directly playable by `UMediaPlayer`. |
| **`DetectedVideoUVPosition`** | `FVector2D` | `Quest WebView\|Video` | Top-left UV coordinate of detected video on screen. |
| **`DetectedVideoUVSize`** | `FVector2D` | `Quest WebView\|Video` | Normalized UV width/height of detected video. |

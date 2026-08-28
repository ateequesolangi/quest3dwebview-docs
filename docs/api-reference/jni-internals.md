# JNI & C++ Internal Architecture

Advanced reference for C++ developers interfacing directly with `FQuestWebViewJNI`.

---

## The `FQuestWebViewJNI` Static Dispatcher

All Blueprint methods on `UQuestWebViewComponent` forward their requests to the low-level static C++ class `FQuestWebViewJNI`.

### NDK Pixel Locking
```cpp
static bool LockBitmapPixels(
    int32 InstanceId, 
    void** OutPixels, 
    int32& OutWidth, 
    int32& OutHeight, 
    int32& OutStride
);

static void UnlockBitmapPixels(int32 InstanceId);
```
* Uses Android NDK `<android/bitmap.h>` `AndroidBitmap_lockPixels` to acquire direct memory pointers to the hardware front buffer with zero JNI array copy overhead.

### Native C++ Delegate Handlers
`FQuestWebViewJNI` exposes multicast delegates subscribed to by `UQuestWebViewComponent`:
* `OnWebViewReady()`
* `OnTextInputFocus()`
* `OnPageState()`
* `OnJavaScriptMessage()`
* `OnVideoDetected()`

# Threading & Concurrency Model

Understanding the 4 concurrent threads in **Quest 3D WebView** that guarantee zero-crash execution.

---

## The 4 Operating Threads

| Thread | Owner | Responsibilities |
| :--- | :--- | :--- |
| **Android UI Thread** (`main`) | Android OS | All direct `mWebView` operations (`goBack`, `loadUrl`, `evaluateJavascript`). |
| **ImageReader Handler Thread** | Quest WebView | Asynchronously receives completed frame surfaces from `VirtualDisplay`. |
| **Unreal Game Thread** | Unreal Engine | Executes Blueprint logic, line traces, `TickComponent`, and reads atomic states. |
| **Unreal Render Thread** | Unreal Engine | Executes `RHIUpdateTexture2D` and NDK memory copy into GPU texture memory. |

---

## Concurrency Rules & Safety Guarantees

1. **All WebView Calls Routed via `runOnUiThread`:**
   * Calling any `WebView` method from the Unreal Game Thread throws a fatal Android crash. Quest 3D WebView automatically wraps all calls in `mActivity.runOnUiThread`.
2. **Lock-Free State Queries:**
   * Navigation state (`mCanGoBack`, `mCanGoForward`) and frame flags (`mIsFrameDirty`) are stored in Java `AtomicBoolean` and `volatile` fields, allowing instantaneous lock-free reads from the Game Thread.
3. **No Deadlocks:**
   * Unreal's Game Thread never blocks waiting for Android's UI thread.

# Events & Delegates Reference

Complete reference for all Blueprint-assignable event delegates provided by `UQuestWebViewComponent`.

---

## Event Delegates

### `OnWebViewReady`
* **Signature:** `()`
* **Fired:** When the Android hardware `VirtualDisplay` pipeline has finished initialization and is ready to receive input/navigation commands.

---

### `OnTextInputFocusChanged`
* **Signature:** `(UQuestWebViewComponent* WebView, bool bFocused)`
* **Fired:** When an HTML text input field (`<input>`, `<textarea>`, `contenteditable`) gains or loses user focus.
* **Use Case:** Show or hide 3D virtual keyboards.

---

### `OnLoadStarted`
* **Signature:** `(const FString& Url)`
* **Fired:** When a network navigation request begins.

---

### `OnLoadCompleted`
* **Signature:** `(const FString& Url, const FString& Title)`
* **Fired:** When DOM parsing completes and the webpage title becomes available.

---

### `OnLoadProgress`
* **Signature:** `(int32 Progress)`
* **Fired:** Periodically during page loading with a progress percentage from `0` to `100`.

---

### `OnLoadError`
* **Signature:** `(int32 ErrorCode, const FString& Description, const FString& Url)`
* **Fired:** If a network, DNS, or HTTP error occurs during navigation.

---

### `OnJavaScriptMessage`
* **Signature:** `(const FString& Message)`
* **Fired:** When webpage JavaScript executes `window.quest3d.postMessage(...)`.

---

### `OnVideoDetected`
* **Signature:** `(const FString& Url, bool bIsPlayable, FVector2D UVPosition, FVector2D UVSize)`
* **Fired:** When an HTML5 `<video>` tag is mounted or begins playback on the active webpage.

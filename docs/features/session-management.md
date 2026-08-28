# Session, Cookies & Cache Management

**Quest 3D WebView** provides session lifecycle controls to manage cookies, HTTP disk cache, and browser user agent spoofing.

---

## 1. Session Nodes

### `ClearCache()`
Purges the HTTP disk and memory cache for the active WebView instance.
* **Use case:** Forcing fresh downloads of updated web assets, testing web app changes, or resetting local storage.

### `ClearCookies()`
Clears all stored browser cookies across all WebView instances.
* **Use case:** Signing users out of Google/YouTube/Discord accounts or providing a clean "Guest Mode" in kiosk apps.

### `SetUserAgent(UserAgent)`
Overrides the HTTP `User-Agent` header sent by the browser.
* **Pass a custom string:** Spoofs a Desktop Chrome browser (e.g. `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...`) to force desktop web layouts instead of mobile layouts.
* **Pass an empty string (`""`):** Restores the default Android System WebView User-Agent.

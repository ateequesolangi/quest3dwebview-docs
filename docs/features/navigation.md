# Browser Navigation & Single-Page Apps

**Quest 3D WebView** provides a crash-proof, thread-safe browser navigation system with native support for both standard multi-page websites and modern Single-Page Applications (SPAs).

---

## 1. Core Navigation Nodes

| Node | Type | Description |
| :--- | :--- | :--- |
| **`LoadURL(Url)`** | `Callable` | Navigates the WebView to the specified HTTP/HTTPS/file URL. |
| **`GoBack()`** | `Callable` | Navigates backward in session history. |
| **`GoForward()`** | `Callable` | Navigates forward in session history. |
| **`Reload()`** | `Callable` | Refreshes the currently loaded webpage. |
| **`StopLoading()`** | `Callable` | Halts any ongoing network transfer or page render. |
| **`CanGoBack()`** | `Pure` | Returns `True` if backward navigation history exists. |
| **`CanGoForward()`** | `Pure` | Returns `True` if forward navigation history exists. |

---

## 2. Single-Page Application (SPA) Support

Modern web applications (such as YouTube, React dashboards, ChatGPT, Trello, and Discord) frequently handle page routing via the HTML5 History API (`window.history.pushState`) without triggering traditional browser page loads.

When you call `GoBack()` or `GoForward()`:
1. The plugin first checks if standard browser history is available.
2. If standard history is not available (common in React/Vue/Angular SPAs), it automatically executes `window.history.back()` / `window.history.forward()` via JavaScript fallback.
3. This guarantees seamless, intuitive navigation across all modern web apps!

---

## 3. Thread-Safe Navigation State

In Android Chromium, querying navigation status directly from a background thread (such as Unreal Engine's Game Thread) causes a fatal application crash.

Quest 3D WebView solves this by caching navigation states in thread-safe atomic primitives on Android's UI thread. Nodes like `CanGoBack()` and `CanGoForward()` execute in **under 1 nanosecond on the Game Thread** with **zero crash risk**.

---

## 4. Lifecycle Event Dispatchers

Bind to these Blueprint event dispatchers to build interactive loading bars and UI state badges:

* **`OnLoadStarted(Url)`:** Fired when a network request begins.
* **`OnLoadProgress(Progress)`:** Progress percentage (`0` to `100`).
* **`OnLoadCompleted(Url, Title)`:** Fired when DOM is ready and page title is available.
* **`OnLoadError(ErrorCode, Description, Url)`:** Fired if DNS or HTTP errors occur.

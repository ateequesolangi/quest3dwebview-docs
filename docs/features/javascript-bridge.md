# Bidirectional JavaScript Bridge

**Quest 3D WebView** provides full two-way communication between Unreal Engine Blueprint/C++ and the webpage DOM.

---

## 1. Unreal Engine ➔ Web: `ExecuteJavaScript`

To execute arbitrary JavaScript code inside the active page:

```text
[ QuestWebViewComponent ] ──► [ Execute JavaScript ]
                                    └── Script: "document.body.style.backgroundColor = '#0b0f19';"
```

### Common Use Cases:
* Filling out web forms automatically from player profile data.
* Calling custom web app functions (e.g. `window.myApp.setTheme('dark');`).
* Extracting values from page elements.

---

## 2. Web ➔ Unreal Engine: `OnJavaScriptMessage`

To send messages, JSON payloads, or event triggers from a webpage back into Unreal Engine, call `window.quest3d.postMessage()` in your web application's JavaScript:

### Inside your Web Page (HTML/JS):
```javascript
// Send a plain string or JSON string to Unreal Engine
window.quest3d.postMessage(JSON.stringify({
    event: "item_selected",
    itemId: 1042,
    price: 49.99
}));
```

### Inside Unreal Engine (Blueprint):
Bind to the **`OnJavaScriptMessage`** event delegate:

```text
[ QuestWebViewComponent ] ──► ( Event OnJavaScriptMessage )
                                       │
                                       ▼
                                [ Parse JSON / Logic ]
```

# Bidirectional JavaScript Bridge

**Quest 3D WebView** provides lightning-fast, zero-overhead two-way communication between Unreal Engine 5.5 (Blueprints/C++) and the webpage DOM.

::: tip 🧪 Live Interactive Developer Testbed
You can immediately test two-way communication in VR or on your browser using the official testbed:
👉 **[Open Live JS Bridge Testbed](https://ateequesolangi.github.io/quest3dwebview-docs/secret/js-bridge-test)**

Set your `BP_WebScreen` **Initial URL** to:
`https://ateequesolangi.github.io/quest3dwebview-docs/secret/js-bridge-test`
:::

---

## 1. Unreal Engine ➔ Web: `ExecuteJavaScript`

To execute arbitrary JavaScript code inside the active page from Blueprint or C++:

```text
[ QuestWebViewComponent ] ──► [ Execute JavaScript ]
                                    └── Script: "window.receiveFromUnreal({ event: 'damage', amount: -20 });"
```

### Common Examples:
```javascript
// 1. Send JSON payload to a custom web app receiver
window.receiveFromUnreal(JSON.stringify({ event: "damage", amount: -20 }));

// 2. Control HTML video or audio
document.querySelector('video').play();

// 3. Update CSS styling or dynamic HUD themes
document.body.style.backgroundColor = '#0b0f19';
```

---

## 2. Web ➔ Unreal Engine: `OnJavaScriptMessage`

To send messages, JSON payloads, or event triggers from any webpage back into Unreal Engine, call **`window.quest3d.postMessage()`** in your web application's JavaScript.

### Inside your Web Page (HTML/JS):
```javascript
// Send a plain string or JSON string to Unreal Engine
window.quest3d.postMessage(JSON.stringify({
    event: "item_purchased",
    itemId: "Laser_Rifle",
    cost: 250,
    timestamp: Date.now()
}));
```

### Inside Unreal Engine (Blueprint):
Bind to the **`OnJavaScriptMessage`** event delegate:

```text
[ QuestWebViewComponent ] ──► ( Event OnJavaScriptMessage )
                                       │
                                       ▼ (Message: String)
                                 [ Parse JSON String ] ──► [ Switch on Event ]
```

---

## 3. Keyboard Focus & Auto-Summoning

When the user laser-clicks into any HTML `<input>`, `<textarea>`, or `contenteditable` element, Quest 3D WebView automatically captures W3C `focusin` / `focusout` events:

```text
[ QuestWebViewComponent ] ──► ( Event OnTextInputFocusChanged )
                                       │
                                       ▼ (bIsFocused: Boolean)
                                 [ Branch ]
                                    ├── True  ──► [ Summon 3D Virtual Keyboard ]
                                    └── False ──► [ Dismiss 3D Virtual Keyboard ]
```

---

## 4. Text Insertion & Modern Framework Sync

When typing from the 3D Virtual Keyboard into web inputs, Quest 3D WebView automatically handles synthetic events for **React, Vue, Angular, and Atlassian Forms (Trello/Jira)**:

```text
[ QuestWebViewComponent ] ──► [ Insert Text ] (Text: "player@company.com")
```
* Automatically invokes `HTMLInputElement.prototype` value descriptors.
* Dispatches `InputEvent`, `input`, and `change` events so modern reactive states never de-sync.

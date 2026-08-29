# Walkthrough 8: Two-Way Unreal ↔ Web JS Communication

This tutorial demonstrates how to exchange real-time data between Unreal Engine 5.5 and web applications running on Meta Quest.

::: tip 🧪 Ready-to-Use Live Testbed
You don't even need to build a web server to test this! Load our official live testbed:
👉 **[Open Live JS Bridge Testbed](https://ateequesolangi.github.io/quest3dwebview-docs/secret/js-bridge-test)**

Set your `BP_WebScreen` **Initial URL** to:
`https://ateequesolangi.github.io/quest3dwebview-docs/secret/js-bridge-test`
:::

---

## 🎯 Objective
Send player stats (health, coins, level) into a web app, and receive user clicks/actions from the web page back into Unreal Engine Blueprints.

---

## 🛠️ Step 1: Sending Data to Web (Unreal ➔ JS)

In your Actor Blueprint, call **`ExecuteJavaScript`**:

```text
[ QuestWebViewComponent ] ──► [ Execute JavaScript ]
                                    └── Script: "window.receiveFromUnreal(JSON.stringify({ event: 'damage', amount: -20 }));"
```

When called, the live health bar on the testbed in VR will immediately drop from 100 to 80 HP!

---

## 🛠️ Step 2: Receiving Events from Web (JS ➔ Unreal)

### In your Web App JavaScript:
```javascript
// Web button click sends purchase event to Unreal Engine
document.getElementById('buyButton').addEventListener('click', () => {
    window.quest3d.postMessage(JSON.stringify({
        action: "purchase_item",
        itemId: "Laser_Rifle",
        price: 250,
        timestamp: Date.now()
    }));
});
```

### In your Unreal Blueprint:
Bind to the **`OnJavaScriptMessage`** delegate:

```text
[ QuestWebViewComponent ] ──► ( Event OnJavaScriptMessage )
                                       ├── Message: String
                                       │
                                       ▼
                                 [ Parse JSON String ] ──► [ Award Item / Print String ]
```

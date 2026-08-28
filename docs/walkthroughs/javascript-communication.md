# Walkthrough 8: Two-Way Unreal ↔ Web JS Communication

This tutorial demonstrates how to exchange real-time data between Unreal Engine and web applications.

---

## 🎯 Objective
Send player stats into a web leaderboard, and receive user clicks/purchases from the web app back into Unreal Engine.

---

## 🛠️ Step 1: Sending Data to Web (Unreal ➔ JS)

In your Actor Blueprint:

```text
[ QuestWebViewComponent ] ──► [ Execute JavaScript ]
                                    └── Script: "window.updatePlayerScore('Ateeque', 15400);"
```

---

## 🛠️ Step 2: Receiving Events from Web (JS ➔ Unreal)

### In your Web App JavaScript:
```javascript
// Web button click sends purchase event to Unreal Engine
document.getElementById('buyButton').addEventListener('click', () => {
    window.quest3d.postMessage(JSON.stringify({
        action: "purchase_item",
        itemId: "sword_01",
        price: 250
    }));
});
```

### In your Unreal Blueprint:
```text
[ QuestWebViewComponent ] ──► ( Event OnJavaScriptMessage )
                                       ├── Message: String
                                       │
                                       ▼
                                [ Parse JSON / Award Item ]
```

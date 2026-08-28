# Walkthrough 7: Controller UMG Navigation Bar

Build a sleek floating VR navigation bar containing Backward, Reload, Forward, and Screen Switching controls.

---

## 🎯 Objective
Create a floating spatial toolbar widget to navigate the active browser screen.

---

## 🛠️ Toolbar UI Layout

```
┌────────────────────────────────────────────────────────┐
│  [🟢 Active Display: YouTube Cinema (60 FPS)   ▼]      │
├───────────────────┬───────────────────┬────────────────┤
│    [ ◀ Backward ] │    [ 🔄 Reload ]  │ [ Forward ▶ ]  │
└───────────────────┴───────────────────┴────────────────┘
```

---

## 🛠️ Blueprint Button Bindings

Inside your navigation widget event graph:

1. **Backward Button:**
   * On Click $\to$ `ActiveWebView->GoBack()`.
2. **Reload Button:**
   * On Click $\to$ `ActiveWebView->Reload()`.
3. **Forward Button:**
   * On Click $\to$ `ActiveWebView->GoForward()`.
4. **Display Dropdown (ComboBox):**
   * On Selection Changed $\to$ update `ActiveWebView` reference to the selected screen component.

# Walkthrough 6: Dynamic Runtime URL Loading

Learn how to initialize or switch web pages dynamically at runtime from game save data, text fields, or API responses.

---

## 🎯 Objective
Load custom URLs on demand rather than relying only on predefined URLs.

---

## 🛠️ Method A: Initialize Later at Runtime

1. In the Details Panel of `QuestWebViewComponent`, uncheck:
   * **`bInitializeOnBeginPlay` = `False`**
2. When your game logic is ready (e.g. after receiving a URL from a server or player input):
3. Call **`InitializeWithURL(InURL)`**:
   * Initializes the hardware `VirtualDisplay` pipeline and navigates to the specified URL in a single step!

---

## 🛠️ Method B: Dynamic URL Switching on Active Screens

If the screen is already initialized and running:
* Call **`LoadURL(NewUrl)`** directly to navigate immediately to any new web destination.

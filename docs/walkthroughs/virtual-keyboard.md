# Walkthrough 4: 3D Virtual Keyboard Integration

This tutorial explains how to automatically spawn and position a 3D VR virtual keyboard when a player clicks a web search or text field.

---

## 🎯 Objective
Automatically show a virtual keyboard widget when the user focuses an input box in the browser, and send typed characters to the active input.

---

## 🛠️ Step 1: Bind Focus State Delegate

In your Player Pawn or Screen Actor Blueprint:

```text
[ QuestWebViewComponent ] ──► ( Event OnTextInputFocusChanged )
                                       ├── WebView: UQuestWebViewComponent*
                                       └── bFocused: Boolean
```

1. Drag out `bFocused`:
   * If `True`: Spawn or set `WBP_VirtualKeyboard` visibility to **Visible**, positioned in front of the active screen.
   * If `False`: Hide the keyboard widget.

---

## 🛠️ Step 2: Wire Keyboard Buttons

Inside your `WBP_VirtualKeyboard` widget:

1. For standard letter/number buttons (`A-Z`, `0-9`, symbols):
   * On Button Click $\to$ call **`ActiveWebView->SendText(Character)`**.
2. For special control buttons:
   * **Backspace:** Call **`ActiveWebView->SendKey(EQuestWebViewKey::Backspace)`**.
   * **Enter:** Call **`ActiveWebView->SendKey(EQuestWebViewKey::Enter)`**.
   * **Tab:** Call **`ActiveWebView->SendKey(EQuestWebViewKey::Tab)`**.

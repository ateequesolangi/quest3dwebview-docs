# Virtual Keyboard & Text Input Focus

**Quest 3D WebView** features an automated text focus bridge that makes integrating 3D VR keyboards seamless.

---

## 1. Automatic Text Input Focus Detection

Whenever a user clicks or focuses an interactive HTML element on the webpage:
* `<input type="text">`, `<input type="password">`, `<input type="search">`
* `<textarea>`
* Elements with `contenteditable="true"`

The plugin automatically fires the **`OnTextInputFocusChanged`** event delegate:

```text
[ QuestWebViewComponent ] ──► ( Event OnTextInputFocusChanged )
                                       ├── WebView: UQuestWebViewComponent*
                                       └── bFocused: Boolean (True/False)
```

You can use `bFocused` to automatically show, hide, or dock your 3D VR Keyboard (e.g. `WBP_VirtualKeyboard`) in front of the active screen!

---

## 2. Inserting Text & Dispatching Keystrokes

### `SendText(Text)`
Inserts the provided string directly at the current cursor position in the focused HTML input.
* **Best used for:** Character typing buttons (`'A'`, `'B'`, `'1'`, `'@'`), voice-to-text dictation strings, or pasting URLs.

### `SendKey(Key)`
Dispatches native keyboard control keystrokes:

| `EQuestWebViewKey` Enum Value | Function |
| :--- | :--- |
| **`Backspace`** | Deletes character behind cursor. |
| **`Enter`** | Submits form or adds newline in textarea. |
| **`Tab`** | Advances focus to the next web input field. |
| **`Left / Right / Up / Down`** | Moves text selection cursor. |
| **`Delete`** | Deletes character ahead of cursor. |
| **`Home / End`** | Jumps to start/end of line. |
| **`Escape`** | Clears focus or closes web dialogs. |

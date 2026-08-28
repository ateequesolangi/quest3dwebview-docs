# Enums & Data Types

Reference for all enumeration types defined by **Quest 3D WebView**.

---

## `EQuestWebViewTouchAction`

Specifies the touch lifecycle phase for touch and pointer dispatchers.

```cpp
UENUM(BlueprintType)
enum class EQuestWebViewTouchAction : uint8
{
    Down = 0,    // Touch contact pressed
    Up = 1,      // Touch contact released
    Move = 2,    // Touch contact moved across surface
    Cancel = 3   // Touch gesture cancelled
};
```

---

## `EQuestWebViewKey`

Specifies virtual control keys for text inputs.

```cpp
UENUM(BlueprintType)
enum class EQuestWebViewKey : uint8
{
    Backspace = 0,
    Enter = 1,
    Tab = 2,
    Left = 3,
    Right = 4,
    Up = 5,
    Down = 6,
    Delete = 7,
    Home = 8,
    End = 9,
    Escape = 10
};
```

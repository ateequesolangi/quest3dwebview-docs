# VR Laser & W3C Hover Interaction

**Quest 3D WebView** features a complete input subsystem designed for VR motion controllers and hand tracking raycasts.

---

## 1. Laser Raycast UV Interaction

When pointing a VR motion controller laser at a 3D web screen:
1. Perform a standard **`LineTraceByChannel`** from the controller forward vector.
2. If the trace hits the screen mesh, call **`Find Collision UV`** to extract the normalized `(U, V)` intersection point:
   * `U`: `0.0` (Left) to `1.0` (Right)
   * `V`: `0.0` (Top) to `1.0` (Bottom)
3. Pass the `FVector2D` UV into Quest 3D WebView input nodes!

---

## 2. Interactive Nodes Reference

### `ClickUV(Vector2D UV)`
Performs a synthetic single click (Touch Down immediately followed by Touch Up) at the given normalized UV coordinate.
* **Best used for:** Primary trigger button clicks on links, buttons, and video thumbnails.

### `SendHoverEventUV(EQuestWebViewTouchAction Action, Vector2D UV)`
Dispatches W3C compliant hover and mouse move events to the webpage.
* **Dispatches:** Native Android `ACTION_HOVER_MOVE`, `ACTION_HOVER_ENTER`, `ACTION_HOVER_EXIT` as well as JavaScript `pointerover`, `pointerenter`, `pointermove`, and `mouseover` DOM events.
* **Result:** Web menus open on laser hover, buttons highlight, tooltips appear, and interactive charts animate!

### `SendTouchEventUV(EQuestWebViewTouchAction Action, Vector2D UV)`
Sends continuous touch down, touch move, or touch up events.
* **Supported Actions:** `Down`, `Move`, `Up`, `Cancel`.

### `BeginDragUV / DragToUV / EndDragUV`
Convenience nodes designed for dragging sliders, scrollbars, Trello cards, or Google Maps panoramas.

### `ScrollBy(int32 DeltaX, int32 DeltaY)`
Scrolls the active webpage horizontally or vertically in pixels.
* **Best used for:** Mapping the VR thumbstick / joystick directly to smooth web scrolling (e.g. `Thumbstick Y Axis * 50` $\to$ `DeltaY`).

---

## 3. Pixel-Space Input Nodes

For non-VR setups, standard 2D mouse pointers, or custom screen math, the plugin also provides direct pixel-space variants:
* `SendTouchEvent(Action, PixelX, PixelY)`
* `SendHoverEvent(Action, PixelX, PixelY)`

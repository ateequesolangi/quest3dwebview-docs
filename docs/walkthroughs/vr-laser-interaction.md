# Walkthrough 2: VR Laser Pointer Clicks & Hover

This tutorial demonstrates how to connect your VR Motion Controller's laser raycast to **Quest 3D WebView** for clicking and hovering.

---

## 🎯 Objective
Enable VR laser pointing so players can hover over web elements (triggering animations and drop-down menus) and click web links using the index trigger.

---

## 🛠️ Step 1: Continuous Laser Hover (Tick)

In your VR Character/Pawn (e.g. `VRPawn`), on **Event Tick**:

1. Perform a **`LineTraceByChannel`** from the right controller forward vector (e.g. Length = 500 cm).
2. If `Hit Result` hits an Actor containing a `QuestWebViewComponent`:
   * Call **`Find Collision UV`** on the Hit Result.
   * Check `UV.X >= 0.0` and `UV.Y >= 0.0`.
   * Call **`SendHoverEventUV(Action: Move, UV: HitUV)`** on the hit WebView component.

```text
[ Event Tick ] ──► [ LineTraceByChannel ] ──► ( Hit? ) ──► [ Find Collision UV ]
                                                                      │
                                                                      ▼
                                                       [ SendHoverEventUV (Move) ]
```

---

## 🛠️ Step 2: Trigger Clicks (InputAction)

When the player presses the VR Index Trigger:

1. On **`IA_Grab_Right (Started)`**:
2. From the last valid hit UV coordinate, call **`ClickUV(HitUV)`** on the target `QuestWebViewComponent`.

```text
[ EnhancedInputAction (Started) ] ──► [ ClickUV (HitUV) ]
```

::: tip No Zero-Coordinate Branching Needed
Connect the trigger action directly to `ClickUV` with the last valid trace UV to prevent dropped click events!
:::

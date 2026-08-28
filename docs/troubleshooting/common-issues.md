# Common Issues & Troubleshooting

Solutions to common questions and setup hiccups.

---

## 1. Web screen appears black on Meta Quest

* **Cause 1:** Material Shading Model is not set to `Unlit`.
  * *Fix:* Open your material asset, change Shading Model to **`Unlit`**, and ensure the texture parameter RGB connects to **`Emissive Color`**.
* **Cause 2:** Texture parameter name does not match.
  * *Fix:* Verify that the `TextureSampleParameter2D` name in your material matches `TextureMaterialParameterName` in the component Details Panel (Default: `WebViewTexture`).
* **Cause 3:** Mesh has no UV mapping.
  * *Fix:* Ensure the 3D mesh has UV coordinates mapped in UV Channel 0.

---

## 2. VR Laser pointer clicks are not registering

* **Cause:** `bSupportUVFromHitResults` is disabled in Unreal Physics Settings.
  * *Fix:* Open **Project Settings → Physics → Optimization** and check **`Support UV From Hit Results` = `True`**, or add `bSupportUVFromHitResults=True` to `DefaultEngine.ini`.

---

## 3. Web audio is muted or silent

* **Cause 1:** `Mute Audio` (`bMuted`) is checked in the Details Panel.
  * *Fix:* Select `QuestWebViewComponent` and uncheck `Mute Audio`.
* **Cause 2:** Web browser autoplay policy is blocking sound until user interaction.
  * *Fix:* Click the video or trigger `PlayMedia()` / `ClickUV()`.

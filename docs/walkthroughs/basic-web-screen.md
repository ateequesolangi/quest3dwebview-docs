# Walkthrough 1: Creating a Basic 3D Web Screen

This step-by-step tutorial guides you through creating a standalone 3D web screen Actor Blueprint from scratch.

---

## 🎯 Objective
Create a reusable `BP_WebScreen` actor that displays any web page on a 3D polygon and automatically manages dynamic material bindings.

---

## 🛠️ Step 1: Create the Screen Material
1. In Content Browser, create a Material named `M_WebScreen`.
2. Open `M_WebScreen` and set:
   * **Shading Model:** `Unlit`
   * **Responsive AA:** `True`
3. Add a **`TextureSampleParameter2D`** named `WebViewTexture`.
4. Connect `WebViewTexture (RGB)` to **Emissive Color**.
5. Save and apply.

---

## 🛠️ Step 2: Assemble the Actor Blueprint
1. Create a Blueprint Class based on **Actor**, name it `BP_WebScreen`.
2. In the Components hierarchy, add:
   * **`StaticMeshComponent`** (Set Static Mesh to `Plane`, scale to `(X: 1.92, Y: 1.08, Z: 1.0)` for a 16:9 ratio).
   * **`QuestWebViewComponent`**
3. Select `QuestWebViewComponent` and in the **Details Panel**:
   * Set **Initial URL** to `https://www.google.com`
   * Set **Material Asset** to `M_WebScreen`
   * Set **Width** to `1920` and **Height** to `1080`
   * Set **Target FPS** to `60.0`
4. Compile and Save.

---

## 🚀 Step 3: Test in VR
Drag `BP_WebScreen` into your level, put on your Meta Quest headset, and launch the project. You will see Google rendered in sharp 1080p directly in your virtual space!

import { editor, colorUtils } from 'express-document-sdk';
import React, { useEffect, useState, useRef } from 'react';
import AddOnSdk from "./sdk/addOnSdk";

export default function App() {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    AddOnSdk.ready.then(() => {
      console.log("AddOn SDK is ready!");
      setSdkReady(true);
    });
  }, []);

  const handleAddText = async () => {
    if (!sdkReady) return;

    await (AddOnSdk.app.document as any).addText({
      text: "Hello from React + TypeScript!",
      style: { fontSize: 32, fontFamily: "Arial", fillColor: "#000000" }
    });
  };



const handleDrawSquare = async () => {
    if (!sdkReady) return;

    // Create a rectangle in the Adobe Express Document
    const rect = editor.createRectangle(); // Use the editor API to create a rectangle
    rect.width = 100;
    rect.height = 100;
    rect.fill = editor.makeColorFill(colorUtils.fromHex("#0000FF")); // Set fill color to blue
    rect.translation = { x: 50, y: 50 }; // Set position

    // Append the rectangle to the current insertion parent in the document
    editor.context.insertionParent.children.append(rect);
};


  return (
    <div style={{ padding: "20px" }}>
      <h1>Figma to Adobe Express Add-on 🚀</h1>
      <button
        onClick={handleAddText}
        style={{ padding: "12px 24px", fontSize: "18px", marginTop: "20px", cursor: "pointer" }}
      >
        Add Text to Document
      </button>
      <button
        onClick={handleDrawSquare}
        style={{ padding: "12px 24px", fontSize: "18px", marginTop: "20px", cursor: "pointer" }}
      >
        Draw Blue Rectangle
      </button>
    </div>
  );
}

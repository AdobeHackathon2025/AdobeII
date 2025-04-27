import React from 'react';
import { useEffect, useState } from "react";
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Figma to Adobe Express Add-on 🚀</h1>
      <button 
        onClick={handleAddText} 
        style={{ padding: "12px 24px", fontSize: "18px", marginTop: "20px", cursor: "pointer" }}
      >
        Add Text to Canvas
      </button>
    </div>
  );
}

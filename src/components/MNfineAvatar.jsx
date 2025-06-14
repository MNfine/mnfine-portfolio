import React from "react";

const AVATAR_URL = "./avatar-mnfine.png"; // path

export default function MNfineAvatar({ size = 320 }) {
  return (
    <div style={{
      width: size,
      position: "relative",
      display: "inline-block",
      filter: "drop-shadow(0 0 30px #22c55e)",
    }}>
      <img
        src={AVATAR_URL}
        alt="MNfine Pixel Art Avatar"
        width={size}
        height={size}
        style={{
          borderRadius: 16,
          width: size,
          height: size,
          background: "#222",
          display: "block"
        }}
      />
      {/* Overlay chữ MNfine */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: size / 8,
        letterSpacing: 2,
        color: "#fff",
        textShadow: "0 0 12px #22c55e, 0 0 3px #22c55e",
        borderRadius: 10,
        padding: "2px 0",
        margin: "0 40px",
      }}>
        MNfine
      </div>
    </div>
  );
}

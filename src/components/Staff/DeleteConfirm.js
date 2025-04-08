import React from "react";

export function DeleteConfirm({ memberName, onCancel, onConfirm }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          width: "400px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ height: "8px", backgroundColor: "#F28B82" }} />

        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            Delete Member?
          </h2>

          <p style={{ margin: "0.75rem 0", lineHeight: 1.4 }}>
            Are you sure you want to delete <em>{memberName}</em>?<br />
            You cannot undo this action.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1.5rem"
            }}
          >
            <button
              onClick={onCancel}
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#555" 
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: "#F28B82",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

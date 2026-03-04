import { useState } from "react";

export default function PromptForm({ setResult }) {
  const [selectedType, setSelectedType] = useState(0);
  const [tone, setTone] = useState("Friendly");
  const [context, setContext] = useState("");

  const types = [
    "Button Text",
    "Error Message",
    "Tooltip Content",
    "Onboarding",
    "Empty State",
    "Heading",
    "A11y/Alt",
  ];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px" }}>
      {/* Main Content */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{ fontSize: "30px", fontWeight: "bold", margin: "0 0 12px 0" }}
        >
          What are we writing?
        </h2>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Select your parameters and let AI craft the perfect microcopy.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {types.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedType(i)}
            style={{
              padding: "24px",
              border:
                selectedType === i ? "2px solid #22c55e" : "1px solid #e5e7eb",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: selectedType === i ? "#f0fdf4" : "white",
              color: selectedType === i ? "#16a34a" : "black",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>✦</div>
            <p style={{ fontWeight: "500", margin: 0, fontSize: "14px" }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Tone of Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <option>Friendly</option>
              <option>Professional</option>
              <option>Playful</option>
            </select>
          </div>

          <div>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Context / Scenario
            </label>
            <input
              value={context}
              onChange={(e) => setContext(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              placeholder="e.g. Shopping cart checkout button"
            />
          </div>
        </div>

        <button
          onClick={async () => {
            if (!context.trim()) {
              setResult("Please enter some context.");
              return;
            }
            try {
              setResult("Generating...");
              const resp = await fetch("http://localhost:5000/api/ux-buddy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userMessage: `${tone} tone ${types[selectedType]}: ${context}`,
                }),
              });
              if (!resp.ok) {
                setResult("Backend error: " + resp.statusText);
                return;
              }
              const data = await resp.json();
              if (data.aiReply) {
                setResult(data.aiReply);
              } else if (data.error) {
                setResult("AI error: " + data.error);
              } else {
                setResult("No reply from AI.");
              }
            } catch (err) {
              setResult("Failed to fetch AI result: " + err.message);
            }
          }}
          style={{
            width: "100%",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a34a")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#22c55e")}
        >
          ✨ Generate UX Copy
        </button>
      </div>
    </div>
  );
}

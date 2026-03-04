import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ResultCard({ result }) {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', marginTop: 0 }}>AI Result</h2>

      {/* Results Panel */}
      {result && (
        <div className="results-wrapper">
          <div className="result-card">

            {/* body */}
            {typeof result === 'string' ? (
              // split plain-text response into lines for better readability
              result.split('\n').map((line, idx) => (
                <p key={idx} style={{ fontSize: '18px', lineHeight: '1.6', margin: '6px 0', whiteSpace: 'pre-wrap' }}>
                  {line}
                </p>
              ))
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Array.isArray(result.suggestions)
                    ? result.suggestions.map((suggestion, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                          <p style={{ margin: 0, flex: 1 }}>{suggestion}</p>
                          <button
                            style={{ marginLeft: '12px' }}
                            onClick={() => copyToClipboard(suggestion, `result-${idx}`)}
                          >
                            {copiedId === `result-${idx}`
                              ? <Check className="icon success" />
                              : <Copy className="icon" />
                            }
                          </button>
                        </div>
                      ))
                    : null}
                </div>

                {result.explanation && (
                  <p className="result-explanation">
                    {result.explanation}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

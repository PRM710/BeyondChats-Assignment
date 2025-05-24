export default function PolicyViewer({ policyText }) {
  return (
    <div className="policy-viewer">
      <h2>Refund Policy</h2>
      <div className="policy-content">
        {policyText.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
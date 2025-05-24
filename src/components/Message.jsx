export default function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-bubble">
        {text}
      </div>
    </div>
  );
}
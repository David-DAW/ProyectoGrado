// components/Alert.js
export default function Alert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-70 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="font-bold hover:text-amber-300"
      >
        &times;
      </button>
    </div>
  );
}

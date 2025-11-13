import { X } from 'lucide-react';

const SuccessPopup = ({ message, onClose, onAcknowledge }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Success!
          </h3>

          <p className="text-gray-600 mb-6">
            {message}
          </p>

          <button
            onClick={onAcknowledge}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;

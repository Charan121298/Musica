export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-5000 flex justify-center pt-10 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700 max-h-max overflow-auto">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Confirm Logout
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-5">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Button({ children, className = "", ...props }) {
    return (
      <button className={`px-4 py-2 rounded text-white font-medium transition duration-300 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 ${className}`} {...props}>
        {children}
      </button>
    );
  }
  
export default function TextInput({ type = "text", name, placeholder, onChange, required }) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded"
      />
    );
  }
  
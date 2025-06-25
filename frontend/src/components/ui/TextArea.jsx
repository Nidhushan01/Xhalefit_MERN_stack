export default function TextArea({ name, placeholder, onChange, required }) {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded"
      />
    );
  }
  
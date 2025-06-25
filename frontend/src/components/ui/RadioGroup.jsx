export default function RadioGroup({ label, name, options, onChange }) {
    return (
      <fieldset className="border p-3">
        <legend className="font-semibold">{label}</legend>
        {options.map((option) => (
          <label key={option} className="mr-4">
            <input type="radio" name={name} value={option} onChange={onChange} /> {option}
          </label>
        ))}
      </fieldset>
    );
  }
  
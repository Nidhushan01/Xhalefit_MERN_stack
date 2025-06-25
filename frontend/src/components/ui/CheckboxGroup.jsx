export default function CheckboxGroup({ label, name, options, onChange, selectedValues }) {
    return (
      <fieldset className="border p-3">
        <legend className="font-semibold">{label}</legend>
        {options.map((option) => (
          <label key={option} className="block">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={selectedValues.includes(option) || false}
              onChange={onChange}
            />{" "}
            {option}
          </label>
        ))}
      </fieldset>
    );
  }
  
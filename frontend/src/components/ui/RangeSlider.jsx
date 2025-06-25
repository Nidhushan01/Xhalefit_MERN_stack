export default function RangeSlider({ label, name, min, max, value, onChange }) {
    return (
      <div>
        <label className="block">{label}</label>
        <input type="range" name={name} min={min} max={max} step="1" onChange={onChange} className="w-full" />
        <div className="text-center text-lg font-semibold">{value}</div>
      </div>
    );
  }
  
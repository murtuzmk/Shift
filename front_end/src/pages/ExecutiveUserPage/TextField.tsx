function TextField({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const currentValue = 10; /* replace this with the actual value from the backend */
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          defaultValue={currentValue}
          onChange={onChange}
          className="border-2 border-gray-200"
        />
      </label>
    </div>
  );
}
export default TextField;

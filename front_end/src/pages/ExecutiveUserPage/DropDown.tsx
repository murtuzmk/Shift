function Dropdown({ options, onSelect }: { options: any[], onSelect: (value: any) => void }) {
    return (
        <select
            onChange={onSelect}
            className="border border-gray-300 rounded-md text-gray-700 py-2 px-4"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
export default Dropdown;

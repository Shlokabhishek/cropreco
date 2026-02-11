import "./Input.css";

type Props = {
	label: string;
	value: string | number;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
};

const Input = ({ label, value, onChange, placeholder, type = "text", disabled = false }: Props) => (
	<label className="input">
		<span className="input__label">{label}</span>
		<input
			className="input__field"
			value={value}
			type={type}
			placeholder={placeholder}
			onChange={(e) => onChange(e.target.value)}
			disabled={disabled}
		/>
	</label>
);

export default Input;

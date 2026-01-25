import "./Button.css";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({ label, onClick, type = "button", disabled = false }: Props) => (
  <button className="btn" type={type} onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

export default Button;
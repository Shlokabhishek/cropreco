import { ReactNode } from "react";
import "./Card.css";

type Props = {
	title?: string;
	children: ReactNode;
};

const Card = ({ title, children }: Props) => (
	<div className="card">
		{title ? <h3 className="card__title">{title}</h3> : null}
		<div className="card__body">{children}</div>
	</div>
);

export default Card;

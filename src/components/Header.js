import React from "react";
import "./Header.css";

const Header = ({ formats }) => {
	return (
		<header>
			{formats.map(
				(format, index) =>
					format && (
						<button
							key={index}
							onClick={(event) => {
								event.preventDefault();
							}}
						>
							{format}
						</button>
					)
			)}
		</header>
	);
};

export default Header;

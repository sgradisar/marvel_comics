import React from "react";
import "./Header.css";

const Header = ({ formats, setSelectedFormat }) => {
	return (
		<header>
			{formats.map(
				(format, index) =>
					format && (
						<button
							key={index}
							onClick={(event) => {
								event.preventDefault();
								setSelectedFormat(format);
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

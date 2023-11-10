import React, { useState } from "react";
import "./Header.css";

const Header = ({ formats, setSelectedFormat }) => {
	const [activeFormat, setActiveFormat] = useState("All");

	const handleClick = (event, format) => {
		event.preventDefault();
		setSelectedFormat(format);
		setActiveFormat(format);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const resetFilter = () => {
		setSelectedFormat("All");
		setActiveFormat("All");
	};

	return (
		<header className="header">
			<div className="header--container">
				<div className="logo" onClick={resetFilter}>
					<div className="logo--container">
						<img
							src={process.env.PUBLIC_URL + "/marvel-logo.png"}
							alt="Marvel"
						/>
					</div>
				</div>
				<div className="filters">
					{formats.map(
						(format, index) =>
							format && (
								<button
									className={`btn-filter ${
										format === activeFormat ? "active" : ""
									}`}
									key={index}
									onClick={(event) => handleClick(event, format)}
								>
									{format}
								</button>
							)
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;

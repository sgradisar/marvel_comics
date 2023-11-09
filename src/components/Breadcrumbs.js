import React from "react";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ selectedFormat }) => {
	return (
		<div className="breadcrumbs">
			<div className="breadcrumbs--container">
				<span className="bc-main">Home</span>
				{selectedFormat !== "All" && (
					<span className="bc-item">{"> " + selectedFormat + "s"}</span>
				)}
			</div>
		</div>
	);
};

export default Breadcrumbs;

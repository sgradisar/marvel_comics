import React from "react";

const Breadcrumbs = ({ selectedFormat }) => {
	return (
		<div className="breadcrumbs">
			<span className="bc-main">Home</span>
			{selectedFormat !== "All" && (
				<span className="bc-item">{selectedFormat + "s"}</span>
			)}
		</div>
	);
};

export default Breadcrumbs;

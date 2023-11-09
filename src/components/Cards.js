import React from "react";
import Card from "./Card";

const Cards = ({ data, selectedFormat, lastItemObserver }) => {
	return (
		<div className="cards">
			{data
				?.filter(
					(item) => selectedFormat === "All" || item.format === selectedFormat
				)
				.map((item, index) => (
					<Card
						key={index}
						item={item}
						index={index}
						dataLength={data.length}
						lastItemObserver={lastItemObserver}
					/>
				))}
		</div>
	);
};

export default Cards;

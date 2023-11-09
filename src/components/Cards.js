import React from "react";
import Card from "./Card";
import "./Cards.css";

const Cards = ({
	data,
	selectedFormat,
	lastItemObserver,
	setSelectedItem,
	setIsModalOpen,
}) => {
	return (
		<div className="cards">
			<div className="cards--container">
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
							setSelectedItem={setSelectedItem}
							setIsModalOpen={setIsModalOpen}
						/>
					))}
			</div>
		</div>
	);
};

export default Cards;

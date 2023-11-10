import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Cards.css";

const Cards = ({
	data,
	selectedFormat,
	lastItemObserver,
	setSelectedItem,
	setIsModalOpen,
}) => {
	const [exchangeRate, setExchangeRate] = useState(null);

	// we are fetching exchange rate only once
	useEffect(() => {
		fetch(
			"https://v6.exchangerate-api.com/v6/3024c009143cea84a65ea442/latest/USD"
		)
			.then((response) => response.json())
			.then((data) => setExchangeRate(data.conversion_rates.EUR));
	}, []);

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
							exchangeRate={exchangeRate}
						/>
					))}
			</div>
		</div>
	);
};

export default Cards;

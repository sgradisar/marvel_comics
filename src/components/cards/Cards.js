import React, { useEffect, useState } from "react";
import { fetchExchangeRate } from "../../services/services";
import Card from "./Card";
import "./Cards.css";

let cachedExchangeRate = null;

const Cards = ({
	data,
	selectedFormat,
	lastItemObserver,
	setSelectedItem,
	setIsModalOpen,
}) => {
	const [exchangeRate, setExchangeRate] = useState(null);

	// we are fetching exchange rate using fetchExchangeRate function from services.js
	useEffect(() => {
		if (cachedExchangeRate) {
			setExchangeRate(cachedExchangeRate);
		} else {
			fetchExchangeRate().then((data) => {
				cachedExchangeRate = data.conversion_rates.EUR;
				setExchangeRate(cachedExchangeRate);
			});
		}
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

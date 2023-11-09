import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({
	item,
	index,
	lastItemObserver,
	dataLength,
	setSelectedItem,
	setIsModalOpen,
}) => {
	const [exchangeRate, setExchangeRate] = useState(null);

	useEffect(() => {
		fetch(
			"https://v6.exchangerate-api.com/v6/3024c009143cea84a65ea442/latest/USD"
		)
			.then((response) => response.json())
			.then((data) => setExchangeRate(data.conversion_rates.EUR));
	}, []);

	const priceInEuros = exchangeRate
		? (item.prices[0]?.price * exchangeRate).toFixed(2)
		: "Loading...";

	return (
		<div
			key={index}
			className="card"
			ref={index === dataLength - 1 ? lastItemObserver : null}
		>
			<div
				className="card--container"
				onClick={() => {
					setSelectedItem(item);
					setIsModalOpen(true);
				}}
			>
				<div className="image">
					<div className="image--container">
						<img
							src={item.thumbnail.path + "." + item.thumbnail.extension}
							alt={item.title}
						/>
					</div>
				</div>
				<div className="content">
					<div className="content--container">
						<h2>{item.title}</h2>
						<span className="price">{priceInEuros} €</span>
						<span className="btn-more">More info</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

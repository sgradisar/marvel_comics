import React from "react";
import "./Card.css";

const Card = ({
	item,
	index,
	lastItemObserver,
	dataLength,
	setSelectedItem,
	setIsModalOpen,
	exchangeRate,
}) => {
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

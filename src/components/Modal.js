import React, { useEffect, useState } from "react";
import "./Modal.css";

let cachedExchangeRate = null;

const Modal = ({ item, onClose }) => {
	const [exchangeRate, setExchangeRate] = useState(null);
	const [imageUrl, setImageUrl] = useState(
		window.innerWidth < 640 ? "/landscape_incredible." : "/portrait_fantastic."
	);

	// we are fetching exchange rate only once
	useEffect(() => {
		if (cachedExchangeRate) {
			setExchangeRate(cachedExchangeRate);
		} else {
			fetch(
				"https://v6.exchangerate-api.com/v6/3024c009143cea84a65ea442/latest/USD"
			)
				.then((response) => response.json())
				.then((data) => {
					cachedExchangeRate = data.conversion_rates.EUR;
					setExchangeRate(cachedExchangeRate);
				});
		}
	}, []);

	// we are changing the image url depending on the screen size
	useEffect(() => {
		const handleResize = () => {
			setImageUrl(
				window.innerWidth < 640
					? "/landscape_incredible."
					: "/portrait_fantastic."
			);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const priceInEuros = exchangeRate
		? (item.prices[0]?.price * exchangeRate).toFixed(2)
		: "Loading...";

	// we are extracting relaease year from the title because api doesn't provide it as "onsaleDate" doesnt make sense
	// because it is not the release date of the comic (for example comic has year 2010 in the title, but year 2029 in the onsaleDate).
	// focDate is also completely wrong ("-0001-11-30T00:00:00-0500")
	const match = item.title.match(/\((\d{4})\)/);
	const releaseYear = match ? match[1] : "Not specified";

	// we are closing the modal when the user presses the "esc" key
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		// Add 'keydown' event listener
		window.addEventListener("keydown", handleKeyDown);

		// Clean up event listener on unmount
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div className="modal" onClick={onClose}>
			<div className="modal--container" onClick={(e) => e.stopPropagation()}>
				<div className="image">
					<div className="image--container">
						<img
							src={item.thumbnail.path + imageUrl + item.thumbnail.extension}
							alt={item.title}
							loading="lazy"
							style={{ opacity: 0, transition: "opacity 0.5s" }}
							onLoad={(e) => {
								e.target.style.opacity = 1;
							}}
						/>
					</div>
				</div>
				<div className="content">
					<div className="content--container">
						<h2>{item.title}</h2>

						<div className="description">
							<p>
								<strong>Year of release:</strong> {releaseYear}
							</p>
							<p>
								<strong>Format:</strong> {item.format}
							</p>
							{item.pageCount ? (
								<p>
									<strong>Pages:</strong> {item.pageCount}
								</p>
							) : null}
							{item.characters.items.length > 0 ? (
								// we are showing only first 3 characters
								<p>
									<strong>Characters:</strong>{" "}
									{item.characters.items
										.slice(0, 3)
										.map((character) => character.name)
										.join(", ")}
									{item.characters.items.length > 3 ? " ..." : ""}
								</p>
							) : null}
							{item.creators.items.length > 0 ? (
								// we are showing only first 3 characters
								<p>
									<strong>Creators:</strong>{" "}
									{item.creators.items
										.slice(0, 3)
										.map((creator) => `${creator.name} (${creator.role})`)
										.join(", ")}
									{item.creators.items.length > 3 ? " ..." : ""}
								</p>
							) : null}
							{item.diamondCode ? (
								<p>
									<strong>Diamond Code:</strong> {item.diamondCode}
								</p>
							) : null}
						</div>
						<div className="options">
							<span className="price">{priceInEuros} €</span>
							<button className="btn-close" onClick={onClose}>
								Close
							</button>
						</div>
						<button className="close-x" onClick={onClose}></button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;

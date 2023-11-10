import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Card.css";

const Card = ({
	item,
	index,
	lastItemObserver,
	dataLength,
	setSelectedItem,
	setIsModalOpen,
	exchangeRate,
	isLoading,
}) => {
	const priceInEuros = exchangeRate
		? (item.prices[0]?.price * exchangeRate).toFixed(2)
		: "Loading...";

	const [hasAnimated, setHasAnimated] = useState(false);
	const cardRef = useRef(null);

	// we are animating the cards when they are in the viewport
	useEffect(() => {
		const currentRef = cardRef.current;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						gsap.from(currentRef, {
							autoAlpha: 0,
							scale: 0.8,
							ease: "power3.out",
							duration: 1,
						});
						setHasAnimated(true);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [hasAnimated]);

	// we are observing the last item in the list to fetch more data when the user scrolls to the bottom of the page
	useEffect(() => {
		if (index === dataLength - 1 && !isLoading) {
			lastItemObserver(cardRef.current);
		}
	}, [index, dataLength, isLoading, lastItemObserver]);

	return (
		<div key={index} className="card" ref={cardRef}>
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
							src={
								item.thumbnail.path +
								"/portrait_medium." +
								item.thumbnail.extension
							}
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

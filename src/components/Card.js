import React from "react";

const Card = ({ item, index }) => {
	return (
		<div key={index} className="card">
			<span>{index}</span>
			<h2>{item.title}</h2>
			<p>{item.description}</p>
			<p>{item.format}</p>
			<img
				src={item.thumbnail.path + "." + item.thumbnail.extension}
				alt={item.title}
			/>
		</div>
	);
};

export default Card;

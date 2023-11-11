import axios from "axios";
import md5 from "crypto-js/md5";

export const fetchData = (publicKey, privateKey) => {
	const timestamp = Number(new Date());
	const hash = md5(timestamp + privateKey + publicKey).toString();

	const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=24`;

	return axios.get(url);
};

export const fetchMoreData = (publicKey, privateKey, itemsToShow) => {
	const timestamp = Number(new Date());
	const hash = md5(timestamp + privateKey + publicKey).toString();
	const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=24&offset=${itemsToShow}`;

	return axios.get(url);
};

export const fetchExchangeRate = () => {
	return fetch(
		"https://v6.exchangerate-api.com/v6/3024c009143cea84a65ea442/latest/USD"
	).then((response) => response.json());
};

import axios from "axios";
import md5 from "crypto-js/md5";
import { useEffect, useState, useRef, useCallback } from "react";

import "./Loader.css";
import Header from "./components/Header";
import Breadcrumbs from "./components/Breadcrumbs";
import Cards from "./components/Cards";
import Modal from "./components/Modal";

function App() {
	const publicKey = process.env.REACT_APP_PUBLIC_KEY;
	const privateKey = process.env.REACT_APP_PRIVATE_KEY;
	const [formats, setFormats] = useState([]);
	const [data, setData] = useState(null);
	const [selectedFormat, setSelectedFormat] = useState("All");
	const [itemsToShow, setItemsToShow] = useState(24);
	const lastItemRef = useRef(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// initial data fetching
	useEffect(() => {
		const timestamp = Number(new Date());
		const hash = md5(timestamp + privateKey + publicKey).toString();

		const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=24`;

		axios
			.get(url)
			.then((response) => {
				setData(response.data.data.results);
				const uniqueFormats = [
					"All",
					...new Set(response.data.data.results.map((item) => item.format)),
				];
				setFormats(uniqueFormats);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [publicKey, privateKey]);

	const [isFetching, setIsFetching] = useState(false);

	// we are fetching data only when the user scrolls to the bottom of the page
	const fetchData = useCallback(() => {
		setIsFetching(true);
		setIsLoading(true);
		const timestamp = Number(new Date());
		const hash = md5(timestamp + privateKey + publicKey).toString();
		const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=24&offset=${itemsToShow}`;

		axios
			.get(url)
			.then((response) => {
				setData((prevData) => [...prevData, ...response.data.data.results]);
				const newFormats = response.data.data.results.map(
					(item) => item.format
				);
				setFormats((prevFormats) =>
					Array.from(new Set([...prevFormats, ...newFormats]))
				);
				setItemsToShow(
					(prevItemsToShow) =>
						prevItemsToShow + response.data.data.results.length
				);
				setIsLoading(false);
				setIsFetching(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
				setIsFetching(false);
			});
	}, [itemsToShow, publicKey, privateKey]);

	// we are observing the last item in the list to fetch more data when the user scrolls to the bottom of the page
	const lastItemObserver = useCallback(
		(node) => {
			if (lastItemRef.current) lastItemRef.current.disconnect();

			lastItemRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !isLoading && !isFetching) {
					setItemsToShow((prevItemsToShow) => prevItemsToShow + 24);
					fetchData();
				}
			});

			if (node) lastItemRef.current.observe(node);
		},
		[fetchData, isLoading, isFetching]
	);

	return (
		<div className="App">
			<Header formats={formats} setSelectedFormat={setSelectedFormat} />
			<Breadcrumbs selectedFormat={selectedFormat} />
			<Cards
				data={data}
				selectedFormat={selectedFormat}
				lastItemObserver={lastItemObserver}
				setSelectedItem={setSelectedItem}
				setIsModalOpen={setIsModalOpen}
			/>

			{isModalOpen && (
				<Modal item={selectedItem} onClose={() => setIsModalOpen(false)} />
			)}

			{isLoading && (
				<div className="loader">
					<div className="spinner"></div>
					<span className="text">Loading ...</span>
				</div>
			)}
		</div>
	);
}

export default App;

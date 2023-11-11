import { useEffect, useState, useRef, useCallback } from "react";
import { fetchData as fetchInitialData, fetchMoreData } from "../services";
import "../Loader.css";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import Cards from "./Cards";
import Modal from "./Modal";

const Home = () => {
	//const publicKey = process.env.REACT_APP_PUBLIC_KEY;
	//const privateKey = process.env.REACT_APP_PRIVATE_KEY;

	// moved the keys here for simplicity so you don't have to create a .env file.
	// can send the .env file via different channel if needed :)
	const publicKey = "2cf650c7b6f61d7308a26794007ceb83";
	const privateKey = "a7ffa074937010ac54e75ac555fb253859da40ce";
	const [formats, setFormats] = useState([]);
	const [data, setData] = useState(null);
	const [selectedFormat, setSelectedFormat] = useState("All");
	const [itemsToShow, setItemsToShow] = useState(24);
	const lastItemRef = useRef(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isInitLoading, setIsInitLoading] = useState(false);

	// initial data fetching
	useEffect(() => {
		setIsInitLoading(true);

		fetchInitialData(publicKey, privateKey)
			.then((response) => {
				setData(response.data.data.results);
				const uniqueFormats = [
					"All",
					...new Set(response.data.data.results.map((item) => item.format)),
				];
				setFormats(uniqueFormats);
				setIsInitLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setIsInitLoading(false);
			});
	}, [publicKey, privateKey]);

	const [isFetching, setIsFetching] = useState(false);

	// we are fetching data only when the user scrolls to the bottom of the page
	const fetchData = useCallback(() => {
		setIsFetching(true);
		setIsLoading(true);

		fetchMoreData(publicKey, privateKey, itemsToShow)
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
			{isInitLoading && (
				<div className="init-loader">
					<div className="init-spinner"></div>
					<span className="init-text">Loading ...</span>
				</div>
			)}

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
					<span className="text">Loading more ...</span>
				</div>
			)}
		</div>
	);
};

export default Home;

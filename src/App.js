import axios from "axios";
import md5 from "crypto-js/md5";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Cards from "./components/Cards";

function App() {
	const publicKey = process.env.REACT_APP_PUBLIC_KEY;
	const privateKey = process.env.REACT_APP_PRIVATE_KEY;
	const [formats, setFormats] = useState([]);
	const [data, setData] = useState(null);
	const [selectedFormat, setSelectedFormat] = useState("All");

	useEffect(() => {
		const timestamp = Number(new Date());
		const hash = md5(timestamp + privateKey + publicKey).toString();

		const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=20`;

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

	return (
		<div className="App">
			<Header formats={formats} setSelectedFormat={setSelectedFormat} />
			<Cards data={data} selectedFormat={selectedFormat} />
		</div>
	);
}

export default App;

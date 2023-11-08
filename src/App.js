import axios from "axios";
import md5 from "crypto-js/md5";
import { useEffect, useState } from "react";

import Header from "./components/Header";

function App() {
	const publicKey = process.env.REACT_APP_PUBLIC_KEY;
	const privateKey = process.env.REACT_APP_PRIVATE_KEY;
	const [formats, setFormats] = useState([]);

	useEffect(() => {
		const timestamp = Number(new Date());
		const hash = md5(timestamp + privateKey + publicKey).toString();
		const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=20`;

		axios
			.get(url)
			.then((response) => {
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
			<Header formats={formats} />
		</div>
	);
}

export default App;

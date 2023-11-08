import md5 from "crypto-js/md5";

async function fetchComics() {
	const publicKey = process.env.REACT_APP_PUBLIC_KEY;
	const privateKey = process.env.REACT_APP_PRIVATE_KEY;
	const timestamp = Number(new Date());

	const hash = md5(timestamp + privateKey + publicKey).toString();

	try {
		const response = await fetch(
			`https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Fetch error: ", error);
	}
}

function App() {
	fetchComics().then((data) => console.log(data));

	return <div className="App"></div>;
}

export default App;

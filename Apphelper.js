module.exports={
	API_URL:'https://localhost:3000',
	getAccessToken:() => localStorage.getItem('token'),
	toJSON: (response) => response.json()
}

export default {
	apiUrl: "http://localhost:5000/api",
	async fetchResponse(method, path, body) {
		let responseStatus = null;
		let responseData = null;
		await fetch(`${this.apiUrl}/${path}`, {
			method,
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body
		}).then(async response => {
			responseStatus = response.status;
			if (responseStatus >= 200 && responseStatus < 300) {
				responseData = await response.json();
			}
			else if (responseStatus >= 400) {
				responseData = await response.text();
				if (!responseData) {
					responseData = responseStatus < 500 ?
						"Something is wrong with the input" :
						"An unexpected error occurred in the server"
				}
			}
		}).catch(async ex => {
			status = 400;
			responseData = ex.message;
		});
		return {
			status: responseStatus,
			data: responseData
		};
	}
};
import library from "../library";

export default class {
	static async edit(id, handle, email, createNew) {
		let method = createNew ? "post" : "patch";
		let path = `user/${createNew ? `add` : `update/${id}`}`;
		let body = createNew ?
			JSON.stringify({
				id,
				handle,
				email
			}) :
			JSON.stringify([
				{ op: "replace", path: "handle", value: handle },
				{ op: "replace", path: "email", value: email }
			]);
		let response = await library.fetchResponse(method, path, body);
		return response;
	}

	static async get(id) {
		let response = await library.fetchResponse("get", `user/get/${id}`);
		return response;
	}

	static async delete(id) {
		let response = await library.fetchResponse("delete", `user/delete/${id}`);
		return response;
	}
}
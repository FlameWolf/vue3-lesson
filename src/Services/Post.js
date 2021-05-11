import library from "../library";

export default class {
	static async edit(id, userId, content, createNew) {
		let method = createNew ? "post" : "patch";
		let path = `post/${createNew ? `add` : `update/${id}`}`;
		let body = createNew ?
			JSON.stringify({
				id,
				userId,
				content
			}) :
			JSON.stringify([
				{ op: "replace", path: "userId", value: userId },
				{ op: "replace", path: "content", value: content }
			]);
		let response = await library.fetchResponse(method, path, body);
		return response;
	}

	static async get(id) {
		let response = await library.fetchResponse("get", `post/get/${id}`);
		return response;
	}

	static async delete(id) {
		let response = await library.fetchResponse("delete", `post/delete/${id}`);
		return response;
	}
}
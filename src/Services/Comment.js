import library from "../library";

export default class {
	static async edit(id, postId, userId, content, createNew) {
		let method = createNew ? "comment" : "patch";
		let path = `comment/${createNew ? `add` : `update/${id}`}`;
		let body = createNew ?
			JSON.stringify({
				id,
				postId,
				userId,
				content
			}) :
			JSON.stringify([
				{ op: "replace", path: "postId", value: postId },
				{ op: "replace", path: "userId", value: userId },
				{ op: "replace", path: "content", value: content }
			]);
		let response = await library.fetchResponse(method, path, body);
		return response;
	}

	static async get(id) {
		let response = await library.fetchResponse("get", `comment/get/${id}`);
		return response;
	}

	static async delete(id) {
		let response = await library.fetchResponse("delete", `comment/delete/${id}`);
		return response;
	}
}
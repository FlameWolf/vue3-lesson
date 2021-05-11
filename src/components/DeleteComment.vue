<template>
	<table class="table table-responsive table-borderless">
		<thead>
			<tr>
				<td>ID:</td>
				<td>
					<input type="text" class="form-control" v-model="id" required="required"/>
				</td>
				<td>
					<input type="button" class="btn btn-primary" value="Find" @click="get(id)"/>
				</td>
			</tr>
		</thead>
		<tbody v-if="found">
			<tr>
				<td>ID:</td>
				<td>{{ response.id }}</td>
			</tr>
			<tr>
				<td>Post ID:</td>
				<td>{{ response.postId }}</td>
			</tr>
			<tr>
				<td>User ID:</td>
				<td>{{ response.userId }}</td>
			</tr>
			<tr>
				<td>Content:</td>
				<td>{{ response.content }}</td>
			</tr>
			<tr>
				<td>&#xA0;</td>
				<td>
					<input type="button" class="btn btn-danger" value="Delete" @click="confirmDelete(response.id)"/>
				</td>
			</tr>
		</tbody>
	</table>
	<DismissableAlert v-if="!found && response" ref="alert" :message="response"/>
</template>

<script>
	import { reactive } from "vue";
	import DismissableAlert from "./DismissableAlert.vue"
	import Comment from "../Services/Comment";
	export default {
		components: {
			DismissableAlert
		},
		data() {
			return reactive({
				id: "",
				response: null,
				found: false
			});
		},
		methods: {
			async get(id) {
				if (!id) {
					this.found = false;
					this.response = "ID cannot be blank";
				}
				else {
					let response = await Comment.get(id);
					this.found = (response.status === 200);
					this.response = response.data;
					response = null;
				}
				if (!this.found && this.response) {
					this.$refs.alert?.show();
				}
			},
			async delete(id) {
				let response = await Comment.delete(id);
				if (response.status === 200) {
					this.found = false;
					this.response = "Comment deleted";
				}
				response = null;
			},
			async confirmDelete(id) {
				let reply = confirm(`Are you sure you want to delete the comment whose ID is ${id}?`);
				if (reply) {
					await this.delete(id);
				}
				this.$refs.alert?.show();
			}
		}
	};
</script>
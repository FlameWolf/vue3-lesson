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
				<td>Handle:</td>
				<td>{{ response.handle }}</td>
			</tr>
			<tr>
				<td>Email:</td>
				<td>{{ response.email }}</td>
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
	import User from "../Services/User";
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
					let response = await User.get(id);
					this.found = (response.status === 200);
					this.response = response.data;
					response = null;
				}
				if (!this.found && this.response) {
					this.$refs.alert?.show();
				}
			},
			async delete(id) {
				let response = await User.delete(id);
				if (response.status === 200) {
					this.found = false;
					this.response = "User deleted";
				}
				response = null;
			},
			async confirmDelete(id) {
				let reply = confirm(`Are you sure you want to delete the user whose ID is ${id}?`);
				if (reply) {
					await this.delete(id);
				}
				this.$refs.alert?.show();
			}
		}
	};
</script>
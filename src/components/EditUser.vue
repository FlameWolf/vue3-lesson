<template>
	<table class="table table-responsive table-borderless">
		<tbody>
			<tr>
				<td>ID:</td>
				<td>
					<input type="text" class="form-control" v-model="id" :readonly="!createMode"/>
				</td>
			</tr>
			<tr>
				<td>Handle:</td>
				<td>
					<input type="text" class="form-control" v-model="handle" required="required"/>
				</td>
			</tr>
			<tr>
				<td>Email:</td>
				<td>
					<input type="text" class="form-control" v-model="email" required="required"/>
				</td>
			</tr>
			<tr>
				<td>&#xA0;</td>
				<td>
					<input type="button" class="btn btn-primary" value="Save" @click="update"/>
				</td>
			</tr>
		</tbody>
	</table>
	<DismissableAlert v-if="response" ref="alert" :message="response"/>
</template>

<script>
	import { reactive } from "vue";
	import DismissableAlert from "./DismissableAlert.vue"
	import User from "../Services/User";
	export default {
		components: {
			DismissableAlert
		},
		props: {
			id: Number,
			handle: String,
			email: String,
			createMode: Boolean
		},
		data() {
			return reactive({
				id: this.id,
				handle: this.handle,
				email: this.email,
				response: null
			});
		},
		methods: {
			async update() {
				let response = await User.edit(this.id, this.handle, this.email, this.createMode);
				switch (response.status) {
					case 200:
						this.response = "User updated";
						break;
					case 201:
						this.response = "User created";
						break;
					default:
						this.response = response.data;
						break;
				}
				this.$refs.alert?.show();
				response = null;
			}
		}
	};
</script>
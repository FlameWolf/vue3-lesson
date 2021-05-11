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
				<td>User ID:</td>
				<td>
					<input type="text" class="form-control" v-model="userId" required="required"/>
				</td>
			</tr>
			<tr>
				<td>Content:</td>
				<td>
					<input type="text" class="form-control" v-model="content" required="required"/>
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
	import Post from "../Services/Post";
	export default {
		components: {
			DismissableAlert
		},
		props: {
			id: Number,
			userId: Number,
			content: String,
			createMode: Boolean
		},
		data() {
			return reactive({
				id: this.id,
				userId: this.userId,
				content: this.content,
				response: null
			});
		},
		methods: {
			async update() {
				let response = await Post.edit(this.id, this.userId, this.content, this.createMode);
				switch (response.status) {
					case 200:
						this.response = "Post updated";
						break;
					case 201:
						this.response = "Post created";
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
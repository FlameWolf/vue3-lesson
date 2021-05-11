<template>
	<div id="editorModal" class="modal fade show" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit User</h5>
					<button type="button"
						class="close"
						data-dismiss="modal"
						data-target="#editorModal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<component :is="`EditUser`" v-bind="userToEdit"/>
				</div>
			</div>
		</div>
	</div>
	<table class="table table-responsive table-borderless">
		<thead>
			<tr>
				<td>ID:</td>
				<td>
					<input type="text" class="form-control" v-model="id"/>
				</td>
				<td>
					<input type="button" class="btn btn-primary" value="Find" @click="get(id)"/>
				</td>
			</tr>
		</thead>
		<tbody v-if="Array.isArray(response)">
			<template v-for="item in currentPage">
				<tr>
					<td>ID:</td>
					<td>{{ item.id }}</td>
				</tr>
				<tr>
					<td>Handle:</td>
					<td>{{ item.handle }}</td>
				</tr>
				<tr>
					<td>Email:</td>
					<td>{{ item.email }}</td>
				</tr>
				<tr>
					<td>&#xA0;</td>
					<td>
						<input type="button"
							class="btn btn-secondary"
							value="Edit"
							@click="showEdit(item.id, item.handle, item.email)"
							data-toggle="modal"
							data-target="#editorModal"/>
					</td>
				</tr>
			</template>
		</tbody>
		<tbody v-else v-if="found">
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
					<input type="button"
						class="btn btn-secondary"
						value="Edit"
						@click="showEdit(response.id, response.handle, response.email)"
						data-toggle="modal"
						data-target="#editorModal"/>
				</td>
			</tr>
		</tbody>
	</table>
	<pagination v-if="Array.isArray(response)"
		v-model="pageIndex"
		:records="recordCount"
		:per-page="5"
		:options="{
			chunk: 5,
			edgeNavigation: true,
			format: false,
			texts: {
				count: ``,
				first: ``,
				last: ``
			}
		}"
		@paginate="updatePage"/>
	<DismissableAlert v-if="!found && response" ref="alert" :message="response"/>
</template>

<script>
	import { reactive } from "vue";
	import DismissableAlert from "./DismissableAlert.vue"
	import EditUser from "./EditUser.vue";
	import User from "../Services/User";
	import Pagination from "v-pagination-3";
	export default {
		components: {
			EditUser,
			DismissableAlert,
			Pagination
		},
		data() {
			return reactive({
				id: "",
				response: null,
				found: false,
				currentPage: null,
				pageIndex: 0,
				userToEdit: null
			});
		},
		methods: {
			async get(id) {
				let response = await User.get(id);
				this.response = response.data;
				this.found = (response.status === 200);
				if (!this.found) {
					this.$refs.alert?.show();
				}
				else {
					this.pageIndex = 1;
					if (Array.isArray(this.response)) {
						this.updatePage(1);
					}
				}
				response = null;
			},
			async showEdit(id, handle, email) {
				this.userToEdit = {
					id,
					handle,
					email,
					createMode: false
				};
			},
			updatePage(event) {
				let index = ((event - 1) * 5);
				this.currentPage = this.response?.slice(index, (index + 5));
			}
		},
		computed: {
			recordCount() {
				return (this.response?.length || 0);
			}
		}
	};
</script>
<template>
	<div id="editorModal" class="modal fade show" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit Comment</h5>
					<button type="button"
						class="close"
						data-dismiss="modal"
						data-target="#editorModal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<component :is="`EditComment`" v-bind="commentToEdit"/>
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
					<td>Post ID:</td>
					<td>{{ item.postId }}</td>
				</tr>
				<tr>
					<td>User ID:</td>
					<td>{{ item.userId }}</td>
				</tr>
				<tr>
					<td>Content:</td>
					<td>{{ item.content }}</td>
				</tr>
				<tr>
					<td>&#xA0;</td>
					<td>
						<input type="button"
							class="btn btn-secondary"
							value="Edit"
							@click="showEdit(item.id, item.postId, item.userId, item.content)"
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
					<input type="button"
						class="btn btn-secondary"
						value="Edit"
						@click="showEdit(response.id, response.postId, response.userId, response.content)"
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
	import EditComment from "./EditComment.vue";
	import Comment from "../Services/Comment";
	import Pagination from "v-pagination-3";
	export default {
		components: {
			EditComment,
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
				commentToEdit: null
			});
		},
		methods: {
			async get(id) {
				let response = await Comment.get(id);
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
			async showEdit(id, postId, userId, content) {
				this.commentToEdit = {
					id,
					postId,
					userId,
					content,
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
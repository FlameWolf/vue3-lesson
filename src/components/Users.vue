<template>
	<div class="show inverse" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<ul class="nav nav-pills" @click="selectLink">
						<li class="nav-item">
							<a class="nav-link active" href="javascript:void(0);" data-component="edit">Add User</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="javascript:void(0);" data-component="get">Find/Edit User</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="javascript:void(0);" data-component="delete">Delete User</a>
						</li>
					</ul>
				</div>
				<div class="modal-body">
					<div>
						<keep-alive>
							<component :is="currentComponent" v-bind="currentProperties"/>
						</keep-alive>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { reactive } from "vue";
	import EditUser from "./EditUser.vue";
	import GetUser from "./GetUser.vue";
	import DeleteUser from "./DeleteUser.vue";
	export default {
		components: {
			EditUser,
			GetUser,
			DeleteUser
		},
		data() {
			return reactive({
				currentComponent: null,
				currentProperties: null
			});
		},
		mounted() {
			this.currentComponent = "EditUser";
			this.currentProperties = { createMode: true };
		},
		methods: {
			selectLink(event) {
				let currentElemet = event.target;
				currentElemet.parentNode.parentNode.querySelectorAll("a").forEach(x => x.classList.remove("active"));
				currentElemet.classList.add("active");
				switch (currentElemet.dataset["component"]) {
					case "edit":
						this.currentComponent = "EditUser";
						this.currentProperties = { createMode: true };
						break;
					case "get":
						this.currentComponent = "GetUser";
						this.currentProperties = null;
						break;
					case "delete":
						this.currentComponent = "DeleteUser";
						this.currentProperties = null;
						break;
					default:
						break;
				}
				currentElemet = null;
			}
		}
	};
</script>
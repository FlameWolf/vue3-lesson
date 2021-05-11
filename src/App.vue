<template>
	<ul class="nav navbar navbar-dark bg-dark nav-pills" @click="showComponent">
		<li class="nav-item">
			<a class="nav-link active" href="javascript:void(0);" data-component="users">Users</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="javascript:void(0);" data-component="posts">Posts</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="javascript:void(0);" data-component="comments">Comments</a>
		</li>
	</ul>
	<component :is="currentComponent"/>
</template>

<script>
	import { reactive } from "vue";
	import Users from "./components/Users.vue";
	import Posts from "./components/Posts.vue";
	import Comments from "./components/Comments.vue";
	export default {
		components: {
			Users,
			Posts,
			Comments
		},
		data() {
			return reactive({
				currentComponent: null
			});
		},
		mounted() {
			this.currentComponent = "Users";
		},
		methods: {
			showComponent(event) {
				let currentElemet = event.target;
				currentElemet.parentNode.parentNode.querySelectorAll("a").forEach(x => x.classList.remove("active"));
				currentElemet.classList.add("active");
				switch (currentElemet.dataset["component"]) {
					case "users":
						this.currentComponent = "Users";
						break;
					case "posts":
						this.currentComponent = "Posts";
						break;
					case "comments":
						this.currentComponent = "Comments";
						break;
					default:
						break;
				}
				currentElemet = null;
			}
		}
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
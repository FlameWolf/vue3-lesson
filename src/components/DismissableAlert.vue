<template>
	<div ref="alert" class="alert alert-primary alert-dismissible" role="alert">
		<span>{{ message }}</span>
		<button type="button" class="close" aria-label="Close" @click="hide">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
</template>

<script>
	import { reactive } from "vue";
	export default {
		props: {
			message: Object
		},
		data() {
			return reactive({
				message: this.message
			});
		},
		methods: {
			show() {
				let classList = this.$refs.alert.classList;
				classList.remove("fade");
				classList.add("show");
				classList = null;
			},
			hide() {
				let classList = this.$refs.alert.classList;
				classList.remove("show");
				classList.add("fade");
				classList = null;
			}
		}
	};
</script>
<style scoped>
	
</style>
<template>
	<div>
		<v-header>
			<router-link slot="logo" to="/home">
				<div class="logo">
					<img :src="logo" alt="" height="40" width="73">
				</div>
			</router-link>
			<router-link slot="right" v-if="user.username" to="/home">{{user.username}}</router-link>
		</v-header>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
		data() {
			return {
			}
		},
        computed: mapState({ user: state => state.user })
    }
</script>
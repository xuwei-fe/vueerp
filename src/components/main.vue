<style lang="less" scoped>
	
</style>
<template>
	<main class="page-prod page-prod-col">
		首页
	<main>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        computed: mapState({ user: state => state.user }),
    }
</script>
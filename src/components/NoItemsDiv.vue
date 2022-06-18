<template>
	<div class="no-items text-center ma-4">
		<span>There are no {{ items }} here currently...</span>
	</div>
</template>

<script>
export default {
	name: 'NoItemsDiv',
	props: {
		items: String
	}
}
</script>

<style scoped>
.no-items {
	height: 48px;
	line-height: 36px;
	color: #595959;
}
</style>

<template>
	<v-container absolute fluid class="main-content">
		<span>TO DO LISTS: OK</span>
		<ToDoListItem/>
	</v-container>
</template>

<script>
import ToDoListItem from '@/components/ToDoListItem.vue'

export default {
	name: 'ToDoListsView',
	components: {
		ToDoListItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>

<template>
	<v-card color="#E3EAEF" width="250" min-height="350" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<div class="todolists-header pa-3">
			<v-card-title class="py-2 justify-center text-center text-break">{{ toDoList.title }}</v-card-title>
			<div class="flex-head">
				<v-card-subtitle class="px-2 py-0">{{ toDoList.date }}</v-card-subtitle>
				<v-icon v-if="toDoList.type === 'repeating'" icon class="px-2 py-0">mdi-repeat</v-icon>
				<v-icon v-else-if="toDoList.type === 'one-time'" icon class="px-2 py-0">mdi-repeat-once</v-icon>
			</div>
		</div>
		<div class="flex-main pa-3">
			<v-card-text v-for="item in toDoList.items.slice(0, 5)"  v-bind:key="item.ObjectId" class="pa-1">
				<v-icon v-if="item.completed === true" icon>mdi-checkbox-marked-circle</v-icon>
				<v-icon v-if="item.completed === false" icon>mdi-checkbox-blank-circle-outline</v-icon>
				<span class="px-2">{{ item.name }}</span>
			</v-card-text>
			<v-card-text v-if="toDoList.items.length > 5" class="pa-0 ml-9">
				<v-icon icon color="#000000">mdi-dots-horizontal</v-icon>
			</v-card-text>
		</div>
		<v-spacer></v-spacer>
		<v-card-text v-if="toDoList.completed === true" class="pa-2 text-center completed">COMPLETED</v-card-text>
		<v-card-actions class="flex-bottom pa-3">
			<IconEdit/>
			<IconDelete itemType="to-do list" itemCaptionType="title" :itemName="toDoList.title" />
		</v-card-actions>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue'
import IconEdit from '@/components/IconEdit.vue'

export default {
	name: 'ToDoListItem',
	mounted() {
		if (this.toDoList.completed) console.log(this.toDoList);
	},
	props: {
		toDoList: Object
	},
	components: {
		IconDelete,
		IconEdit
	}
}
</script>

<style scoped>
.todolists-header {
	background-color: #A5D4FF;
}
.flex-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.flex-main {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.completed {
	font-size: 20px;
	font-weight: bold;
	color: #FF6F6F !important;
}
</style>

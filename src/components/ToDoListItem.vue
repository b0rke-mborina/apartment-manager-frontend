<template>
	<v-card color="#E3EAEF" width="250" min-height="350" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<router-link :to="{ name: 'todolist-detail-modification', params: { id: toDoList._id } }"
						 class="router-link todolists-header pa-3">
			<!-- To-do list item title and date -->
			<v-card-title class="py-2 justify-center text-center text-break">{{ toDoList.title }}</v-card-title>
			<div class="text-center">
				<v-card-subtitle class="px-2 py-0">{{ convertDate(toDoList.date) }}</v-card-subtitle>
			</div>
		</router-link>
		<router-link :to="{ name: 'todolist-detail-modification', params: { id: toDoList._id } }" class="router-link flex-main pa-3">
			<!-- List of to-do list items -->
			<v-card-text v-for="item in toDoList.items.slice(0, 4)" v-bind:key="item._id" class="pa-1">
				<v-icon v-if="item.completed === true" icon>mdi-checkbox-marked-circle</v-icon>
				<v-icon v-if="item.completed === false" icon>mdi-checkbox-blank-circle-outline</v-icon>
				<span class="px-2">{{ item.name }}</span>
			</v-card-text>
			<!-- Three dots icon in case there are more than 5 items in to-do list -->
			<v-card-text v-if="toDoList.items.length > 4" class="pa-0 ml-9 dots">
				<v-icon icon color="#000000">mdi-dots-horizontal</v-icon>
			</v-card-text>
			<!-- Text on bottom about completion of to-do list (visible only if to-do list is completed) -->
			<v-spacer></v-spacer>
			<v-card-text v-if="toDoList.completed === true" class="pa-2 text-center completed">COMPLETED</v-card-text>
		</router-link>
		<!-- Main action icons -->
		<v-card-actions class="flex-bottom pa-3">
			<router-link :to="{ name: 'todolist-detail-modification', params: { id: toDoList._id } }" class="router-link">
				<IconEdit/>
			</router-link>
			<IconDelete itemType="to-do list" itemCaptionType="title" :itemName="toDoList.title"
							service="todolist" :_id="toDoList._id" />
		</v-card-actions>
	</v-card>
</template>

<script>
import { convertDate } from "@/services";

import IconEdit from '@/components/IconEdit.vue';
import IconDelete from '@/components/IconDelete.vue';

export default {
	name: 'ToDoListItem',
	methods: {
		// imported function for converting date
		convertDate
	},
	props: {
		toDoList: Object
	},
	components: {
		IconEdit,
		IconDelete
	}
}
</script>

<style scoped>
.todolists-header {
	background-color: #A5D4FF;
}
.flex-main {
	height: 196px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.dots {
	width: 80%;
}
.completed {
	font-size: 20px;
	font-weight: bold;
	color: #FF6F6F !important;
}
</style>

<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<div class="notes-header pt-3">
			<v-card-title v-if="!item" class="pt-1 justify-center text-break">Calendars</v-card-title>
			<v-card-title v-else class="pt-1 justify-center text-break">{{ item.title }}</v-card-title>
		</div>
		<div class="flex-div text-center">
			<v-card-text v-if="!item">Check your calendars</v-card-text>
			<v-card-text v-else-if="item.aspect === 'important'">
				You have {{ item.number }} {{ item.aspect }} notes
			</v-card-text>
			<v-card-text v-else-if="item.aspect === 'not completed'">
				You have {{ item.number }} {{ item.aspect }} to do lists
			</v-card-text>
		</div>
		<v-spacer></v-spacer>
		<div class="text-center">
			<router-link v-if="!item" to="/calendar" class="router-link">
				<ButtonSeeMore notElevated />
			</router-link>
			<router-link v-else :to="item.link" class="router-link">
				<ButtonSeeMore notElevated />
			</router-link>
		</div>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue'
import IconEdit from '@/components/IconEdit.vue'
import ButtonSeeMore from '@/components/ButtonSeeMore.vue'

export default {
	name: 'DashboardItem',
	props: {
		item: Object
	},
	components: {
		IconDelete,
		IconEdit,
		ButtonSeeMore
	}
}
</script>

<style scoped>
.notes-header {
	background-color: #A5D4FF;
}
.note-body {
	white-space: pre;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>

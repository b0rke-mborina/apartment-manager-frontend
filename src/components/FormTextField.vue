<template>
	<v-text-field v-if="readonly === true" :value="text"
					  solo rounded dense readonly
					  background-color="#A5D4FF">
		{{ text }}
	</v-text-field>
	<v-text-field v-else-if="readonly === false" :value="text" :label="label"
					  solo rounded
					  clearable clear-icon="mdi-close-circle"
					  background-color="#A5D4FF">
		{{ text }}
	</v-text-field>
</template>

<script>
export default {
	name: 'FormTextField',
	props: {
		text: String,
		label: String,
		readonly: Boolean
	}
}
</script>

<style scoped>

</style>

<template>
	<v-text-field v-if="readonly === true" :value="text" label="Solo" solo dense readonly background-color="#A5D4FF">
		{{ text }}
	</v-text-field>
	<v-text-field v-else-if="readonly === false" :value="text" label="Solo" solo dense background-color="#A5D4FF">
		{{ text }}
	</v-text-field>
</template>

<script>
export default {
	name: 'FormTextField',
	props: {
		text: String,
		readonly: Boolean
	}
}
</script>

<style scoped>

</style>

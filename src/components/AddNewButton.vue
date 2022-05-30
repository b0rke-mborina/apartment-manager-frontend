<template>
	<div class="text-center">
		<v-btn elevation="2" fab text large class="my-4 add-new-btn">
			<v-icon color="#000000">mdi-plus</v-icon>
		</v-btn>
	</div>
</template>

<script>
export default {
	name: 'AddNewButton',
	props: {
		
	}
}
</script>

<style scoped>
.add-new-btn {
	background-color: #A5D4FF;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

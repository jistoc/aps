<template>
	<div id="main">
		<div class='lista-wrapper'>
			<listanoticia-component></listanoticia-component>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import ListaNoticiaComponent from './listanoticia-component.vue';
	export default {
		components: {
            'listanoticia-component': ListaNoticiaComponent
        }
	}
</script>
<style>
	.lista-wrapper{
		padding: 20px;
	}
</style>
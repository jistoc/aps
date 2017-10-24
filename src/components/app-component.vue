<template>
	<div id="main">

		<toolbar-component></toolbar-component>
		<menu-component></menu-component>	
		<router-view></router-view>
	</div>
</template>
<script>
	import ListaNoticiaComponent from './listanoticia-component.vue';
	import MenuComponent from './menu-component.vue';
	import ToolbarComponent from './toolbar-component.vue';
	export default {
		components: {
            'listanoticia-component': ListaNoticiaComponent,
            'menu-component' : MenuComponent,
            'toolbar-component' : ToolbarComponent
        }
	}
</script>
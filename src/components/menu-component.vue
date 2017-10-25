<template>
	<md-sidenav class="md-left"  ref="leftSidenav">
	    <md-toolbar>
	        <h3 class="md-title">Categorias</h3>
	    </md-toolbar>

	    <md-list>
	    	<md-list-item v-if="matched" v-for="c in categorias" v-bind:key='c.editions[0].key' v-on:click="buscar(c.editions[0].id)">
		       <span>{{c.webTitle}}</span>
	      	</md-list-item>
	      	<md-list-item v-if="!matched" v-on:click="voltar">
	      		<md-icon>reply</md-icon> <span>Voltar</span>
	      	</md-list-item>
	    </md-list>
	</md-sidenav>
</template>

<script>
	export default {
		beforeMount() {
			this.getCategorias();
		},
		created() {
			Eventos.$on('abrir', () => {
				try{
				
					this.$refs.leftSidenav.toggle();

				} catch(e){

				}

			});
			
		},
		data : () => {
			return {
				categorias : null
			}
		},
		computed: {
	  		matched: function() {
	    		return this.$route.path.indexOf('/n') == 0 || this.$route.path.indexOf('/n1') || this.$route.path.indexOf('/n2') ;
	    	}
	  	},
		methods : {
			getCategorias() {	

				if(router.history.current.name=='n'){

					Array.prototype.move = function (old_index, new_index) {
					    if (new_index >= this.length) {
					        var k = new_index - this.length;
					        while ((k--) + 1) {
					            this.push(undefined);
					        }
					    }
					    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
					    return this; 
					};	

					let end = 'https://content.guardianapis.com/sections?api-key=9fbd5f25-2937-4e90-9d15-6a0e8a688fed';


					this.$http.get(end)
						.then( result => {
							let aux = result.data.response.results;
							this.categorias = aux.move(aux.map(function(el) {
																  return el.editions[0].id;
																}).indexOf("technology"),0)
					})
				}


			},
	    	buscar(cat) {
	    		Eventos.$emit('buscar', {texto: null, categoria : cat});
	    		this.$refs.leftSidenav.toggle();
	    	},
	    	voltar(){
	    		router.push({name : 'n'})
	    	}
		}
	}
</script>
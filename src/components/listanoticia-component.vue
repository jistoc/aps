<template>
	<div class='lista-wrapper'>
		<div class='paginas' v-if="pagina!==0 && lista.length>0">
			<button v-if="pagina>1" v-on:click="paginar(1)">Primeira</button>
	
			<button v-if="pagina>1" v-on:click="paginar(pagina-1)">Anterior</button>
			<button v-else disabled v-on:click="paginar(pagina-1)">Anterior</button>

			página {{pagina}} de {{paginas}}

			<button v-if="(pagina+1)<paginas" v-on:click="paginar(pagina+1)">Próxima</button>

			<button v-if="(pagina+1)<=paginas" v-on:click="paginar(paginas)">Última</button>

		</div>
		<div v-else >
			<center>nenhum resultado</center>
		</div>
		<md-layout :md-gutter="8">
			<noticiacard-component  v-for='n in lista' v-bind:key='n.id'
				v-bind:titulo='n.webTitle'
				v-bind:data='n.webPublicationDate'
				v-bind:thumbnail='n.fields.thumbnail'
				v-bind:url='n.id'
				>
				
			</noticiacard-component>
			
		</md-layout>
		<div class='paginas' v-if="pagina!==0 && lista.length>0">
			<button v-if="pagina>1" v-on:click="paginar(1)">Primeira</button>
	
			<button v-if="pagina>1" v-on:click="paginar(pagina-1)">Anterior</button>
			<button v-else disabled v-on:click="paginar(pagina-1)">Anterior</button>

			página {{pagina}} de {{paginas}}

			<button v-if="(pagina+1)<paginas" v-on:click="paginar(pagina+1)">Próxima</button>

			<button v-if="(pagina+1)<=paginas" v-on:click="paginar(paginas)">Última</button>

		</div>

		<router-view></router-view>
	</div>
</template>


<script>
	import NoticiaCardComponent from './noticiacard-component.vue';
	export default {
		beforeMount(){
			this.buscar({texto:null,categoria:'technology'});
		},
		created() {

			Eventos.$on('buscar', (busca) => {
				this.buscar(busca);
			});

		},
		data : () => {
			return {
				lista : null,
				paginas : 0,
				pagina : 0,
				string_busca : null,
				cat : null
			}
		},
		components: {
            'noticiacard-component': NoticiaCardComponent,
        },
        methods : {
        	buscar(busca){
				let end = 'https://content.guardianapis.com/search?';
				if(busca.texto){

					end += 'q='+busca.texto+'&';
				}
				end += 'show-fields=thumbnail,shortUrl&api-key=9fbd5f25-2937-4e90-9d15-6a0e8a688fed';
				if(busca.pagina){
					end += '&page=' + busca.pagina;
				}
				if(busca.categoria){
					end += '&section=' + busca.categoria
				}

				this.string_busca = busca.texto;
				this.cat = busca.categoria;

				this.$http.get(end)
					.then( result => {
						this.lista = result.data.response.results;
						this.paginas = result.data.response.pages;
						this.pagina = result.data.response.currentPage;						
				})
        	},
        	paginar(p){
        		this.pagina = p;
        		this.buscar({texto : this.string_busca, pagina : p, categoria:this.cat });
        	}
        }
	}
</script>

<style >
	.paginas {
		margin: 20px 20px 0px 20px;  
		background-color: #E0E0E0;
		padding: 7px;
		border-radius: 3px;
		text-align: center;
	}
	.lista-wrapper{
		padding: 20px;
	}
</style>
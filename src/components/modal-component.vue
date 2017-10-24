<template>
	<div>
		<md-dialog :md-click-outside-to-close='optfechar' ref="diag">
		  	<md-dialog-title>{{titulo}}</md-dialog-title>

		 
		  	<md-dialog-content>
		  		<div id="ops">
		  			<md-button @click="teste">
						<md-icon v-bind:class="fav.class">{{fav.icon}}</md-icon>
					</md-button>
		  			<md-button  v-if="isLista" @click="remover_lista">
						<md-icon class="md-size-2x md-primary">playlist_add_check</md-icon>
					</md-button>
		  		</div>
	  			
				<div>
					<center>
						<md-image v-if="thumbnail" :md-src="thumbnail"></md-image>
					 	<md-image v-else src="http://via.placeholder.com/600x200"></md-image>
					</center>
				</div>
				<div class="conteudo">
					<p>
						{{texto}}
					</p>
				</div>
			</md-dialog-content>

			<md-dialog-actions>
				<md-button class="md-primary" @click="fechar()">Fechar</md-button>
			</md-dialog-actions>
		</md-dialog>

		<md-snackbar md-position="top center" ref="snack_modal" md-duration="4000">
			<span>{{msg}}</span>
			<md-button class="md-warn" @click="fechar_snack">Fechar</md-button>
		</md-snackbar>
	</div>
	
</template>

<script>
	export default {
		methods: {
			openDialog() {
			 	this.$refs['diag'].open()

			},
			fechar() {
			  	router.go(-1);
			},
			abrirModal(){

				let end = 'https://content.guardianapis.com';
				
	  		 	for (let c in this.$route.params) {
				  	end += '/'+this.$route.params[c];
				}

				end += '?api-key=9fbd5f25-2937-4e90-9d15-6a0e8a688fed&show-fields=bodyText,thumbnail';

				this.$http.get(end)
						.then( result => {
							this.titulo = result.data.response.content.webTitle;
							this.thumbnail = result.data.response.content.fields.thumbnail;
							this.texto = result.data.response.content.fields.bodyText;
							this.openDialog();
						});
			},
			teste(){
				if(this.fav.icon=='star_border'){
					this.fav.icon='star';
					this.fav.class='md-size-2x md-warn'
				} else{
					this.fav.icon='star_border';
					this.fav.class='md-size-2x md-primary';
				}
			},
			remover_lista(){
				db.collection("leitura").doc(this.id).delete().then(function() {
				    Eventos.$emit('remLN', true);
				}).catch(function(error) {
					Eventos.$emit('remLN', false);
				});
			},
			fechar_snack(){
				this.$refs.snack_modal.close();
			}
		},
		data : () => {
			return {
				titulo : null,
				thumbnail : null,
				texto : null,
				optfechar : false,
				fav : {
					icon : 'star_border',
					class : 'md-size-2x md-primary'
				},
				isLista : false,
				id : false,
				msg : ''
			}
		},
		created() {
			this.abrirModal();
			console.log(router.history.current.path);
			db.collection("leitura")
			.where('userId','==',auth.currentUser.uid)
			.where('id','==', router.history.current.path.slice(1))
			.get()
			.then( result => {
				if(result.docs.length==0)
					this.isLista = false;
				else{
					this.isLista = true;
					this.id = result.docs[0].id;
				}
			})
			.catch(err =>{
				console.log(err);
			});
			Eventos.$on('remLN', op => {
				if(op){
					this.msg='Notícia removida da lista!';
					this.isLista = false;
				} else {
					this.msg = 'Falha ao remover notícia da lista!';
				}
				this.$refs.snack_modal.open();
			})
		}
	}
</script>
<style>
	.conteudo{
		text-align: justify;
		margin:25px;
	}
	#ops{
		text-align: right;
	}
</style>
<template>
	<div>
		<md-dialog :md-click-outside-to-close='optfechar' ref="diag">
			<md-dialog-title>{{titulo}}</md-dialog-title>


			<md-dialog-content>
				<div id="ops">
					<md-button @click="favorito">
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
					</p><br>
					<hr>
					<h3><strong>Comentários</strong></h3>
					<comentario-component v-for="c in comentarios" 
						v-bind:key="c.id" 
						v-bind:texto="c.texto" 
						v-bind:id="c.id" >	
					</comentario-component>
					<form novalidate @submit.stop.prevent="comentar">
						<md-input-container>
							<label>Comentário</label>
							<md-textarea maxlength="70" v-model="novo_comentario"></md-textarea>
						</md-input-container>
						<md-button  type="submit" class="md-raised md-primary" id="btn-coment">
							Enviar 

							<i class="material-icons" id="comentario">comment</i>
						</md-button>

					</form>
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

import ComentarioComponent from './comentario-component.vue';
export default {
	methods: {
		openDialog() {
			this.$refs['diag'].open()

		},
		fechar() {
			this.fechar_snack();
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
				this.data = result.data.response.content.webPublicationDate;
				this.openDialog();
			});
		},
		favorito(){
			if(!this.id_fav){
				db.collection("favoritos").add({
					thumbnail : this.thumbnail,
					webTitle: this.titulo,
					webPublicationDate : this.data,
					id : router.history.current.path,
					userId : auth.currentUser.uid
				})
				.then( doc => {
					this.fav.icon='star';
					this.fav.class='md-size-2x md-warn'
					this.id_fav = doc.id;
				})
				.catch(error => {

				});
			} else {
				console.log(this.id_fav);
				db.collection("favoritos")
				.doc(this.id_fav)
				.delete()
				.then(() => {

					this.fav.icon='star_border';
					this.fav.class='md-size-2x md-primary';
					this.id_fav = false;
				}).catch(function(error) {
					console.log(error)
				});
			}
		},
		remover_lista(){
			db.collection("leitura").doc(this.id_lista)
			.delete()
			.then(() => {
				this.msg='Notícia removida da lista!';
				this.isLista = false;
				this.$refs.snack_modal.open();
			}).catch(function(error) {
				this.msg = 'Falha ao remover notícia da lista!';
				this.$refs.snack_modal.open();
			});
		},
		fechar_snack(){
			this.$refs.snack_modal.close();
		},
		comentar(){
			if(this.novo_comentario.trim()!==''){
				db.collection("comentarios").add({
					texto : this.novo_comentario,
					userId : auth.currentUser.uid,
					noticia : router.history.current.path

				})
				.then( doc => {
					this.novo_comentario = ''
					
				})
				.catch(error => {
					this.msg='Falha ao inserir comentário!';
					this.$refs.snack_modal.open();
				});
			}
		}
	},
	data : () => {
		return {
			titulo : null,
			thumbnail : null,
			texto : null,
			optfechar : false,
			fav : {
				icon : '',
				class : ''
			},
			isLista : false,
			id_fav : false,
			id_lista : false,
			data : '',
			msg : '',
			novo_comentario : '',
			comentarios : []
		}
	},
	created() {



		this.abrirModal();	
		db.collection("leitura")
		.where('userId','==',auth.currentUser.uid)
		.where('id','==', router.history.current.path)
		.get()
		.then( result => {
			if(result.docs.length==0)
				this.isLista = false;
			else{
				this.isLista = true;
				this.id_lista = result.docs[0].id;
			}
		})
		.catch(err =>{
			console.log(err);
		});



		db.collection("favoritos")
		.where('userId','==',auth.currentUser.uid)
		.where('id','==', router.history.current.path)
		.get()
		.then( result => {
			if(result.docs.length==0){
				this.fav.icon ='star_border';
				this.fav.class = 'md-size-2x md-primary'
				this.id_fav = false;
			} else {
				this.fav.icon =	 'star';
				this.fav.class = 'md-size-2x md-warn'
				this.id_fav = result.docs[0].id;
			}
		})
		.catch(err =>{
			console.log(err);
		});

		db.collection("comentarios")
		.where('userId','==',auth.currentUser.uid)
		.where('noticia', '==',router.history.current.path)
		.onSnapshot( docs => {
			this.comentarios = [];
			docs.forEach( doc => {
				this.comentarios.push({
					texto : doc.data().texto,
					id : doc.id
				})
			})
		})
	},
	components: {
        'comentario-component': ComentarioComponent
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
#comentario{
	position:relative;
	top:0.5rem;
	left: 0.3rem;
}
#btn-coment{
float:right;
margin-right: 0
}
</style>
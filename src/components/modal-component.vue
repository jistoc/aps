<template>
	<div>
		<md-dialog :md-click-outside-to-close='optfechar' ref="diag">
		  	<md-dialog-title>{{titulo}}</md-dialog-title>

		 
		  	<md-dialog-content>
				<div>
					<center>
						<md-image v-if="thumbnail" :md-src="thumbnail"></md-image>
					 	<img v-else src="http://via.placeholder.com/600x200">
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
	</div>
	
</template>

<script>
	export default {
		methods: {
			openDialog() {
			 	this.$refs['diag'].open()

			},
			fechar() {
			  	router.push({ name: 'home'});
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
			}
		},
		data : () => {
			return {
				titulo : null,
				thumbnail : null,
				texto : null,
				optfechar : false
			}
		},
		created() {
			this.abrirModal();
		}
	}
</script>
<style>
	.conteudo{
		text-align: justify;
		margin:25px;
	}
</style>
<template>
	<div class="wrapper">
		<md-layout md-gutter="16">
			<md-layout md-flex-large="33"  md-flex-offset-large="33" md-flex-medium="60" md-flex-offset-medium="20"md-flex-xsmall="90"  md-flex-offset-xsmall="5" md-flex-small="80" md-flex-offset-small="10">
				<div id="msg" v-if="msg.status" :class="msg.classe">{{msg.texto}}</div>
				<md-card md-with-hover class="card-wrapper">
					<md-card-header>
						<div class="md-title">Nova Conta</div>
					</md-card-header>

					<md-card-content>

						<form @submit.prevent="criarConta">
							<md-input-container >
								<label>E-mail</label>
								<md-input type="email"  v-model="email"></md-input>
							</md-input-container>
							<md-input-container >
								<label>Senha</label>
								<md-input type="password"  v-model="senha"></md-input>
							</md-input-container>
						</form>
						
					</md-card-content>

					<md-card-actions>
						<md-button class="md-raised md-primary" @click="login">Login</md-button>&nbsp;&nbsp;
						<md-button class="md-raised md-primary" @click="criarConta">Criar</md-button>
					</md-card-actions>
				</md-card>
			</md-layout>
		</md-layout>
	</div>
</template>

<script>
export default {
	data: () => {
		return { 
			email: '',
			senha: '',
			msg : {
				classe : '',
				texto : '',
				status : false
			}
		}
	},
	methods : {
		criarConta(){
			auth.createUserWithEmailAndPassword(this.email,this.senha)
			.then( user => {
				router.push({name:'home'});
			})
			.catch( err => {
				console.log(err);
				this.msg.status = true;
				this.msg.classe = 'falha';
				switch(err.code){
					case 'auth/weak-password' : 
						this.msg.texto = 'Senha inválida!';
						break;
					case 'auth/invalid-email' : 
						this.msg.texto = 'E-mail inválido!';
						break;
					case 'auth/email-already-in-use' :
						this.msg.texto = 'E-mail já cadastrado!';
						break;
					default : 
						this.msg.texto = 'Falha ao criar conta!';
						break;

				}
			})
		},
		login(){
			router.push({name:'login'});
		}
	}
}
</script>

<style>
.wrapper{
	margin-top: 2em;
}
.card-wrapper{
	width:100%;
}
.falha {
	background-color : #FFCCBC;
}
.sucesso {
	background-color : #DCEDC8;
}
#msg{
	border-radius: 3px 3px 0 0;
	padding : 10px;
	width : 100%;
}
</style>
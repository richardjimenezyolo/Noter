<template>
	<v-row justify="center" align="center" style="height: 100%;">
		<div>
			<h2>Login:</h2>
			<v-text-field id="name" v-model="email" dark outlined placeholder="Email..."/>
			<br>
			<v-text-field id="pwd" v-model="pwd" dark outlined placeholder="Password..." type="password"/>

			<v-btn color="primary" @click="login">Login</v-btn>
			<v-btn @click="signup">Sign Up</v-btn>
		</div>
	</v-row>
</template>

<script>
	import { auth } from '../firebase.js';

	export default {
		methods: {
			login() {
				auth.signInWithEmailAndPassword(this.email, this.pwd).then(out => {
					location.href = '#/'
				}).catch(err => {
					alert(err)
				})
			},
			signup() {
				auth.createUserWithEmailAndPassword(this.email, this.pwd).then(out => {
					location.href = '#/'
				}).catch(err => {
					alert(err)
				})
			}
		},
		data() {
			return {
				email: '',
				pwd: ''
			}

		}
	}
</script>
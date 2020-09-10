<template>
	<div>
		<v-toolbar dark>
			<v-btn icon @click="save">
				<v-icon>{{ arrow }}</v-icon>
			</v-btn>
			<v-text-field class="mt-5" color="pink accent-3" id="name" placeholder="Name..." />
		</v-toolbar>
		
		<div id="editorjs"></div>

	</div>
</template>

<script>
	import { mdiArrowLeft } from '@mdi/js';
	import Editor from '../editor.js';
	import { db, auth } from '../firebase.js';

	export default {
		created() {
			this.editor = Editor()
		},
		methods: {
			save() {

				auth.onAuthStateChanged( async (user) => {
					const name = document.querySelector('#name').value;

					if (name != '') {

						const out = await this.editor.save();

						db.collection('notes').add({
							uid: user.uid,
							name: name,
							note: out
						})

						location.href = '#/'

					} else {
						alert('You need to write a name to save this note')
					}
				})

				
			}
		},
		data() {
			return {
				arrow: mdiArrowLeft,
				editor: ''
			}
		}
	}
</script>
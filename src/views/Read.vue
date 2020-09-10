<template>
	<div>
		<v-toolbar dark>
			<v-btn icon @click="save">
				<v-icon>{{ arrow }}</v-icon>
			</v-btn>
			
			<v-toolbar-title> {{ name }}</v-toolbar-title>

		</v-toolbar>
		
		<div id="editorjs"></div>

	</div>
</template>

<script>
	import { mdiArrowLeft } from '@mdi/js';
	import Editor from '../editor.js';
	import { db, auth } from '../firebase.js';

	window.db = db

	export default {
		async created() {
			this.editor = Editor();

			window.editor = this.editor

			const doc = await db.collection('notes').doc(this.id).get()

			const note = doc.data().note
			this.name = doc.data().name

			setTimeout(_ => {
				this.editor.render(note)
			}, 1000)

		},
		methods: {
			save() {
				auth.onAuthStateChanged(async user => {
					const name = this.name;

					if (name != '') {

						const out = await this.editor.save();

						db.collection('notes').doc(this.id).set({
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
				editor: '',
				name: '',
				id: this.$route.params.id
			}
		}
	}
</script>
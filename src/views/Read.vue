<template>
	<div>
		<v-toolbar dark>
			<v-btn icon @click="save">
				<v-icon>{{ arrow }}</v-icon>
			</v-btn>
			
			<v-toolbar-title> {{ name }}</v-toolbar-title>

			<v-spacer/>

			<v-btn icon @click="del">
				<v-icon>{{ deleteIcon }}</v-icon>
			</v-btn>
		</v-toolbar>
		
		<div id="editorjs"></div>

	</div>
</template>

<script>
	import { mdiArrowLeft } from '@mdi/js';
	import { mdiDelete } from '@mdi/js';
	import { Load } from '../editor.js';
	import { db, auth } from '../firebase.js';

	window.db = db

	export default {
		created() {
			window.editor = this.editor

			db.collection('notes').doc(this.id).onSnapshot( doc => {
				this.doc = doc.data()
				const note = this.doc.note;
				this.name = doc.data().name

				this.editor = Load(note);

				this.load = true
			} )

		},
		methods: {
			save() {
				if (this.load) {
					auth.onAuthStateChanged(async user => {
						const name = this.name;

						if (name != '') {

							const out = await this.editor.save();

							db.collection('notes').doc(this.id).set({
								uid: user.uid,
								name: name,
								note: out
							})

							setTimeout(_ => {
								location.href = '#/';
							}, 500)

						} else {
							alert('You need to write a name to save this note')
						}

					})
				}
				
			},

			del() {
				console.log('del')
				

				if (confirm("Are you sure?")) {
					console.log('yes')

					this.editor.save().then(out => {
						db.collection('trash').add(this.doc);

						db.collection('notes').doc(this.id).delete().then(_ => {
							location.href = '#/';
						})

						location.href = '#/';
					})

				} else {
					console.log('no')
				}
			}
		},
		data() {
			return {
				arrow: mdiArrowLeft,
				editor: '',
				name: '',
				id: this.$route.params.id,
				deleteIcon: mdiDelete,
				load: false,
				doc: {}
			}
		}
	}
</script>
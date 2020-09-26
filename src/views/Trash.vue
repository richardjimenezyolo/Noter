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

<script lang="ts">
	import { mdiArrowLeft, mdiDelete } from '@mdi/js';
	import { Load } from '../editor.js';
	import { db, auth } from '../firebase.js';

	export default {
		created() {

			db.collection('trash').doc(this.id).onSnapshot( doc => {
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
					location.href = '#/';
				}
				
			},

			del() {
				console.log('del')
				

				if (confirm("Are you sure? \n  by deleting this note you can never get access to it again")) {
					console.log('yes')

					this.editor.save().then(out => {

						db.collection('trash').doc(this.id).delete().then(_ => {
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
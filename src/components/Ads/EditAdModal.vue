<template>
  <v-dialog width="400px" v-model="dialog">
    <!-- <v-btn class="error" slot="activator" >Edit</v-btn> -->
    <template v-slot:activator="{ on }">
        <v-btn
          :loading="loading"
          color="red lighten-2"
          dark
          v-on="on"
        >
          Edit
        </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h3 class="text--primary">Edit ad</h3>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                type="text"
                aria-multiselectable="true"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data: function () {
    return {
      dialog: false,
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCancel: function () {
      this.dialog = 'false'
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.dialog = false
      }
    }
  }
}
</script>

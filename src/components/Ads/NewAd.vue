<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary md-3 ml-3">Create new ad</h1>
        <v-form ref="form"
                v-model="valid"
                lazy-validation
                class="md-3 ml-3 mr-3"
        >
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            :rules="[rules.required]"
            v-model="title"
            color="black"
          ></v-text-field>

          <v-textarea
            label="Ad description"
            name="description"
            :rules="[rules.required]"
            type="text"
            v-model="description"
            aria-multiselectable="true"
            color="black"
          ></v-textarea>
        </v-form>
        <v-layout row mb-3 ml-3 mt-3>
          <v-flex xs12>
            <v-btn class="theme--dark" @click="triggerUpload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
            ref="fileInput"
            type="file"
            style="display: none;"
            accept="image/*"
            @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row mb-3 ml-3 mt-3>
          <v-flex xs12>
            <img :src="imageSrc" alt="" height="200px" v-if="imageSrc">
          </v-flex>
        </v-layout>
        <v-layout row ml-3>
          <v-flex xs12>
            <v-switch
              v-model="promo"
              label="Ad to promo?"
              color="black"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row ml-3>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" :disabled="(!valid || !image)" class="theme--dark" @click="createAd">Create ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }

      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>

<style scoped>

</style>

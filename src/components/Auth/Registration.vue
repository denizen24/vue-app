<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            class="theme--dark"
            dark
            flat
          >
            <v-toolbar-title>Registration</v-toolbar-title>
            <div class="flex-grow-1"></div>

          </v-toolbar>
          <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="email"
                type="email"
                :rules="[rules.required, rules.email]"
                v-model="email"
                color="black"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                :rules="[rules.required, rules.min]"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :type="show1 ? 'text' : 'password'"
                :counter="8"
                @click:append="show1 = !show1"
                v-model="password"
                color="black"
              ></v-text-field>
              <v-text-field
                id="confirm-password"
                label="Confirm Password"
                name="confirm-password"
                prepend-icon="lock"
                :rules="[rules.required, rules.confirmPass, rules.min]"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :type="show1 ? 'text' : 'password'"
                :counter="8"
                @click:append="show1 = !show1"
                v-model="confirmPassword"
                color="black"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              class="theme--dark"
              @click="onSubmit"
              :disabled="!valid"
              :loading="loading"
            >Create account!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      show1: false,
      password: '',
      confirmPassword: '',
      email: '',
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        confirmPass: v => v === this.password || 'Passwords should match',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>

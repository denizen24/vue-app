<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="Error" slot="activator">Edit</v-btn>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      modal: false
    }
  }
}
</script>

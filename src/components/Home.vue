<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-row row wrap>
        <v-col
          xs12
          sm6
          md4
          v-for="ad of ads"
          :key="ad.id"
        >
          <v-card
            class="mx-auto elevation-10"
            max-width="350"
          >
            <v-img
              class="white--text"
              height="200px"
              :src="ad.imageSrc"
            >
              <v-card-title class="align-end fill-height">{{ad.title}}</v-card-title>
            </v-img>

            <v-card-text>
        <span>SELL</span><br>
        <span>{{ad.description}}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :to="'/ad/' + ad.id"
              >
                Open
              </v-btn>
              <v-btn
                raised
                class="theme--dark"
              >
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    }
  }
}
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 10px 20px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

</style>

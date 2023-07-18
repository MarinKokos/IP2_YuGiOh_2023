<template>
  <v-main>
    <v-container>
      <v-row>
        <!-- Box for Banned TCG Card -->
        <v-col cols="12" md="6">
          <v-card >
            <v-img
              v-if="bannedCardImageUrl"
              :src="bannedCardImageUrl"
              :alt="bannedCard.name"
              width="50%"
              height="auto"
            ></v-img>
            <v-card-title v-if="bannedCard.name">Banned TCG Card: {{ bannedCard.name }}</v-card-title>
          </v-card>
        </v-col>

        <!-- Box for Staple Card -->
        <v-col cols="12" md="6">
          <v-card>
            <v-img
              v-if="stapleCardImageUrl"
              :src="stapleCardImageUrl"
              :alt="stapleCard.name"
              width="50%"
              height="auto"
            ></v-img>
            <v-card-title v-if="stapleCard.name">Staple Card: {{ stapleCard.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',

  data() {
    return {
      bannedCard: {},
      stapleCard: {},
      bannedCardImageUrl: '',
      stapleCardImageUrl: '',
    };
  },

  created() {
    this.fetchBannedCard();
    this.fetchStapleCard();
  },

  methods: {
    async fetchBannedCard() {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg');
        const bannedCards = response.data.data.filter(card => card.banlist_info && card.banlist_info.ban_tcg === 'Banned');
        if (bannedCards.length > 0) {
          this.bannedCard = bannedCards[Math.floor(Math.random() * bannedCards.length)];
          this.bannedCardImageUrl = this.bannedCard.card_images[0].image_url;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchStapleCard() {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes');
        if (response.data.data.length > 0) {
          this.stapleCard = response.data.data[Math.floor(Math.random() * response.data.data.length)];
          this.stapleCardImageUrl = this.stapleCard.card_images[0].image_url;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>


</style>
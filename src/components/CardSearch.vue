<template>
  <div class="card-search">
    <v-form @submit.prevent="searchCard">
      <v-select v-model="searchAttribute" :items="searchAttributes" label="Search By" required></v-select>
      <v-text-field v-model="searchTerm" label="Search Term" required></v-text-field>
      <v-btn type="submit" color="primary">Search</v-btn>
    </v-form>

    <CardResult v-if="filteredCards.length > 0" :cardData="filteredCards" />
    <div v-else>
      No results found.
    </div>
  </div>
</template>

  <script>
  import axios from 'axios';
  import CardResult from './CardResult.vue';
  
  export default {
    name: 'CardSearch',
    components: {
      CardResult,
    },
    data() {
    return {
      searchAttribute: '', // Selected attribute to search by
      searchTerm: '', // Search term entered by the user
      cardData: [], // Data retrieved from the API
      filteredCards: [], // Cards filtered based on the search
      searchAttributes: ['name', 'type', 'atk', 'def', 'level', 'race', 'attribute'], // Options for the dropdown menu
    };
  },
    methods: {
      searchCard() {
    axios
      .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${this.searchAttribute}=${encodeURIComponent(this.searchTerm)}`)
      .then((response) => {
        console.log('API Response:', response.data.data);
        this.cardData = response.data.data || [];
        this.applyFilters();
      })
      .catch((error) => {
        console.error(error);
        this.cardData = [];
        this.filteredCards = [];
      });
  },
    applyFilters() {
      const searchTermLC = this.searchTerm.toLowerCase();
      this.filteredCards = this.cardData.filter((card) => {
        const cardValue = card[this.searchAttribute];

        if (typeof cardValue === 'number') {
          return cardValue === Number(this.searchTerm);
        } else if (typeof cardValue === 'string') {
          return cardValue.toLowerCase().includes(searchTermLC);
        }

        return false;
      });
    },
    },
  };
  </script>


<style>
.card-search {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-search v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-search v-btn {
  margin-top: 10px;
}

</style>
  
<template>
  <div class="card-search custom-card-search">
    <v-form @submit.prevent="searchCard">
      <v-select v-model="searchAttribute" :items="searchAttributes" label="Search By" required></v-select>
      <v-text-field v-model="searchTerm" label="Search Term" required></v-text-field>
      <v-btn type="submit" color="primary">Search</v-btn>
    </v-form>

    <CardResult
      v-if="paginatedCards.length > 0"
      :cardData="paginatedCards"
    />

    <div v-else>
      No results found.
    </div>

    <!-- Pagination controls -->
    <v-pagination v-if="filteredCards.length > 0" v-model="currentPage" :length="totalPages" />
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
      currentPage: 1,
      cardsPerPage: 5,
    };
  },
  computed: {
    paginatedCards() {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    const paginatedCards = this.filteredCards.slice(startIndex, endIndex);
    
    this.scrollToTop(); // Add this line to scroll to the top

    return paginatedCards;
  },
  totalPages() {
    return Math.ceil(this.filteredCards.length / this.cardsPerPage);
  },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // You can change this to 'auto' if you prefer an instant scroll
      });
    },
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


<style scoped>

  .custom-card-search {
  max-width: 500px;
  margin: 100px auto;
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

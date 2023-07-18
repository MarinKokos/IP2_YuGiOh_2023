<template>
  <div class="card-result">
    <div v-for="card in cardData" :key="card.id">
      <a :href="getCardLink(card.name)" target="_blank">
        <img :src="card.card_images[0].image_url" alt="Card Image" />
      </a>
      <div>{{ card.name }}</div>
      <div>{{ card.type }}</div>
      <div>{{ card.atk }}</div>
      <div>{{ card.def }}</div>
      <div>{{ card.level }}</div>
      <div>{{ card.race }}</div>
      <div>{{ card.attribute }}</div>
    </div>
  </div>
</template>

  <script>
  export default {
    methods: {
      getCardLink(cardName) {
      const cardNameFormatted = cardName.replace(/\s/g, '_');
      return `https://yugioh.fandom.com/wiki/${cardNameFormatted}`;
    },
  },
  props: {
    cardData: {
      type: Array,
      required: true,
    },
  },
  };
  </script>

<style>
.card-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}

.card-result img {
  max-width: 100%;
  height: auto;
}

.card-result p {
  margin-top: 10px;
}
</style>
  
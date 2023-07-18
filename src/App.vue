<template>
  <v-app>
    
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <a href="/">
        <v-img
          alt="YuGioH logo"
          class="shrink mr-2"
          contain
          img src="/logo.png"
          transition="scale-transition"
          width="100"
        />
      </a>

    
      </div>

      <v-spacer></v-spacer>


    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

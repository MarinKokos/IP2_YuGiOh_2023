<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <a href="/">
          <v-img
            alt="YuGioH logo"
            class="shrink mr-2"
            contain
            src="/logo.png"
            transition="scale-transition"
            width="120"
          />
        </a>
        <v-spacer></v-spacer>
        <!-- Add the first new button to navigate to another page -->
        <v-btn text @click="goToAnotherPage">About</v-btn>

        <!-- Add the second new button to open the form dialog -->
        <v-btn text @click="openFormDialog">Open Form</v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Form Dialog</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Name" required></v-text-field>
            <v-text-field v-model="formData.email" label="Email" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert v-if="showAlert" type="success" @input="showAlert = false">
    Form submitted successfully!
  </v-alert>

  </v-app>
</template>

<script>
export default {
  name: 'App',

  data(){
    return{
      dialogVisible: false,
      showAlert: false,
      formData: {
        name: '',
        email: '',
      },
    };
  },

  methods: {
    goToAnotherPage() {
      this.$router.push('/About');
    },
    openFormDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
this.showAlert = true;
setTimeout(() => {
        this.showAlert = false;
      }, 2000);

      this.formData = {
        name: '',
        email: '',
      };
    },
  },
};
</script>

<style>

</style>

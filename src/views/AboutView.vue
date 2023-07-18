<template>
  <v-app id="inspire">
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

        <v-btn text @click="goToAnotherPage">Search</v-btn>

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


    <v-container>
      <v-row>
        <!-- First Column: Image -->
        <v-col cols="12" sm="6">
          <v-img
            src="/kaiba.png"
            alt="Image"
            width="100%"
            height="auto"
            contain
          ></v-img>
        </v-col>

        <!-- Second Column: Text -->
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title>O nama</v-card-title>
            <v-card-text>
              <p>
                Yu gi oh database je naš projekt za kolegij Informatički projekt 2.
Ova stranica sadrži najbitnije podatke za kartašku igru Yu gi oh.
Napravili smo stranicu koristeći Vuetify i svi podaci vezani za projekt su spremljeni na githubu.
Članovi projekta su: Marin Benković , Darian Blažanović.

              </p>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      this.$router.push('/search');
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







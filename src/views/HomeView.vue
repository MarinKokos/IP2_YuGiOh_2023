<template>
   <v-app id="inspire">
    <v-app-bar
      app
      extended
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>INFP2</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="data in karte"
            :key="data.name"
            cols="4"
          >
            <v-card height="300">
              <h1>{{ data.name }}</h1>
              <h5>{{data.desc}}</h5>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  export default {

    data(){
      return{
        test: 'testna varijabla',
        karte:[],
        
      }

    },
    created(){
      console.log("created")
      this.getData();

    },

    methods:{
      getData(){
        let api="https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes"
        this.axios.get(api).then((response) => {
  console.log(response.data)
  this.karte=response.data.data
 
})

      }
    }

    }
</script>

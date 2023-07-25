<style>
.centered {
  display: flex;
  justify-content: center;
}
</style>
<template>
    <div class="centered">       
      <h1>{{ $route.params.name }} details</h1>
    </div>
    <div class="centered">      
      <q-img
        :src="imageSrc"
        spinner-color="white"
        style="height: 280px; max-width: 300px"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import postsService from 'src/services/posts'
  
  export default defineComponent({
    name: 'DetailsPage',
    setup(){
      const posts = ref([]);
      const imageSrc = ref(''); // Initialize imageSrc as a ref with an empty string
  
      onMounted(() => {          
        const segments = window.location.href.split('/') 
        const pokiName = segments.pop()            
        getPosts(pokiName)
      });
  
      const getPosts = async (pokemonName: string | undefined) => {      
        try {         
          const { list } = postsService(pokemonName)        
          posts.value = await list()           
          imageSrc.value = posts.value.sprites.front_default; // Update the value using .value
        } catch(error) {
          console.log(error)
        }      
      };
  
      return {
        posts,
        imageSrc        
      };
    }
  })
  </script>  

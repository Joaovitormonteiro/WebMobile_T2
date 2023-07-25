<style>
.centered {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
}
</style>
<template>
    <div class="centered">
      <h1>{{ $route.params.name }} details</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import postsService from 'src/services/posts'

export default defineComponent({
  name: 'IndexPage',
  setup(){
    const posts = ref([])
    const { list } = postsService('')

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {      
      try {         
        posts.value = await list()      
        console.log(posts.value)
      } catch(error) {
        console.log(error)
      }      
    }

    return{
      posts
    }
  }
})
</script>
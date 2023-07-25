<template>
  <q-page padding>
    <q-table
      title="Pokemons"
      :rows="posts"
      :columns="columns"
      row-key="name"  
      :rows-per-page-options="[10, 20, 50, 100, 500]" 
    >
      <template v-slot:body-cell-actions="props">      
        <q-td :props="props" class="">
          <div class="btn-container">
          <q-btn icon="search" color="green" dense size="sm" title="See details" @click="detailsClick(props.row.name)"></q-btn>
          <q-btn icon="thumb_up" color="blue" dense size="sm" title="Like" @click="likeClick"></q-btn>
          <q-btn icon="thumb_down" color="red" dense size="sm" title="Dislike" @click="dislikeClick"></q-btn>
        </div>
          <!-- <div>
            <q-badge color="purple" :label="props.value" />
          </div> -->
          <!-- <div class="my-table-details">
            {{ props.row.details }}
          </div> -->
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import postsService from 'src/services/posts'
import { defineStore } from 'pinia'
import { type Register } from '../datatypes/register'

export default defineComponent({
  name: 'IndexPage',
  setup(){
    const posts = ref([])
    const { list } = postsService('')
    const columns = [
      // {name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left'},
      // {name: 'url', field: 'url', label: 'URL', sortable: true, align: 'left'},
      // {name: 'width', field: 'width', label: 'Width', sortable: true, align: 'left'},
      // {name: 'height', field: 'height', label: 'Height', sortable: true, align: 'left'},
      {name: 'name', field: 'name', label: 'Name', sortable: true, align: 'left'},
      {name: 'url', field: 'url', label: 'Url', sortable: true, align: 'left'},
      {name: 'actions', field: 'actions', label: 'Actions', sortable: false, align: 'right'}          
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {      
      try {         
        posts.value = await list()      
      } catch(error) {
        console.log(error)
      }      
    }

    return{
      posts,
      columns
    }
  },
  methods: {
    detailsClick(pokemonName: string) {        
      this.$router.push({ path: "/details" + "/" + pokemonName, params: { name: pokemonName } });
    },
    likeClick(){
      alert('Liked!');
    },
    dislikeClick(){
      alert('Disliked!');
    },
  }
})

const { list } = postsService('')
let registers: any
try {         
  registers = await list()      
} catch(error) {
  console.log(error)
}  

export const dataStore = defineStore('dataStore', {
  state: () => ({
    registers: registers,
    numberOfPages: 1
  }),
  actions: {
    getPaginetedRegisters(pageSize: number, pageNumber: number, sortBy: string): Register[] {
      const currentNumberOfPages = Math.floor(this.registers.length / pageSize)
      const firstIndex = pageNumber * pageSize
      const lastIndex =
        (pageNumber + 1) * pageSize > this.registers.length
          ? this.registers.length
          : (pageNumber + 1) * pageSize
      this.numberOfPages = currentNumberOfPages
      if (sortBy === 'Data')
        return this.registers.slice().sort(sortDateColumn).slice(firstIndex, lastIndex)
      else if (sortBy === 'NaoOrdenar') return this.registers.slice().slice(firstIndex, lastIndex)
      return this.registers.slice().sort(sortStringColumn(sortBy)).slice(firstIndex, lastIndex)
    },  
    searchByName(name: string): Register[] {
      return this.registers.filter((register: Register) => register.name.includes(name))
    }
  }
})
</script>

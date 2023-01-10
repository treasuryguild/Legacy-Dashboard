<script setup>
  import { onMounted, ref } from 'vue' 
  import { useRoute } from 'vue-router'
  import { useStore } from '../store/index';
  import { supabase } from '../supabase'
  import { useGetProject } from '../composables/getproject'

  const store = useStore()
  const route = useRoute()

  const project_idRender = ref('')
  const walletRender = ref('')
  const group_idRender = ref('')
  const websiteRender = ref('')
  const project_typeRender = ref('')
  const budget_itemsRender = ref('')

  const group = route.params.group
  const project = route.params.project
  

  onMounted(() => {
    getProjectDetails()
  })

  async function getProjectDetails() {  // still busy building and testing
    const { project_id, wallet, group_id, website, project_type, budget_items } = await useGetProject()
    project_idRender.value = project_id.value
    walletRender.value = wallet.value
    group_idRender.value = group_id.value
    websiteRender.value = website.value
    project_typeRender.value = project_type.value
    budget_itemsRender.value = budget_items.value
    console.log(wallet.value)
  }
  
</script>

<template>
   <main>
     <h2>Project {{ store.project }}</h2>
     <p>{{ websiteRender }}</p>
   </main>
</template>

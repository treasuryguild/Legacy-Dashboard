<script setup>
  import { useRoute } from 'vue-router'
  import { useStore } from '../store/index';
  import { supabase } from '../supabase'

  const store = useStore()
  const route = useRoute()

  const group = route.params.group
  const project = route.params.project

  async function getProjectDetails() {  // still busy building and testing
    
    try {
      loading.value = true

      let { data, error, status } = await supabase
        .from('projects')
        .select(`project_id, wallet, group_id`)
        .eq('project_name', store.project)
        
      if (error && status !== 406) throw error

      if (data) {
        for (let j in data) {
          console.log("loading", j)
          groupid.value.push(data[j].group_id)
          group_updated_at.value.push(data[j].updated_at)
          groupname.value.push(data[j].group_name)
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
  
</script>

<template>
   <main>
     <h2>Project {{ store.project }}</h2>
   </main>
</template>

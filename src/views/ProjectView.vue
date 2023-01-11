<script setup>
  import { onMounted, ref } from 'vue' 
  import { useRoute } from 'vue-router'
  import { useStore } from '../store/index';
  import { supabase } from '../supabase'
  import { useGetProject } from '../composables/getproject'
  import { useGetTransactions } from '../composables/gettransactions'
  import { useGetContributions } from '../composables/getcontributions'
  import { useGetDistributions } from '../composables/getdistributions'

  const store = useStore()
  const route = useRoute()

  const project_idRender = ref('')
  const walletRender = ref('')
  const group_idRender = ref('')
  const websiteRender = ref('')
  const project_typeRender = ref('')
  const budget_itemsRender = ref('')

  const transactionId = ref([])
  const transactionDate = ref([])
  const exchangeRate = ref([])
  const txJsonUrl = ref([])

  const contributionId = ref([])
  const taskCreator = ref([])
  const taskName = ref([])
  const taskLabel = ref([])
  const taskDescription = ref([])

  const distId = ref([])
  const contributorId = ref([])
  const adaR = ref([])
  const gmblR = ref([])
  const agixR = ref([])

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
    const { transaction_id, transaction_date, exchange_rate, tx_json_url } = await useGetTransactions(project_idRender.value)
    transactionId.value = transaction_id.value
    transactionDate.value = transaction_date.value
    exchangeRate.value = exchange_rate.value
    txJsonUrl.value = tx_json_url.value
    const { contribution_id, task_creator, task_name, task_label, task_description } = await useGetContributions(transactionId.value[0])
    contributionId.value = contribution_id.value
    const { dist_id, contributor_id, ada, gmbl, agix } = await useGetDistributions(contributionId.value[0])
    console.log(ada.value[0])
  }
  
</script>

<template>
   <main>
     <h2>Project {{ store.project }}</h2>
     <p>{{ websiteRender }}</p>
   </main>
</template>

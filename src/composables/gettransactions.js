// mouse.js
import { ref } from 'vue' 
import { supabase } from '../supabase'

// by convention, composable function names start with "use"
export async function useGetTransactions(project_id) {
  
    const loading = ref(true)
  
    const transaction_id = ref([])
    const transaction_date = ref([])
    const exchange_rate = ref([])
    const tx_json_url = ref([])

  async function getTransactions() {  // still busy building and testing
    
    try {
      loading.value = true

      let { data, error, status } = await supabase
        .from('transactions')
        .select(`transaction_id, transaction_date, exchange_rate, tx_json_url`)
        .eq('project_id', project_id)
        
      if (error && status !== 406) throw error

      if (data) {
        for (let j in data) {
          console.log("loading", j)
          transaction_id.value.push(data[j].transaction_id)
          transaction_date.value.push(data[j].transaction_date)
          exchange_rate.value.push(data[j].exchange_rate)
          tx_json_url.value.push(data[j].tx_json_url)
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  await getTransactions()

  return { transaction_id, transaction_date, exchange_rate, tx_json_url }
}

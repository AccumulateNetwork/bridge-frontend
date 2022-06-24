import axios from 'axios'
import { toast } from 'react-toastify'

class RPC {
  private currentId
  constructor() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL
    this.currentId  = 1
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  }
  
  request = (method: string, params = null) => {
    const result = axios.post('', {
      jsonrpc: '2.0',
      id: ++this.currentId,
      method,
      params: typeof params === 'string' ? [params] : params
    })
    .then(function(response) {
      if (response.data.error) {
        if (response.data.error.data && response.data.error.code) {         
           toast('Error ' + response.data.error.code + ': ' + response.data.error.data) 
        } else {
          toast('Unexpected error received from Accumulate API') 
        }
      }
      if (response) {
        return response.data.result
      }
    })
    .catch(() => {
      toast('Accumulate API is unavailable')
    })
    return result
  }
}

export default new RPC()
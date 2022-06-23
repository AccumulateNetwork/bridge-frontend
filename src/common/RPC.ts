import axios from 'axios';
import { config } from '../config/config';

class RPC {
    private currentId;
  constructor() {
    axios.defaults.baseURL = config.apiUrl
    this.currentId  = 1
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  }
  
  request = (method: string, params = null, showMessage = 0) => {
    const result = axios.post('', {
      jsonrpc: '2.0',
      id: ++this.currentId,
      method,
      params: typeof params === 'string' ? [params] : params
    })
    .then(function(response) {
      if (response.data.error) {
        if (response.data.error.data && response.data.error.code) {
          // exception for nothing was found error
          if (response.data.error.code === -32807) {
            if (showMessage) {
            //   message.info('Nothing was found');
            }
          } else {
            // message.error('Error ' + response.data.error.code + ': ' + response.data.error.data);
          }
        } else {
        //   message.error('Unexpected error received from Accumulate API');
        }
      }
      if (response) {
        return response.data.result;
      }
    })
    .catch(() => {
    //   message.error('Accumulate API is unavailable');
    });
    return result;
  }

}

export default new RPC();
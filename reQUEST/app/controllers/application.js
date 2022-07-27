import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'

export default Controller.extend({

  requestType: 'GET',

  requestListener(){
    console.log(this.responseText)
  },

  actions:{
    changeRequestType(value){
      this.set('requestType', value)
      console.log(this.get('requestType'))
    },

    sendRequest(){
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load', this.requestListener)
      xhr.open(`${this.get('requestType')}`, 'https://catfact.ninja/fact')
      xhr.send()
    }
  }
});

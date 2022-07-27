import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'

export default Controller.extend({

  requestType: 'GET',

  requestURL: undefined,

  outputRaw: undefined,

  actions:{
    changeRequestType(value){
      this.set('requestType', value)
      console.log(this.get('requestType'))
    },

    sendRequest(){
      this.set('requestURL', this.get('inputValue'))
      const xhr = new XMLHttpRequest()
      xhr.open(`${this.get('requestType')}`, `${this.get('requestURL')}`)
      xhr.send()
      xhr.onload = () => {
        console.log(xhr.responseText)
        let str = xhr.responseText
        this.set('outputRaw', str)
      }
      console.log(this.get('outputRaw'))
    }
  }
});

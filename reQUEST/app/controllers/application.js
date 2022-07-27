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
       let jsonStr = JSON.stringify(JSON.parse(xhr.responseText), undefined, 4)
       let rawStr = xhr.responseText
        this.set('outputRaw', rawStr)
      }
      console.log(this.get('outputRaw'))
    }
  }
});

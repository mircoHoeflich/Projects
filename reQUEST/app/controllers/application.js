import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'
// https://www.boredapi.com/api/activity

export default Controller.extend({

  requestType: 'GET',

  requestURL: undefined,

  output: undefined,

  outputFormat: 'raw',

  outputComputed: computed('output', 'outputFormat', {
    get(){
      return this.get('output')
    }
  }),

  sendRequest(){
    this.set('requestURL', this.get('inputValue'))
    const xhr = new XMLHttpRequest()
    xhr.open(`${this.get('requestType')}`, `${this.get('requestURL')}`)
    xhr.send()
    xhr.onload = () => {
      const jsonStr = JSON.stringify(JSON.parse(xhr.responseText), undefined, 4)
      const rawStr = xhr.responseText

      if(this.get('outputFormat') === 'pretty'){
        this.set('output', jsonStr)
      } else if (this.get('outputFormat') === 'raw'){
        this.set('output', rawStr)
      }
    }
  },

  changeFormat(input){
    this.set('outputFormat', input)
    const jsonStr = JSON.stringify(JSON.parse(this.get('output')), undefined, 4)
    const rawStr = JSON.stringify(JSON.parse(this.get('output')))

    if(this.get('outputFormat') === 'pretty'){
      this.set('output', jsonStr)
    } else if (this.get('outputFormat') === 'raw'){
      this.set('output', rawStr)
    }
  },

  actions:{
    changeRequestType(value){
      this.set('requestType', value)
      console.log(this.get('requestType'))
    },

   handleFormatChange(format){
    this.changeFormat(format)
   },

    handleRequest(){
      this.sendRequest()
    }
  }
});

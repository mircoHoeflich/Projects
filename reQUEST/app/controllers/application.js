import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'
// https://www.boredapi.com/api/activity

export default Controller.extend({

  requestType: 'GET',

  requestURL: undefined,

  output: undefined,

  outputFormat: 'pretty',

  requestTime: undefined,

  requestStatus: undefined,

  requestStatusText: undefined,

  isPretty: true,

  isRaw: undefined,

  isLoading: false,

  isOver500ms: false,

  isOver1000ms: false,
  

  outputComputed: computed('output', 'outputFormat', {
    get(){
      return this.get('output')
    }
  }),

  sendRequest(){
    this.set('requestURL', this.get('inputValue'))
    const before = new Date();
    const xhr = new XMLHttpRequest()
    xhr.open(`${this.get('requestType')}`, `${this.get('requestURL')}`)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr)
        this.set('isLoading', false)
        const jsonStr = JSON.stringify(JSON.parse(xhr.responseText), undefined, 4)
        const rawStr = xhr.responseText

        if(this.get('outputFormat') === 'pretty'){
          this.set('output', jsonStr)
        } else if (this.get('outputFormat') === 'raw'){
          this.set('output', rawStr)
        }

        const now = new Date();
        const diff = now - before;

        if(diff < 500){
          this.set('isOver500ms', false)
          this.set('isOver1000ms', false)
        } else if (diff > 500 && diff < 1000){
          this.set('isOver500ms', true)
          this.set('isOver1000ms', false)
        } else if (diff > 1000) {
          this.set('isOver500ms', false)
          this.set('isOver1000ms', true)
        }

        this.set('requestTime', diff)
        this.set('requestStatus', xhr.status)
        this.set('requestStatusText', xhr.statusText)
        this.set('requestSize', xhr.getResponseHeader('Content-Length'))
      }
    }
  },

  changeFormat(input){
    this.set('outputFormat', input)
    const jsonStr = JSON.stringify(JSON.parse(this.get('output')), undefined, 4)
    const rawStr = JSON.stringify(JSON.parse(this.get('output')))

    if(this.get('outputFormat') === 'pretty'){
      this.set('output', jsonStr)
      this.set('isRaw', false)
      this.set('isPretty', true)
    } else if (this.get('outputFormat') === 'raw'){
      this.set('output', rawStr)
      this.set('isRaw', true)
      this.set('isPretty', false)
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
      this.set('isLoading', true)
      this.sendRequest()
    }
  }
});

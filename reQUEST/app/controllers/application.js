import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'

export default Controller.extend({

  requestType: undefined,

  actions:{
    changeRequestType(value){
      this.set('requestType', value)
      console.log(this.get('requestType'))
    }
  }
});

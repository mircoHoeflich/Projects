import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object'

export default Controller.extend({

  actions:{
    click(){
      alert(this.get('inputValue'))

    }
  }
});

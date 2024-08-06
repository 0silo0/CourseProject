import Controller from "@ember/controller";
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  session: service(),
  i18n: service(),
  currentUser: service(),

  actions: {
    async logout(e) {
      e.preventDefault();

      this.get('session').invalidate();
    }
  },

  init() {
    this._super(...arguments);
    set(this, 'i18n.locale', 'ru')
  }
});

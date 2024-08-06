import Component from '@ember/component';
import fetch from 'fetch';

import ENV from 'course-project/config/environment';

import { validator, buildValidations } from 'ember-cp-validations';
import { inject as service} from '@ember/service';
import { computed } from '@ember/object';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', {type: 'email'})
  ],
  username: validator('presence', true),
  password: [
    validator('presence', true),
    validator('length', {min: 4, max: 12})
  ],
  passwordConfirmation: [
    validator('presence', true),
    validator('confirmation', {on: 'password', message: '{description} don`t match', description: 'Passwords'})
  ]
});

export default Component.extend(Validations, {
  iAmRobot: true,
  reset: false,
  i18n: service(),
  isFormValid: computed.alias('validations.isValid'),

  actions: {
    async saveUser(e) {
      e.preventDefault();

      if (this.get('isFormValid')) {
        this.get('onSubmit')({
          email: this.email,
          username: this.username,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        });
      }
    },

    async verified(key) {
      try {
        const { success } = await (await fetch(`${ENV.backendURL}/recaptcha?key=${key}`)).json();

        this.set('iAmRobot', !success);
      } catch (error) {
        this.set('reset', true);
      }
    },

    expired() {
      this.set('iAmRobot', true);
    }
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get('user.email'),
      username: this.get('user.username'),
      password: this.get('user.password'),
      passwordConfirmation: this.get('user.passwordConfirmation'),
    });
  }
});
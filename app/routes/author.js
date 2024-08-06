import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Route.extend({
    dataService: service('data'),
    queryParams: {
        search: {
            refreshModel: true
        }
    },

    model({ search })
    {
        // let promise =  new Promise((resolve, reject) => {
        //     later(async () => {
        //         try {
        //             let authers = search ? await this.get('dataService').getAuthors(search) : await this.get('dataService').getAuthors();
        //             resolve(authers);
        //         }
        //         catch (e) {
        //             reject('Подключение потеряно');
        //         }
        //     }, 1000)
        // }).
        // then((authors) => {
        //     this.set('contoller.model', authors);
        // }).finally(() => {
        //     this.get('controller.isLoading', false);
        // });
        
        // return {isLoading: true};

        return this.get('store').findAll('author');
    },

    setupController(controller, model) {
        this._super(...arguments);
        //controller.set('model', model); // Устанавливаем авторов в модель контроллера
        // controller.set('isLoading', true); // Устанавливаем флаг загрузки
    },

    actions: {
        refreshAuthors() {
            
        }
    }

});
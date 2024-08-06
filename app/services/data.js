import Service from '@ember/service';
import ENV from 'course-project/config/environment';
import { A } from '@ember/array';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('authors', A());
    },

    async getAuthors(search)
    {
        let queryParams = '';
        if (search) {
            queryParams = `?q=${search}`;
        }
        let response = await fetch(`${ENV.backendURL}/authors${queryParams}`);
        let authors = await response.json();
        this.get('authors').clear();
        this.get('authors').pushObjects(authors);
        return this.get('authors');
    },

    getAuthor(id)
    {
        // return fetch(`${ENV.backendURL}/authors/${id}`).then((response) => response.json()); 
        return this.get('authors').find(author => author.id === id);
    },

    deleteAuthor(author)
    {
        this.get('authors').removeObject(author);
        return fetch(`${ENV.backendURL}/authors/${author.id}`, { method: 'DELETE'});
    },

    async createAuthor(author) {
        let response = await fetch(`${ENV.backendURL}/authors`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(author)
        });
        let newAuthor = await response.json();
        this.get('authors').pushObject(newAuthor); // Добавляем нового автора в список
        return newAuthor;
    },

    async updateAuthor(author) {
        let response = await fetch(`${ENV.backendURL}/authors/${author.id}`, { 
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(author)
        });
        let updatedAuthor = await response.json();

        // Найдите индекс обновленного автора в локальном массиве и замените его
        let authors = this.get('authors');
        let index = authors.findIndex(item => item.id === author.id);
        if (index !== -1) {
            authors.replace(index, 1, [updatedAuthor]);
        }

        return updatedAuthor;
    }

});

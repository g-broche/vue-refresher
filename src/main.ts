import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/css/reset.css';
import './assets/css/theme.css';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);

app.mount('#app');

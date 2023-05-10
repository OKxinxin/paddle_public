import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Import from '@/views/Import.vue';
import Display from '@/views/Display.vue';
import Analysis from '@/views/Analysis.vue';
import Login from '@/views/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showNav: true
          },
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            showNav: true
          },
    },
    {
        path: '/import',
        name: 'Import',
        component: Import,
        meta: {
            showNav: true
          },
    },
    {
        path: '/display',
        name: 'Display',
        component: Display,
        meta: {
            showNav: true
          },
    },
    {
        path: '/analysis',
        name: 'Analysis',
        component: Analysis,
        meta: {
            showNav: true
          },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            showNav: false
          },
    },
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;


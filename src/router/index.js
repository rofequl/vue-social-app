import {createRouter, createWebHistory} from '@ionic/vue-router';
import {auth} from "@/hooks/firebase-auth";

const guard = (to, from, next) => {
    try {
        auth.currentUser ? to.path === '/authentication' ? next("/home") : next() : next("/authentication");
    } catch (error) {
        next("/authentication");
    }
}

const isUserLoggedIn = (to, from, next) => auth.currentUser ? next("/home") : next();

const routes = [
    {
        path: '/',
        component: () => import("@/layout/BottomTab"),
        children: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                name: 'Home',
                component: () => import("@/pages/Home"),
                beforeEnter: guard
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import("@/pages/Profile"),
                beforeEnter: guard
            },
        ]
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: () => import("@/pages/profile/EditProfile"),
        beforeEnter: guard
    },
    {
        path: '/add-status',
        name: 'Status',
        component: () => import("@/pages/AddStatus"),
        beforeEnter: guard
    },
    {
        path: '/authentication',
        name: 'Authentication',
        component: () => import("@/pages/auth/Authentication"),
        beforeEnter: isUserLoggedIn
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

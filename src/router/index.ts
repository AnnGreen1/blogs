import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const commonRoute: RouteRecordRaw[] = [
    // commonroute
    {
        path: "/commonroute",
        name: "commonroute",
        component: () => import("@/views/CommonRoute.vue")
    },
    {
        path: "/elementplusdemo",
        name: "elementplusdemo",
        component: () => import("@/views/ElementplusDemo.vue")
    },
];


const router = createRouter({
    // createWebHashHistory:hash模式; createWebHistory:历史模式; createMemoryHistory:ssr
    history: createWebHashHistory(),
    routes: [
        ...commonRoute,
    ] as unknown as RouteRecordRaw[]
});
export default router
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BoardApp } from './pages/BoardApp'
import { Boards } from './pages/Boards'
import { DashboardAnalisys } from './pages/DashboardAnalisys'

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },

    {
        path: '/boards/',
        component: Boards,
    },
    {
        path: '/dashboard/:boardId?',
        component: DashboardAnalisys,
    },
    {
        path: '/board/:boardId?/:cardId?',
        // ---> path: '/board/:boardId',
        component: BoardApp,
    },
]
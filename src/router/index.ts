import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/Discover'
  },
  // 发现音乐
  {
    path: '/Discover',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/discover/index.vue'),
        redirect: 'Personality',
        children: [
          {
            path: 'Personality',
            component: () => import('../views/discover/Personality/index.vue'),
            meta: { title: '个性推荐', keepAlive: true }
          },
          {
            path: 'SongList',
            component: () => import('../views/discover/SongList/index.vue'),
            meta: { title: '歌单', keepAlive: true }
          },
          // {
          //   path: 'RadioStation',
          //   component: () => import('@/src/views/discover/RadioStation'),
          //   meta: { title: '主播电台', keepAlive: true }
          // },
          {
            path: 'RankingList',
            component: () => import('../views/discover/RankingList/index.vue'),
            meta: { title: '排行榜', keepAlive: true }
          },
          {
            path: 'SingerList',
            component: () => import('../views/discover/SingerList/index.vue'),
            meta: { title: '歌手', keepAlive: true }
          },
          {
            path: 'LatestMusic',
            component: () => import('../views/discover/LatestMusic/index.vue'),
            meta: { title: '最新音乐', keepAlive: true }
          }
        ]
      }
    ]
  },
  // 专辑
  {
    path: '/Album',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Album/index.vue'),
        // redirect: 'Songs',
        // children: [
        //   {
        //     path: 'Songs',
        //     component: () => import('../views/Album/Songs.vue'),
        //     meta: { title: '歌曲列表', keepAlive: false }
        //   },
        //   {
        //     path: 'Comments',
        //     component: () => import('../views/Album/Comments.vue'),
        //     meta: { title: '评论', keepAlive: false }
        //   },
        //   {
        //     path: 'Details',
        //     component: () => import('../views/Album/Details.vue'),
        //     meta: { title: '专辑详情', keepAlive: false }
        //   }
        // ]
      }
    ]
  },
  // 歌单
  {
    path: '/PlayList',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('../views/PlayList/index.vue'),
        meta: { keepAlive: false }
      }
    ]
  },
  // 歌手
  {
    path: '/Singer',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Singer/index.vue')
      }
    ]
  },
  // 用户
  {
    path: '/User',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/User/index.vue'),
        meta: { keepAlive: false }
      }
    ]
  },
  // 搜索
  {
    path: '/Search',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Search/index.vue'),
        redirect: 'Song',
        children: [
          {
            path: 'Song',
            component: () => import('../views/Search/song/index.vue'),
            meta: { title: '单曲', keepAlive: false }
          },
          {
            path: 'Singer',
            component: () => import('../views/Search/singer/index.vue'),
            meta: { title: '歌手', keepAlive: false }
          },
          {
            path: 'Album',
            component: () => import('../views/Search/album/index.vue'),
            meta: { title: '专辑', keepAlive: false }
          },
          {
            path: 'Video',
            component: () => import('../views/Search/video/index.vue'),
            meta: { title: '视频', keepAlive: false }
          },
          {
            path: 'Songsheet',
            component: () => import('../views/Search/songSheet/index.vue'),
            meta: { title: '歌单', keepAlive: false }
          },
          {
            path: 'User',
            component: () => import('../views/Search/user/index.vue'),
            meta: { title: '用户', keepAlive: false }
          }
        ]
      }
    ]
  },
  // 视频
  {
    path: '/Video',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/Video/index.vue'),
        meta: { title: '视频', keepAlive: true }
      },
      {
        path: 'Detail',
        component: () => import('../views/Video/detail/index.vue'),
        meta: { title: '视频详情', keepAlive: false }
      },
      {
        path: 'Mv',
        component: () => import('../views/Video/mv/index.vue'),
        meta: { title: 'Mv详情', keepAlive: false }
      }
    ]
  },
  // 歌曲
  {
    path: '/Song',
    component: Layout,
    children: [
      {
        path: '',
        // component: Song,
        component: () => import('../views/Song/index.vue'),
        meta: { keepAlive: false }
      }
    ]
  }

]


// function toScroll(to?: Route, from?: Route) {
//   const page = document.getElementById('page')
//   const elscrollbar = document.getElementById('elscrollbar')

//   if (page) {
//     to ? page.style.height = to.meta.height :
//       from!.meta.height = page.offsetHeight + 'px'
//   }
//   if (elscrollbar) {
//     to ? elscrollbar.children[0].scrollTop = to.meta.scrollTop :
//       from!.meta.scrollTop = elscrollbar!.children[0].scrollTop
//   }
// }

const scrollBehavior = function (to: any, from: any, savedPosition: any) {
  if (savedPosition) {
    // const page = document.getElementById('page')
    // const elscrollbar = document.getElementById('elscrollbar')
    // if (page) {
    //   const height = to.meta.height.find((e: any) => to.fullPath in e)
    //   page!.style.height = height[to.fullPath]
    // }
    // if (elscrollbar) {
    //   elscrollbar!.children[0].scrollTop = to.meta.scrollTop
    // }
    // toScroll(to)

  } else {
    // const elscrollbar = document.getElementById('elscrollbar')
    // elscrollbar!.children[0].scrollTop = 0
  }
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
})

// router.afterEach((to, from) => {
//   const page = document.getElementById('page')
//   // const elscrollbar = document.getElementById('elscrollbar')
//   // if (elscrollbar) {
//   //   from.meta.scrollTop = elscrollbar!.children[0].scrollTop
//   // }

//   // if (page) {
//   //   from.meta.height = page.offsetHeight + 'px'
//   // }
//   // toScroll(undefined, from)
//   const a = from.meta.height || []
//   if (page)
//     a.push({
//       [from.fullPath]: page!.offsetHeight + 'px'
//     })
//   from.meta.height = a
//   console.log(from);

// })

export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
    // hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    children: [{
      path: 'index',
      name: 'SelfSetting',
      component: () => import('@/views/setting/index'),
      meta: { title: '自定义', icon: 'user' }
    }]
  },

  {
    path: '/student',
    component: Layout,
    name: 'Student',
    redirect: '/student/studentIndex',
    meta: { title: '学生的首页', icon: 'dashboard' },
    roles: ['学生'],
    children: [
      {
        path: 'browseAndChooseCourse',
        name: '选课系统',
        component: () => import('@/views/course/index'),
        meta: { title: '选课系统', icon: 'dashboard' }
      },
      {
        path: 'studentIndex',
        name: '学生首页',
        component: () => import('@/views/student/index'),
        meta: { title: '学生首页', icon: 'dashboard' }
      },
      {
        path: 'choosenCourses',
        name: '已选课程',
        component: () => import('@/views/student/choosenCourses'),
        meta: { title: '已选课程', icon: 'table' }
      },
      {
        path: 'reportCard',
        name: '我的成绩单',
        component: () => import('@/views/reportCard/index'),
        meta: { title: '成绩单查询', icon: 'table' }
      }
    ]
  },
  {
    path: '/teachingTeacher',
    component: Layout,
    roles: ['教师'],
    redirect: '/teachingTeacher/index',
    meta: { title: '教师首页', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        name: '教师首页',
        component: () => import('@/views/teachingTeacher/index'),
        meta: { title: '教师首页', icon: 'dashboard' }
      },
      {
        path: 'writeIn',
        name: '成绩录入',
        component: () => import('@/views/reportCard/writeIn'),
        meta: { title: '成绩录入', icon: 'table' }
      }
    ]
  },
  {
    path: '/officeTeacher',
    component: Layout,
    redirect: '/officeTeacher/index',
    meta: { title: '办公老师首页', icon: 'dashboard' },
    roles: ['办公老师'],
    children: [
      {
        path: 'index',
        name: '办公老师首页',
        component: () => import('@/views/officeTeacher/index'),
        meta: { title: '办公老师首页', icon: 'dashboard' }
      },
      {
        path: 'userRegister',
        name: '用户管理系统',
        department: ['人员管理'],
        component: () => import('@/views/userRegister/index'),
        meta: { title: '用户管理系统', icon: 'dashboard' }
      },
      {
        path: 'winCourse',
        name: '选课系统开关',
        department: ['学生科'],
        component: () => import('@/views/officeTeacher/winCourse'),
        meta: { title: '选课系统开关', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/newsManage',
    name: 'newsManage',
    component: Layout,
    redirect: 'newsList',
    meta: { title: '新闻管理站', icon: 'icons-top-06' },
    department: ['新闻'],
    children: [
      {
        path: 'newsUpload',
        name: '新闻撰写/上传',
        component: () => import('@/views/newsManage/newsUpload/index'),
        meta: { title: '新闻撰写', icon: '提交' }
      },
      {
        path: 'newsList',
        name: '新闻管理',
        component: () => import('@/views/newsManage/newsList/index'),
        meta: { title: '新闻管理', icon: '业务设置' }
      },
      {
        path: 'newsEdit',
        name: '新闻编辑',
        hidden: true,
        component: () => import('@/views/newsManage/newsEdit/index'),
        meta: { title: '新闻编辑', icon: '业务设置' },
        params: { key: 'currentNews', value: 'news' }
      },
      {
        path: 'newsShow',
        name: '新闻浏览',
        hidden: true,
        component: () => import('@/views/newsManage/newsHtml/index'),
        meta: { title: '新闻浏览', icon: '业务设置' },
        params: { key: 'currentNews', value: 'news' }
      },
      {
        path: 'tinymceDemo',
        name: '编辑器示例',
        hidden: true,
        component: () => import('@/views/tinymce/tinymce'),
        meta: { title: '编辑器示例', icon: '业务设置' }
      }
    ]
  },
  {
    path: '/otherStuff',
    component: Layout,
    redirect: '/otherStuff/index',
    roles: ['其他职工'],
    children: [{
      path: 'index',
      name: '职工首页',
      component: () => import('@/views/otherStuff/index'),
      meta: { title: '职工首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

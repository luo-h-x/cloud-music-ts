import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Progress,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel,
  CarouselItem,
  Scrollbar,
  Tag,
  Pagination,
  Slider,
  Image,
  Table,
  TableColumn,
  Input,
  Notification,
  MessageBox,
  Autocomplete,
  Avatar,
  Popover,
  Tabs,
  TabPane,
  Loading,
  Backtop,
} from 'element-ui'
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Progress)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Scrollbar)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Slider)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Header)
Vue.use(Autocomplete)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Backtop)
Vue.use(Loading.directive)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

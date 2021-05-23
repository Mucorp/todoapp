
import { createStore, createLogger } from 'vuex';
import todo from './modules/Todo';
import {auth} from './modules/auth.module';
// import {user} from './modules/user.service';

const debug = process.env.NODE_ENV !== 'todoion'

const Store = createStore({
  modules: {
    todo,
    auth,

  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;
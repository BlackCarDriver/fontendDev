import dva from 'dva'
import 'babel-polyfill'
import './index.css'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'

async function init () {
  // 1. Initialize
  const app = dva({
    history: createHistory({ basename: BASE_PATH }),
    onError (error) {
      console.error('app onError -- ', error)
    }
  })

  // 2. Plugins
  app.use(createLoading())
  
  // 3. Model
  // app.model(require('./models/example').default);
  
  // 4. Router
  app.router(require('./router').default)
  
  // 5. Start
  app.start('#root')
}

init()

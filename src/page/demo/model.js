import { genGetRequireTemplate, genPostRequireTemplate } from '@/utils/require'

const getDatabaseInfo = genGetRequireTemplate('/todo/todo', 'list', (raw) => { return raw })
const addOrUpdateActive = genPostRequireTemplate('/todo/todo')

export default {
  namespace: 'demoPage',
  state: {
    list: [],
    title: 'Bind success!'
  },

  reducers: {
    updateState (state, { payload }) {
      const { name, newValue } = payload
      return { ...state, [name]: newValue }
    }
  },
  effects: {
    getDatabaseInfo,
    addOrUpdateActive
  }
}

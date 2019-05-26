// add some helpful assertions
import 'jest-dom/extend-expect'
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each'
// mock window functions
window.confirm = () => true
window.alert = (msg) => { console.log(msg) }
window.matchMedia = () => ({})
window.scrollTo = () => { }

// add some helpful assertions
import '@testing-library/jest-dom/extend-expect'
// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each'
// jquery 3rd party lib
import $ from 'jquery'
// eslint-disable-next-line no-undef
global.$ = global.jQuery = $
// mock window functions
window.confirm = () => true
// eslint-disable-next-line no-console
window.alert = (msg) => { console.log(msg) }
window.matchMedia = () => ({})
window.scrollTo = () => { }

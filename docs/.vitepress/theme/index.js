import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroCampaignSlider from './components/HeroCampaignSlider.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroCampaignSlider', HeroCampaignSlider)
  }
}

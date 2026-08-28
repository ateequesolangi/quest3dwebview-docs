import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroCampaignSlider from './components/HeroCampaignSlider.vue'
import MarketingSections from './components/MarketingSections.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroCampaignSlider', HeroCampaignSlider)
    app.component('MarketingSections', MarketingSections)
  }
}

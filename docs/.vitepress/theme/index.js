import DefaultTheme from 'vitepress/theme'
import './custom.css'
import TopHeroMarketing from './components/TopHeroMarketing.vue'
import HeroCampaignSlider from './components/HeroCampaignSlider.vue'
import MarketingSections from './components/MarketingSections.vue'
import BlueprintNodesGuide from './components/BlueprintNodesGuide.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TopHeroMarketing', TopHeroMarketing)
    app.component('HeroCampaignSlider', HeroCampaignSlider)
    app.component('MarketingSections', MarketingSections)
    app.component('BlueprintNodesGuide', BlueprintNodesGuide)
  }
}

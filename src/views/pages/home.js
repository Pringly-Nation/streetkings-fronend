import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content"> <!------drifting animation------>
        <img class="commodore-drift" src="/images/holden-drift.png">
        <img class="driftcloud1" src="./images/smoke-anim.png">
        <img class="driftcloud2" src="./images/smoke-anim.png">
        <div class="hero-image-header">
          <p> Featured Cars </p>
          <p> V8 Holden Commodore </p>
        </div>
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SellView {
  init(){
    document.title = 'Sell'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Sell" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Sell</h1>
        <p>You sell cars here<p>

        <div class="sell-cards">
          <div class="card">
            <sl-button></sl-button>
          </div>

          <div class="card">
            <sl-button></sl-button>
          </div>

          <div class="card">
            <sl-button></sl-button>
          </div>

        </div>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new SellView()
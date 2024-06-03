import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'
import cart from './../views/pages/cart'

customElements.define('va-cartcar', class Cars extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id:{
        type: String
      },
      name: {
        type: String
      },  
      price: {
        type: String
      },
      colour:{
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      mileage: {
        type: String
      },
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  
  render(){    
    return html`
    <style>
        .author{
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
        .car-card::part(base){
          background-color: black;
        }
        .car-card::part(base){
          background-color: black;
        }
    </style>
    <sl-card class="car-card">
      <sl-icon-button name="x-lg" label="Remove From Cart" @click=${cart.removeCartCarHandler.bind(this)}></sl-icon-button>
      <img slot="image" src="${App.apiBase}/images/${this.image}" />
      <h3>${this.name}</h3>
      <h3>$${this.price}</h3>
      <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
    </sl-card>
    `
  }
})
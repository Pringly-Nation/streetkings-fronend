import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-garagecar', class Cars extends LitElement {
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
      <img slot="image" src="${App.apiBase}/images/${this.image}" />
      <h3>${this.name}</h3>
    </sl-card>
    `
  }
})
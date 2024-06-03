import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-car', class Cars extends LitElement {
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

   async moreInfoHandler(){ // more information function for the cars to pop up with more information
    //new sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    //add class name
    dialogEl.className = 'car-dialog'
    // sl dialog content
    const dialogContent = html`
        <style>
            .wrap {
                display: flex;
            }
            .image {
                width: 50%;
            }
            .image img {
                width: 100%;
            }
            .content {
                padding-left: 1em;
            }
            .mileage span,
            .transmission span {
                text-transform: uppercase;
                font-weight: bold;
            }
            .price{
                font-size: 1.5em;
                color: var(--brand-color)
            }
            .card_body::part(body){
              background-color: black;
            }
        </style>
        <div class="wrap">
            <div class="image">
                <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
            </div>
            <div class="content">
                <h1>${this.name}</h1>
                <p class="colour">${this.colour}</p>
                <p class="price">$${this.price}</p>
                <p class="mileage">Mileage: <span>${this.mileage} km</span></p>

                <sl-button @click=${this.addFavHandler.bind(this)}>
                <sl-icon slot="prefix" name="car-front"></sl-icon>
                Add to Garage
                </sl-button>
        </div>
    `
    render(dialogContent, dialogEl)
    //append to document.body
    await document.body.append(dialogEl)
    //show sl-dialog
    dialogEl.show()
    // on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', ()=>{
        dialogEl.remove()
    })
  }

  async addFavHandler(){    //how to add cars into the garage
    try {
      await UserAPI.addFavCar(this.id)
      Toast.show('Car added to Garage')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async addCartHandler(){    //how to add cars into the cart
    try {
      await UserAPI.addCartCar(this.id)
      Toast.show('Car added to Cart')
    }catch(err){
      Toast.show(err, 'error')
    }
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
        <h3>$${this.price}</h3>
        <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
        <sl-button @click=${this.moreInfoHandler}>More Info</sl-button>
        <sl-icon-button name="car-front" label="Add to Garage" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
        <sl-icon-button name="cart2" label="Add to Cart" @click=${this.addCartHandler.bind(this)}></sl-icon-button>
    </sl-card>
    `
  }
})
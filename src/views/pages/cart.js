import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'

class CartView {
  init(){
    document.title = 'Cart'   
    this.cartCars = null 
    this.render()    
    Utils.pageIntroAnim()
    this.getCartCars()
  }

  async getCartCars(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.cartCars = currentUser.cartCars
      console.log(this.cartCars)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Your Cart" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Your Cart</h1>
        <div class="cars-grid">
          ${this.cartCars == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
          ${this.favCars.map(car => html`
          <va-car class="car-card"
                id="${car._id}"
                price="${car.price}"
                colour="${car.colour}"
                user="${JSON.stringify(car.user)}"
                image="${car.image}"
                mileage="${car.mileage}"
              >        
              </va-car>
          `)}
        `}
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CartView()
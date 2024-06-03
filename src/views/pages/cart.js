import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class CartView {
  init(){
    document.title = 'Cart'   
    this.cartedCars = null 
    this.render()    
    Utils.pageIntroAnim()
    this.getCartCars()
  }

  async getCartCars(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.cartedCars = currentUser.cartCars
      console.log(this.cartedCars)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  checkOutHandler(){ // function to confirm purchase
    Toast.show('Congratulations on your purchase!')
  }

  render(){
    const template = html`
      <va-app-header title="Your Cart" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="cars-grid">
          ${this.cartedCars == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`   
          ${this.cartedCars.map(car => html`
            <va-cartcar class="car-card"
                name="${car.name}"
                id="${car._id}"
                price="${car.price}"
                colour="${car.colour}"
                user="${JSON.stringify(car.user)}"
                image="${car.image}"
                mileage="${car.mileage}"
              >        
              </va-cartcar>
              
              `)}
            `} 
              
          </div> 
          <sl-button class="checkoutBtn"  @click=${this.checkOutHandler.bind(this)}>Check Out</sl-button> 
          <!------check out button for feedback.------>
          `
    render(template, App.rootEl)
  }
}


export default new CartView()
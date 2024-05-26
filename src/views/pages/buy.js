import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import CarAPI from './../../CarAPI'

class BuyView {
  init(){
    document.title = 'Buy'   
    this.cars = null 
    this.render()    
    Utils.pageIntroAnim()
    this.getCars()
  }

  async getCars(){
    try{
      this.cars = await CarAPI.getCars()
      console.log(this.cars)
      this.render()
    }catch{
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Buy" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Spotlight Cars</h1>
        <div class="cars-grid">
          
          ${this.cars == null ? html`
            <sl-spinner></sl-spinner>
            `:html`
            ${this.cars.map(car => html`

               <va-car class="car-card"
                id="${car._id}"
                name="${car.name}"
                description="${car.description}"
                price="${this.car.price}"
                user="${JSON.stringify(car.user)}"
                image="${this.car.image}"
                mileage="${this.car.mileage}"
              >        
              </va-car>
              `)}
            `}   
          </div>   
    `
    render(template, App.rootEl)
  }
}


export default new BuyView()
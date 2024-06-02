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
    this.filterCars()
  }

  async filterCars(field, match){
    //validate
    if(!field || !match) return

    // get fresh haircuts
    this.cars = await CarAPI.getCars()

    let filteredCars

    // mileage
    if(field == 'mileage'){
      filteredCars = this.cars.filter(car => car.mileage == match)
    }

    //colour


    //price
    if(field == 'price'){
      // get priceRangeStart 
      const priceRangeStart = match.split('-')[0]
      const priceRangeEnd = match.split('-')[1]
      filteredCars = this.cars.filter(car => car.price <= priceRangeStart && car.price <= priceRangeEnd)

    }

    this.cars = filteredCars
    this.render()
  }

  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("variant"))
  }

  handleFilterBtn(e){
    this.clearFilterBtns()
    // set button active
    e.target.setAttribute("variant", "primary")
    // extract the field and match from buttons
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    this.filterCars(field, match)
  }

    clearFilters(){
      this.getCars()
      this.clearFilterBtns()
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
    <style>
        .filter-menu{
          display:flex;
          align-items: center;
        }

        .filter-menu > div{
          margin-right: 1em;
        }
      </style>
      <va-app-header title="Buy" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Spotlight Cars</h1>
        
        <div class="filter-menu">
          <div>
          Filter By
          </div>  
          <div>
          <strong>mileage</strong>
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="m" @click=${this.handleFilterBtn.bind(this)}>M</sl-button>
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="f" @click=${this.handleFilterBtn.bind(this)}>F</sl-button>
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="u" @click=${this.handleFilterBtn.bind(this)}>U</sl-button>
          </div>
          <strong>Price</strong>
            <sl-button class="filter-btn" size="small" data-field="price" data-match="10000-20000" @click=${this.handleFilterBtn.bind(this)}>10000-20000 km</sl-button>
            <sl-button class="filter-btn" size="small" data-field="price" data-match="20000-30000" @click=${this.handleFilterBtn.bind(this)}>20000-30000 km</sl-button>
            <sl-button class="filter-btn" size="small" data-field="price" data-match="30000-40000" @click=${this.handleFilterBtn.bind(this)}>30000-40000 km</sl-button>
            <div>
            <sl-button class="filter-btn" size="small" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
          </div>  
        </div>
       
          <div class="cars-grid">
          ${this.cars == null ? html`
            <sl-spinner></sl-spinner>
            `:html`
            ${this.cars.map(car => html`
               <va-car class="car-card"
                name="${car.name}"
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
              </div>`
    render(template, App.rootEl)
  }
}


export default new BuyView()
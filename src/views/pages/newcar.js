import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import CarAPI from './../../CarAPI'
import Toast from './../../Toast'


class newCarView {
  init(){
    document.title = 'New Car'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newCarSubmitHandler(e){ 
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)

    try{
      await CarAPI.newCar(formData) 
      Toast.show('Car Added!')
      submitBtn.removeAttribute('loading', '') 
      //reset form
      //reset text + textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)

      //reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio-group')
      if (radioInputs) radioInputs.forEach(radioInput => radioInput.value = null)

      //reset file input
      const fileInput = document.querySelector('input[type=file]')
      if(fileInput) fileInput.value = null

    } catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading', '') 
    }
  }

  render(){
    const template = html`
      <va-app-header title="New Car" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Car</h1>
        <form class="page-form" @submit=${this.newCarSubmitHandler}> <!------form to add cars into the database------>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Car Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span><style>span{color:black}</style>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="colour" rows="3" placeholder="Colour"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group">
            <sl-textarea name="mileage" rows="3" placeholder="Mileage"></sl-textarea>
          </div>
          <sl-button variant="primary" type="submit" class="submit-btn">Add Car</sl-button>
        </form>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newCarView()
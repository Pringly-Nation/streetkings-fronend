import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'


class App {
  constructor(){
    this.name = "Cars"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3000'
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  init() { 
    console.log("App.init")
    
    // Toast init
    Toast.init()   
    
    // Authentication check    
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

// create a new HTML link element
let link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/png';
link.href = './images/streetkings-logo';

// remove any existing favicon
var existingLink = document.querySelector('link[rel="icon"]');
if (existingLink) {
document.head.removeChild(existingLink);
}

// add the new favicon
document.head.appendChild(link);

export default new App()
import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class UserAPI {
  
  async updateUser(userId, userData, dataType = 'form'){
    // validate
    if(!userId || !userData) return
    
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: userData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      }
    }
  
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/user/${userId}`, responseHeader)
  
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getUser(userId){
    // validate
    if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting user')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
  
  async addFavCar(carId){
    // validate
    if(!carId) return
  
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/addFavCar`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({carId: carId})
    })
  
    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem adding car to garage')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  
  }
 
  async addCartCars(carId){
    // validate
    if(!carId) return
  
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/addCartCar`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({carId: carId})
    })
  
    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem adding car to cart')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  
  }
  async removeGarageCar(carId){
    // validate
    if(!carId) return
  
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/removeGarageCar`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({carId: carId})
    })
  
    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem removing car to cart')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  
  }
}

export default new UserAPI()
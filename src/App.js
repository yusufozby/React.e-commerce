import React, {useState,useEffect}from 'react'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import { commerce } from './components/lib/commerce'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout'



const App = () => {
  const [products,setProducts] = useState([]);
  const [cart, setCart] = useState({})
  const [order,setOrder] = useState({})
  const [errorMessage,setErrorMessage] = useState(''); 


  
  const fetchProducts = async ()=>{
    const {data} = await commerce.products.list()

    setProducts(data)
  }
  const fetchCart = async ()=>
{
  
   setCart(await commerce.cart.retrieve())
}
const handleAddtoCart = async(productId,quantity)=>{
  const item = await commerce.cart.add(productId,quantity)
 setCart(item.cart)
}
const handleUpdateCartQty = async (productId,quantity) => {
  const response= await commerce.cart.update(productId,{quantity})
  setCart(response.cart)

}

const handleRemoveFromCart = async(productId)=>{
     const response = await commerce.cart.remove(productId)
     setCart(response.cart)
  }
  const handleEmptyCart = async()=>{
const response = await commerce.cart.empty();
setCart(response.cart)
    
  }
  const refreshCart = async() => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }
  const handleCaptureCheckout = async (checkoutTokenId,newOrder) =>{
    try {
      const {incomingOrder} = await commerce.cart.capture(checkoutTokenId,newOrder)

      setOrder((incomingOrder))
      refreshCart();
    }
    catch(error){
     setErrorMessage(error.data.error.message)
    }
    
  }
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[])
  console.log(cart)



  return (
    <Router>
    <div>
      
      <Navbar totalItems={cart.total_items}/>
      
     
           
     
         
        
       
          <Routes>
     
           <Route path='/' element={ <Products products={products} onAddToCart={handleAddtoCart}  />}/>
          <Route path='/cart' element={<Cart cart={cart}  handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} />
          <Route path='/checkout' element={ <Checkout order={order} onCapturceCheckout={handleCaptureCheckout} error={errorMessage} cart={cart} />}/>
          
      
          </Routes>
       
        
   
    
    </div>
    </Router>
  )
}

export default App

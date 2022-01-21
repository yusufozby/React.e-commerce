import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import useStyles from './styles'
import Cartitem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

const Cart = ({cart,handleEmptyCart,handleRemoveFromCart,handleUpdateCartQty}) => {
    console.log(cart)
    const classes = useStyles();
  

        
    
   
   
    const EmptyCart = ()=>{
        return (
        <Typography  variant="subtitle1">You have no items in your shopping cart, 
        <Link to="/" className={classes.link}>start adding some</Link>!
        </Typography>
        )
    }
    const FilledCart = ()=>(
        <>
        <Grid   container style={{"width":"1500px","marginLeft":"50px"}}  >
            {cart.line_items.map((item)=>(
                <Grid   sm={3} style={{"margin":"5px"}}  key={item.id}>
                   <Cartitem onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} item={item}/>
                </Grid>

            ))}

        </Grid>
        <div className={classes.cardDetails}>
      <Typography variant='h4'>Subtotal:{cart.subtotal.formatted+"TL"}</Typography>
      <div>
          <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" variant="contained" color="secondary">Empty Cart</Button>
          <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" variant="contained" color="primary">Checkout</Button>
      </div>
        </div>
        
        
        </>
    )
    if(!cart.line_items){
        return "Loading..."
    }
   
 
 
    return (
        <div>
            <Container>
                <div className={classes.toolbar}></div>
                <Typography className={classes.title} style={{"textAlign":"center"}} variant="h4" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> :<FilledCart/>}
            
            </Container>
        </div>
    )
}

export default Cart

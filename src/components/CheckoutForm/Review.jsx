import React from 'react';
import { List,ListItem,ListItemText,Typography } from '@material-ui/core';

const Review = ({checkoutToken}) => {
console.log(checkoutToken.live.subtotal.formatted)
return (
<>
   

      <Typography variant='h6' gutterBottom>Order Summary</Typography>
          <List disablePadding> 
   {
       checkoutToken.live.line_items.map((product) => (
           <ListItem style={{'padding':'10px 0'}} key={product.name} >
               <ListItemText primary={product.name} secondary={'Quantity:'+product.quantity}/>
                   <Typography variant='body2'>
                           {product.line_total.formatted+"TL"}
                   </Typography>

              

           </ListItem>

       ))
   }
   <ListItem style={{'padding':'10px 0'}}>
       <ListItemText primary='Total ' />
           <Typography variant='subtitle1' style={{'fontWeight':'700px'}}>
      {checkoutToken.live.subtotal.formatted+"TL"}
           </Typography>

       

   </ListItem>
          </List>

      

</>
)   

};

export default Review;

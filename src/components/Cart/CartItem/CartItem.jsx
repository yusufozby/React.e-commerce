import React from 'react'
import { Typography,Button,Card,CardActions,CardContent,CardMedia } from '@material-ui/core'
import useStyles from './styles'
const Cartitem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
    const classes = useStyles();
    console.log(item)
    return (
        <div>
            <Card>
                <CardMedia image={item.image.url}  className={classes.media}/> 
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="h6">{item.line_total.formatted+"TL"}</Typography>

                </CardContent>
                <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                  <Button type='button' size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type='button' onClick={()=>onUpdateCartQty(item.id,item.quantity+1)} size="small">+</Button>
              </div>
              <Button variant='contained' type='button' color="secondary" onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>
                </CardActions>

             
            </Card>
        </div>
    )
}

export default Cartitem

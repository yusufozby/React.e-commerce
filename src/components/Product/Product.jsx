import React from 'react'
import { CardMedia,Card,CardContent,CardActions,Typography,IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './style'

const Product = ({product,onAddtoCart}) => {
    
    const classes = useStyles();
    return (
 
 <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.image.url} style={{"height":"10%"}} title={product.name}/>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant='h5' gutterBottom>
                            {product.name}

                        </Typography>
                        <Typography variant='h5' >
                            {product.price.formatted+"TL"}

                        </Typography>
                 
                    </div>
                    <Typography dangerouslySetInnerHTML={{__html:product.description}} variant='body2' text="textSecondary">

                    </Typography>

                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label='Add to card' onClick={()=>{onAddtoCart(product.id,1)}}>
                        <AddShoppingCart/>

                    </IconButton>

                </CardActions>

            

            </Card>
        </div>
    )
}
export default Product
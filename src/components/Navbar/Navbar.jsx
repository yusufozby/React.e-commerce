import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link,useLocation } from 'react-router-dom'
import useStyles from './styles'
import logo2 from '../assests/logo2.png'

const Navbar = ({totalItems}) => {
    const classes = useStyles()
    const location = useLocation();

   
    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography  to="/" component={Link} variant='h6' className={classes.title} color='inherit'>
                        <img alt='Commerce.js' src={logo2} height="25px" className={classes.image}/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === "/" ?(
                   <div className={classes.button}>
                       <IconButton to="/cart" component={Link}  aria-label="Show card items" color="inherit">
                           <Badge color='secondary' badgeContent={totalItems}>
                               <ShoppingCart/>
                           </Badge>

                       </IconButton>

                    </div>) :null} 
                </Toolbar>

            </AppBar>
    
        </div>
    )
}

export default Navbar

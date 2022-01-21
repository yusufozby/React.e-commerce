import React,{useEffect,useState} from 'react'
import { InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core'
import { useForm,FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../lib/commerce'
import {Link} from 'react-router-dom'

const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries,setShippingCountries] = useState([])
    const [shippingCountry,setShippingCountry] = useState('')
    const [shippingSubdivisions,setShippingSubdivisions] = useState([])
    const [shippingSubdivision,setShippingSubdivision] = useState('')
   
    const methods=useForm();
    


    const fetchShippingCountries = async (checkoutTokenid) =>{
  const {countries} = await commerce.services.localeListCountries(checkoutTokenid)

  setShippingCountries(countries)
  setShippingCountry(Object.keys(countries)[0])
 
  
    }

    const fetchSubdivisions = async (countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        shippingSubdivision(Object.entries(subdivisions)[0])
        console.log(Object.entries(subdivisions)[0])
   
    }
  


useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
}, [])
useEffect(() => {
    if(shippingCountry) fetchSubdivisions(shippingCountry)
}, [shippingCountry])


const countries = Object.entries(shippingCountries).map(([code,ad])=>({id:code,label:ad}))
const subdivisions = Object.entries(shippingSubdivisions).map(([code,ad])=>({id:code,label:ad}))





    return (
        <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
<form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision}))}>
    <Grid container spacing={3} >
        <FormInput required name='firstName' label='First name'/>
        <FormInput required name='lastName' label='Last name'/>
        <FormInput required name='address1' label='Address'/>
        <FormInput required name='email' label='Email'/>
        <FormInput required name='City' label='City'/>
        <FormInput required name='zip' label='ZIP / Postal code'/>
      <Grid style={{"marginTop":"15px"}} >
          <InputLabel>Shipping country</InputLabel>
          <Select  style={{"width":"275px",}}  fullWidth value={shippingCountry} onChange={(e)=>setShippingCountry(e.target.value)}>
         {
             countries.map((country) => (
<MenuItem  key={country.id} value={country.id}>
    {country.label}
</MenuItem>

             ))
         }
      </Select>
      </Grid>
      <Grid style={{"marginLeft":"12px","marginTop":"15px"}} >
          <InputLabel>Shipping Subdivion</InputLabel>
          <Select  style={{"width":"275px",}} fullWidth value={shippingSubdivision} onChange={(e)=>setShippingSubdivision(e.target.value)}>
         {
             subdivisions.map((subdivision) => (
<MenuItem  key={subdivision.id} value={subdivision.id}>
    {subdivision.label}
</MenuItem>
))
         }
     </Select>
      </Grid>
      <br/>
    <div style={{"display":"flex","justifyContent":"space-between","width":"100%","marginRight":"12px","marginTop":"15px"}}>
 <Button style={{"marginRight":"25px"}} component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
 <Button type='submit' variant='contained' color="primary">Next</Button>
    </div>

    </Grid>
   

</form>
        </FormProvider>
        </>
    )
}

export default AddressForm

import React,{useState,useEffect} from 'react'
import { Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../lib/commerce'
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
const classes = useStyles();
const steps = ['Shipping address','Payment details']
const [activeStep,setActiveStep] = useState(0);
const [checkoutToken,setCheckoutToken] = useState(null)
const [ShippingData,setShippingData] = useState({})

const Form = () =>  activeStep === 0 ? 
<AddressForm next={next} checkoutToken={checkoutToken}/> : <PaymentForm onCaptureCheckout={onCaptureCheckout} backStep={backStep} nextStep={nextStep}  shippingData={ShippingData} checkoutToken={checkoutToken}/>


const Confirmation = () => (
    <div>
        Comfirmation
    </div>
)  
const  nextStep = ()=> setActiveStep((prevActiveStep)=>prevActiveStep+1) 
const  backStep = ()=> setActiveStep((prevActiveStep)=>prevActiveStep-1) 

const next = (data)=>{
    setShippingData(data);
    nextStep();

}

useEffect(()=>{
const generateToken = async()=>{
    try {
   const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
   
   console.log(token)
   setCheckoutToken(token)
    } catch(error){

    }

    
}
generateToken()
},[cart])

return (

<>

        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>

                    {steps.map((step)=>(
                        <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                  </Step>
                    ))}
                </Stepper>

{activeStep === steps.length ? <Confirmation/>  :checkoutToken && <Form/>}
            </Paper>

        </main>
        </>
    )
                    }

export default Checkout
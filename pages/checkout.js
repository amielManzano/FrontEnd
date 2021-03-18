    import { Router } from 'next/router'
    import { useRouter } from 'next/router'
    import React, {useState, useEffect} from 'react'
    import swal from 'sweetalert'
    import {Card, Button} from 'react-bootstrap'
    import Paypal from './components/Paypal'

    export default function libre(){
        const [productsOnCart, setProductsOnCart]=useState("")
        const [reload, setReload] = useState(false)
        const [user, setUser] = useState('')
        const router = useRouter()

        // const [address, setAddress] = useState('false')
        // const [reload, setReload] = useState(false)

        let arrayOfCart=[]
    
        useEffect(async function(){
            // setReload(!reload)
           let userDetailsUrl=await fetch('https://mighty-garden-47499.herokuapp.com/user-details', {
               method: 'POST',
               headers: { 'Content-type': 'Application/JSON'},
               body: JSON.stringify({
                   userId: localStorage.getItem('userId')
               })
           })
    
           let cod=await userDetailsUrl.json()
           setUser(cod.address)
           localStorage.setItem('address', cod.address)
           console.log()
    
           cod.cart.map(items=> {
            arrayOfCart.push({
                product_title: items.product_title,
                productId: items.productId,
                product_main_image_url: items.product_main_image_url,
                app_sale_price: items.app_sale_price
            })
           })
           
           
    
           let objectOnCart=cod.cart.map(items=> {
            async function purchasedFunction(e){
                e.preventDefault()
                // console.log(`phone: ${phone} address: ${address}`)
               console.log(localStorage.getItem('userId'))
                let ere=await fetch('https://mighty-garden-47499.herokuapp.com/checkout-product', {
                    method: 'POST',
                    headers: { 'Content-type': 'Application/JSON'},
                    body: JSON.stringify({
                       userId: localStorage.getItem('userId'),
                       productId: items.productId,
                       product_title: items.product_title,
                       app_sale_price: items.app_sale_price,
                       product_main_image_url: items.product_main_image_url
                    })
                })
         
                console.log(await ere.json())
                swal({
                    title: "Success!",
                    text: `You added a product to cart`,
                    icon: "success",
                    button: "continue",
                });
                setReload(!reload)
                router.push('/checkout')
                // window.location.replace('/checkout')
             
            }
           
              return(
                // <li key={items._id}>
                //     {items.product_title}
                //     <button type="submit" onClick={e=>{purchasedFunction(e)}}>Proceed to Checkout</button>
                // </li>

                <div className='col-12'>
                <Card className='mb-2'>
                    <Card.Header className='text-left'>Price: {items.app_sale_price} USD</Card.Header>
                    <Card.Body>
                        <>
                        <div className='row'>
                            <div className='col-1'>
                            <img src={items.product_main_image_url} style={{height: '80px'}}></img>
                            </div>
                            <div className='col-9'>
                                <Card.Title className='text-center secondFont'>{items.product_title}</Card.Title>
                            </div>
                            {/* <Form>
                                <Form.Group controlId="address">
                                    <Form.Label>Address:</Form.Label>
                                    <Form.Control type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group controlId="phone">
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control type="text" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} required/>
                                </Form.Group>
                            </Form> */}
                            <div className='col-2'>
                                {
                                    (localStorage.getItem('address') != 'undefined')
                                    ?
                                    <>
                                    <Button type="submit" onClick={e=>{purchasedFunction(e)}} block variant='warning'>COD</Button>
                                    </>
                                    :
                                    <>
                                    <Button type="submit" onClick={e=>{purchasedFunction(e)}} block variant='warning' disabled>COD</Button>
                                    <br></br>
                                    <p className='cRed secondFont'>update you address</p>
                                    </>
                                }
                            </div>
                                
                                
                        </div>
                        </>
                    </Card.Body>
                </Card>
                </div>
              )
           })
    
    
           setProductsOnCart(objectOnCart)
    
        }, [reload])
    
        console.log(arrayOfCart)
        console.log(user)
    
        async function pushCart(e){
            e.preventDefault()
            
        }
    
        return(
            <>
                <h1 className='text-center thirdFont my-5'>Checkout</h1>
                <div className='container  mb-5'>
                <div className='row'>{productsOnCart}</div>
                <Paypal className='w-100'/>
                {/* // <Button variant="danger" className='w-100 mt-5'>Pay Via Paypal</Button> */}
                </div>
                    
                    {/* <button type="submit" onClick={e=>pushCart(e)}>PROCEED...</button> */}
                
            </>
        )
    }
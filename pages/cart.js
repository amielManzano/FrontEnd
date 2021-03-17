import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Card, Button, Container, Form} from 'react-bootstrap'
import { Router, useRouter } from 'next/router'
import swal from 'sweetalert'


export default function cart() {

    const [productName, setProductName] = useState("")
    const [checkoutList, setCheckoutList]= useState("")
    const [change, setChange] = useState(true)

    const router = useRouter()

    async function checkoutBtn(e){
      router.push('/checkout')        
    }   

    useEffect(async() => {

        
       let userDetailsUrl =await fetch('https://mighty-garden-47499.herokuapp.com/user-details', {
           method: 'POST', 
           headers: { 'Content-type': 'Application/JSON'},
           body: JSON.stringify({
               userId: localStorage.getItem('userId')
           })
       })
        let data= await userDetailsUrl.json()
       
       let cartProduct= data.cart.map(items =>{
             console.log(items)
             function viewSpecific(e){
                e.preventDefault()
                localStorage.setItem('viewThis', items.productId)
                router.push('/product')
              }

             async function deleteFromCart(){
                let deleteProduct = await fetch('https://mighty-garden-47499.herokuapp.com/delete-from-cart',{
                    method: 'POST',
                    headers:{ 'Content-type': 'Application/JSON'},
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        productId: items.productId    
                    })
                })
                console.log(await deleteProduct.json())
                swal({
                    title: "Success!",
                    text: `You deleted a product from the cart`,
                    icon: "success",
                });
                setChange(!change)

                
                
    
           }
            return(
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
                            <div className='col-2'>
                                <Form onSubmit = { e => viewSpecific(e)} className="">
                                    <Button variant="warning" type="submit" className='w-100'>View</Button>
                                </Form>
                                <Button variant="danger" onClick ={e=>deleteFromCart()} className='w-100'>Delete</Button>
                            </div>
                        </div>
                        </>
                    </Card.Body>
                </Card>
                </div>
            )
        })

        setProductName(cartProduct)
   
               
        // Checkout Product

       

    },[change])


  return (
      <Container>
            <h1 className='text-center firstFont my-5'>Cart</h1>
            <div className='row  mb-5'>
            {productName}
            <button type="submit" onClick={e=>checkoutBtn(e)} className='my-5 btn btn-danger w-100'>Proceed to Checkout</button>
            
               {checkoutList} 
            </div>
              
          
    </Container>
  )
}
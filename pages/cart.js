import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Card, Button, Container, Form} from 'react-bootstrap'
import { Router, useRouter } from 'next/router'


export default function cart() {

    const [productName, setProductName] = useState("")
    const [checkoutList, setCheckoutList]= useState("")
    const router = useRouter()

    async function checkoutBtn(e){
        // let checkoutUrl = await fetch('http://localhost:4000/user-details',{
        //     method: 'POST',
        //     headers: { 'Content-type': 'Application/JSON'},
        //     body: JSON.stringify({
        //         userId: localStorage.getItem('userId')
        //     })
        // })
        // // console.log(checkoutUrl)
        // const data = await checkoutUrl.json()
        // let checkoutProduct =  data.cart.map(items=>{
        //     return(
        //     <li>
        //         {items.product_title}
        //     </li>
        //     )
            

        
        // })
        // setCheckoutList(checkoutProduct) 
      router.push('/checkout')
        


        
    }   

    useEffect(async() => {

        
       let userDetailsUrl =await fetch('http://localhost:4000/user-details', {
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
                let deleteProduct = await fetch('http://localhost:4000/delete-from-cart',{
                    method: 'POST',
                    headers:{ 'Content-type': 'Application/JSON'},
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        productId: items.productId    
                    })
                })
                console.log(await deleteProduct.json())
                router.push('/cart')
    
           }
            return(
                <div className='col-12'>
                {/* <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={items.product_main_image_url}/>
                <Card.Body>
                    <Card.Title>{items.product_title}</Card.Title>
                    <Card.Text>USD {items.app_sale_price}</Card.Text>
                    <Button variant="primary" onClick ={e=>deleteFromCart()}>Delete</Button>
                </Card.Body>
                </Card> */}

                <Card className='mb-2'>
                    <Card.Header>{items.product_title}</Card.Header>
                    <Card.Body>
                        <>
                        <Card.Title className='text-right'>Price: {items.app_sale_price} USD</Card.Title>
                        <Form onSubmit = { e => viewSpecific(e)} className="">
                            <Button variant="warning" type="submit" className='w-100'>View</Button>
                        </Form>
                        <Button variant="secondary" onClick ={e=>deleteFromCart()} className='w-100'>Delete</Button>
                        </>
                    </Card.Body>
                </Card>
                </div>
            )
        })

        setProductName(cartProduct)
   
               
        // Checkout Product

       

    },[])


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
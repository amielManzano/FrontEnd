import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Card, Button} from 'react-bootstrap'
import { Router, useRouter } from 'next/router'
import Checkout from './checkout'


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
                window.location.replace('/cart')
    
           }
            return(
                <>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={items.product_main_image_url}/>
                <Card.Body>
                    <Card.Title>{items.product_title}</Card.Title>
                    <Card.Text>USD {items.app_sale_price}</Card.Text>
                    <Button variant="primary" onClick ={e=>deleteFromCart()}>Delete</Button>
                </Card.Body>
                </Card>
                </>
            )
        })

        setProductName(cartProduct)
   
               
        // Checkout Product

       

    },[])


  return (
      <>
       
            {productName}
            <button type="submit" onClick={e=>checkoutBtn(e)}>Proceed to Checkout</button>
          {/* <ul>
              {checkoutList}
          </ul> */}

          {/* <Checkout/> */}
    </>
  )
}
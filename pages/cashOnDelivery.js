import React,{useState, useEffect} from 'react'
import {Card, Button, Container}from 'react-bootstrap'


export default function CashOnDelivery(){
    let[cashProd, setCashProd]=useState('')

    useEffect(async ()=>{

        let userDetails = await fetch('https://mighty-garden-47499.herokuapp.com/user-details',{
            method: 'POST',
            headers:{'Content-type': 'Application/JSON'
                },
            body:JSON.stringify({
                userId: localStorage.getItem('userId')
            })   

        })
        let detailsOfUser= await userDetails.json()
            //console.log(detailsOfUser.purchasedProduct)
            let productsAboutToPurchase = detailsOfUser.purchasedProduct.map(items=>{

                async function receivedProduct(e){
                   e.preventDefault()
                    let prodReceivedLinkUrl = await fetch('https://mighty-garden-47499.herokuapp.com/product-received',{
                        method: 'POST',
                        headers:{'Content-type': 'Application/JSON'},
                        body: JSON.stringify({
                            orderId:items._id,
                            userId: localStorage.getItem('userId'),
                            productId: items.productId,
                            product_title: items.product_title,
                            product_main_image_url: items.product_main_image_url,
                            app_sale_price: items.app_sale_price
                        })
                    })
               console.log(await prodReceivedLinkUrl.json())
               alert('PRODUCT RECEIVED')

              
                   
                }
               // console.log(items)
                return(
                    <Card className="md-12 mb-4" >
                        <Card.Img variant="top" src={items.product_main_image_url} style={{height:'50px'}, {width:'50px'}}/>
                        <Card.Body>
                            <Card.Title>{items.product_title}</Card.Title>
                            <Card.Text>
                            USD {items.app_sale_price}
                            </Card.Text>
                            <button type="submit" onClick={e=>{receivedProduct(e)}}>Received</button>
                        </Card.Body>
                        </Card>
                )
            })
            setCashProd(productsAboutToPurchase)

    })
    return(
        <>
            <Container>
            <p>Cash On Delivery</p>
            {cashProd}
            </Container>
        </>
    )
}
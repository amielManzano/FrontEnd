import React, {useState, useEffect} from "react";
import { Router, useRouter } from 'next/router'


export default function checkoutPage() {

    const toNumbers = arr=> arr.map(Number)
    const [checkoutList, setCheckoutList]= useState("")
    const[totalPurchase, setTotalPurchase] = useState(0)
    const router = useRouter()

    useEffect(async() => {

        
        let userDetailsUrl =await fetch('http://localhost:4000/user-details', {
            method: 'POST', 
            headers: { 'Content-type': 'Application/JSON'},
            body: JSON.stringify({
                userId: localStorage.getItem('userId')
            })
        })
         let data= await userDetailsUrl.json()
         console.log(data)
         let total=0
        let cartProduct= data.cart.map(items =>{
             // let fixedNumber=parseInt(items.app_sale_price)
             let fixedNumber = toNumbers([items.app_sale_price])
             // console.log(fixedNumber)
              fixedNumber.map(i=>{
                  total+=i
                  
              })

 
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
                //  Router.push('/cart')
     
            }

           // total+=items.app_sale_price
           console.log(total)

           
             return(
                 <>
                 <li>{items.product_title}
                    <ul>
                    <li>USD {items.app_sale_price}</li>
                    </ul>
                 </li>
                 
                 </>
             )
         })
        // console.log(total)
         setCheckoutList(cartProduct)
         setTotalPurchase(total)
                
         // Checkout Product
 
        
 
     },[])
 
        


     
    return(
        <>
        <ul>
            {checkoutList}
        </ul>
        <p>Total: {totalPurchase}</p>
        <button type="submit">Checkout</button>
        </>
        
    )
}
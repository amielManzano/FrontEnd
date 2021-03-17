// import React, {useState, useEffect} from "react";
// import { Router, useRouter } from 'next/router'
// import CheckoutForm from "./components/CheckoutForm";




// export default function checkoutPage() {

//     const toNumbers = arr=> arr.map(Number)
//     const [checkoutList, setCheckoutList]= useState("")
//     const[totalPurchase, setTotalPurchase] = useState(0)
//     const router = useRouter()

//     useEffect(async() => {

        
//         let userDetailsUrl =await fetch('http://localhost:4000/user-details', {
//             method: 'POST', 
//             headers: { 'Content-type': 'Application/JSON'},
//             body: JSON.stringify({
//                 userId: localStorage.getItem('userId')
//             })
//         })
//          let data= await userDetailsUrl.json()
//          console.log(data)
//          let total=0
//         let cartProduct= data.cart.map(items =>{
//              // let fixedNumber=parseInt(items.app_sale_price)
//              let fixedNumber = toNumbers([items.app_sale_price])
//              // console.log(fixedNumber)
//               fixedNumber.map(i=>{
//                   total+=i
                  
//               })

 
//               async function deleteFromCart(){
//                  let deleteProduct = await fetch('http://localhost:4000/delete-from-cart',{
//                      method: 'POST',
//                      headers:{ 'Content-type': 'Application/JSON'},
//                      body: JSON.stringify({
//                          userId: localStorage.getItem('userId'),
//                          productId: items.productId    
//                      })
//                  })
//                  console.log(await deleteProduct.json())
//                 //  Router.push('/cart')
     
//             }

//            // total+=items.app_sale_price
//            console.log(total)

           
//              return(
//                  <>
//                  <li>{items.product_title}
//                     <ul>
//                     <li>USD {items.app_sale_price}</li>
//                     </ul>
//                  </li>
                 
//                  </>
//              )
//          })
//         // console.log(total)
//          setCheckoutList(cartProduct)
//          setTotalPurchase(total)
                
//          // Checkout Product
 
        
 
//      },[])
 
     
//     return(
//         <>
//         <ul>
//             {checkoutList}
//         </ul>
//         <p>Total: {totalPurchase}</p>
//         <button type="submit">Checkout</button>
//         <CheckoutForm/>
//         </>
        
//     )
// }
// import React, {useState, useEffect} from 'react'
// import Stripe from "stripe";
// import { parseCookies, setCookie } from "nookies";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutPurchase from "./components/CheckoutPurchase";
// import CheckoutForm from "./components/CheckoutForm";


// const stripePromise = loadStripe("pk_test_Yn190Oz50wg8GtmVbG2b2NJr");

// //(console.log(window.localStorage)
// export const getServerSideProps = async ctx => {

  
//   const stripe = new Stripe("sk_test_yoNVLIAl3McXi4TTxprog81a");

//   let paymentIntent;


//   const { paymentIntentId } = await parseCookies(ctx);

//   if (paymentIntentId) {
//     paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     return {
//       props: {
//         paymentIntent
//       }
//     };
//   }
 
//   paymentIntent = await stripe.paymentIntents.create({
    
//     amount:100,
//     currency: "GBP"
//   });

  
//   setCookie(ctx, "paymentIntentId", paymentIntent.id);

//   return {
//     props: {
//       paymentIntent
//     }
//   };
// };

// const CheckoutPage = ({ paymentIntent }) => (
//   <>
//   <Elements stripe={stripePromise}>
//   <CheckoutPurchase />
//     <CheckoutForm paymentIntent={paymentIntent} />
//   </Elements>
 
//   </>
// );

// export default CheckoutPage;
import {useState, useEffect, useRef} from 'react'


const PaypalBtn = ()=>{
    const[totalPurchase, setTotalPurchase] = useState('')
    let totalValueFromCart=0
    // console.log(localStorage.getItem('totalToPay'))
        const refPaypalBtn = useRef()

        useEffect(async()=>{
            let urlForFetchingUserDetails=await fetch('http://localhost:4000/user-details',{
                method: 'POST',
                headers: { 'Content-type': 'Application/JSON'},
                body: JSON.stringify({
                    userId: localStorage.getItem('userId')
                })
            })

           let fetchedUserDetails=await urlForFetchingUserDetails.json()
          
           fetchedUserDetails.cart.map(items=>{
               console.log(parseFloat(items.app_sale_price))
               totalValueFromCart+=parseFloat(items.app_sale_price)
           })

           console.log(totalValueFromCart)
           localStorage.setItem('totalToPay', totalValueFromCart)

        })

        useEffect(()=>{
           paypal.Buttons({
                createOrder: function(data, actions) {
                  // This function sets up the details of the transaction, including the amount and line item details.
                  return actions.order.create({
                    description: 'Fish',
                    purchase_units: [{
                      amount: {
                        value: localStorage.getItem('totalToPay')
                      }
                    }]
                  });
                },
                onApprove: function(data, actions) {
                  // This function captures the funds from the transaction.
                  return actions.order.capture().then(function(response) {
                    // This function shows a transaction success message to your buyer.
                
                    alert('Transaction completed');
                  });
                }
                
              }).render(refPaypalBtn.current);
        },[])

        // async function CashOnDelivery(e){
        //     e.preventDefault()
        
        //     let checkOutUrl = await fetch('http://localhost:4000/checkout-product',{
        //         method: 'POST',
        //         header:{
        //             'Content-Type':'Application/JSON'
        //         },
        //         body:JSON.stringify({
        //             prod
        //         })
        //     })
        // }

    return(
        <>
       <div ref={refPaypalBtn}></div>
        {/* <button type="submit" onClick={e=>CashOnDelivery(e)}>Cash On Delivery</button> */}
       </>
    )
}

export default PaypalBtn;
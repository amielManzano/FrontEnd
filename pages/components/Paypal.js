import {useState, useEffect, useRef} from 'react'
import swal from 'sweetalert'
import { Router } from 'next/router'
import { useRouter } from 'next/router'


const PaypalBtn = ()=>{
    const router = useRouter()
    const[totalPurchase, setTotalPurchase] = useState('')
    let totalValueFromCart=0
    // console.log(localStorage.getItem('totalToPay'))
        const refPaypalBtn = useRef()

        useEffect(async()=>{
            let urlForFetchingUserDetails=await fetch('https://mighty-garden-47499.herokuapp.com/user-details',{
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
                
                    // alert('Transaction completed');

                    fetch('https://mighty-garden-47499.herokuapp.com/paypal', {
                      method: 'POST',
                      headers: { 'Content-type': 'Application/JSON'},
                      body: JSON.stringify({
                          userId: localStorage.getItem('userId')
                      })
                    })
                      .then(response => response.json())
                      .then(data => {
                        swal({
                          title: "Success!",
                          text: `Transaction complete`,
                          icon: "success",
                          button: "continue",
                        });
                        window.location.replace('/checkout')
                      })
                    })
                    
                  
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
       <div className='text-center w-100 my-5' ref={refPaypalBtn}></div>
        {/* <button type="submit" onClick={e=>CashOnDelivery(e)}>Cash On Delivery</button> */}
       </>
    )
}

export default PaypalBtn;
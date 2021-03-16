import React, {useState, useEffect} from 'react'

export default function checkOutPurchase(){
    const toNumbers = arr=> arr.map(Number)
    const [totalP,setTotalP] = useState(0)
    let total=0
    useEffect(async function(){
        let userDetailsUrl =await fetch('http://localhost:4000/user-details', {
            method: 'POST', 
            headers: { 'Content-type': 'Application/JSON'},
            body: JSON.stringify({
                userId: localStorage.getItem('userId')
            })
        })
         let data= await userDetailsUrl.json()
         console.log(data)

      
        data.cart.map(items =>{
              // let fixedNumber=parseInt(items.app_sale_price)
              let fixedNumber = toNumbers([items.app_sale_price])
              // console.log(fixedNumber)
               fixedNumber.map(i=>{
                   total+=i
                   
               })
            })
               console.log(total)
            //    localStorage.setItem('totalToPay', total)
            //    let yesGumanaKana = parseFloat(localStorage.getItem('totalToPay'))
            //    console.log(yesGumanaKana)
            //   setTotalP(yesGumanaKana) 
    }, [])
   
  return(
      <>
    <h1>This is simulation test</h1>
    <h5 id="payT">{totalP}</h5>
    </>
  )
}

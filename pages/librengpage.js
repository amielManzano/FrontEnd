import React, {useState, useEffect} from 'react'

export default function libre(){
    const [productsOnCart, setProductsOnCart]=useState("")
    let arrayOfCart=[]

    // async function purchasedFunction(e){
    //     e.preventDefault()
    //     alert('Hi')
    // }
    useEffect(async function(){
       let userDetailsUrl=await fetch('http://localhost:4000/user-details', {
           method: 'POST',
           headers: { 'Content-type': 'Application/JSON'},
           body: JSON.stringify({
               userId: localStorage.getItem('userId')
           })
       })

       let cod=await userDetailsUrl.json()

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
           
            let ere=await fetch('http://localhost:4000/checkout-product', {
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
            window.location.replace('/librengpage')
         
        }
          return(
            <li key={items._id}>
                {items.product_title}
                <button type="submit" onClick={e=>{purchasedFunction(e)}}>Proceed to Checkout</button>
            </li>
          )
       })


       setProductsOnCart(objectOnCart)

    }, [])

    console.log(arrayOfCart)
    

    async function pushCart(e){
        e.preventDefault()
        
    }

    return(
        <>
            <h1>HELLO WORLD</h1>
            <ul>
                {productsOnCart}
                {/* <button type="submit" onClick={e=>pushCart(e)}>PROCEED...</button> */}
            </ul>
        </>
    )
}
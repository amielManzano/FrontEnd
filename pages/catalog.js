import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { Form, Card, Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function Home() {
    const [categoryName, setCategoryName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [products, setProducts] = useState("")

    const [search, setSearch] = useState("")
    const [searchDisplay, setSearchDisplay] = useState("")
    const [user, setUser] = useState("")

    const router = useRouter()

    useEffect(() => {
        
        let urlAll = 'https://magic-aliexpress1.p.rapidapi.com/api/v2/categories'
        let keyAll = '5ca54c03b3msh8baf688928daeb6p1ca073jsn2c184cd3f98c'
        let hostAll = 'magic-aliexpress1.p.rapidapi.com'
        fetch(urlAll, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": keyAll,
                "x-rapidapi-host": hostAll
            }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let allCategories = data.map(index => {
                   if(index.alie_category_id){
                        return(
                            <option key={index.api_category_id}>{index.category_name}</option>
                        )
                    }
                })
               setCategoryName(allCategories)
            })
    },[])

    useEffect(() => {
        setUser(localStorage.getItem('userId'))
        
        console.log(selectedCategory)
        let urlAll = 'https://magic-aliexpress1.p.rapidapi.com/api/v2/categories'
        let keyAll = '5ca54c03b3msh8baf688928daeb6p1ca073jsn2c184cd3f98c'
        let hostAll = 'magic-aliexpress1.p.rapidapi.com'
        fetch(urlAll, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": keyAll,
                "x-rapidapi-host": hostAll
            }
            })
            .then(response => response.json())
            .then(data => {
                data.forEach(i => {

                    if(i.category_name == selectedCategory) {
                            let urlAll = `https://magic-aliexpress1.p.rapidapi.com/api/category/${i.alie_category_id}/products?shipFromCountry=&shipToCountry=&sort=&maxSalePrice=&minSalePrice=&keywords=`
                            let keyAll = '5ca54c03b3msh8baf688928daeb6p1ca073jsn2c184cd3f98c'
                            let hostAll = 'magic-aliexpress1.p.rapidapi.com'
                            fetch(urlAll, {
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-key": keyAll,
                                    "x-rapidapi-host": hostAll
                                }
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                    if(data.hasOwnProperty('docs')){
                                    let allProducts = data.docs.map(i => {
                                        
                                        //view details function
                                        function viewDetails(e){
                                            e.preventDefault()
                                            
                                            let urlSpecific = `https://magic-aliexpress1.p.rapidapi.com/api/product/${i.product_id}`
                                            fetch(urlSpecific, {
                                                "method": "GET",
                                                "headers": {
                                                    "x-rapidapi-key": keyAll,
                                                    "x-rapidapi-host": hostAll
                                                }
                                                })
                                                .then(response => response.json())
                                                .then(data => { 
                                                    console.log(data)
                                                    localStorage.setItem('viewThis', i.product_id)
                                                    router.push('/product')
                                                })
                                        }

                                        //add to cart function
                                        function addToCart(e){
                                            e.preventDefault()
                                            console.log(i.product_id)
                                            
                                            let urlSpecific = `http://localhost:4000/add-to-cart`
                                            fetch(urlSpecific, {
                                                method: "POST",
                                                headers: {
                                                    'Content-type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    userId: localStorage.getItem('userId'),
                                                    productId: i.product_id,
                                                    product_title: i.product_title,
                                                    product_main_image_url: i.product_main_image_url,
                                                    app_sale_price: i.app_sale_price
                                                })
                                                })
                                                .then(response => response.json())
                                                .then(data => { 
                                                    console.log(data)
                                                })
                                        }

                                        return(
                                            <div className='col-md-4'>
                                            <Card style={{ width: '100%' }} className='my-3' key={i.product_title}>
                                            <Card.Img variant="top" src={i.product_main_image_url} />
                                            <Card.Body>
                                                <Card.Title>{i.product_title}</Card.Title>
                                                <Card.Text>
                                                    Price: {i.app_sale_price_currency} {i.app_sale_price}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <>
                                                <Form onSubmit = { e => viewDetails(e)} className="">
                                                    <Button variant="warning" type="submit" className='w-100'>Details</Button>
                                                </Form>
                                                {
                                                (user != null) 
                                                ? 
                                                <Form onSubmit = { e => addToCart(e)} className="">
                                                    <Button variant="secondary" type="submit" className='w-100'>Add to cart</Button>
                                                </Form>
                                                :
                                                <Form onSubmit = { e => addToCart(e)} className="">
                                                    <Button variant="secondary" type="submit" className='w-100' disabled>Add to cart</Button>
                                                </Form>
                                                }
                                                {/* <Form onSubmit = { e => addToCart(e)} className="">
                                                    <Button variant="secondary" type="submit" className='w-100'>Add to cart</Button>
                                                </Form> */}
                                               </>
                                            </Card.Footer>
                                            </Card>
                                            </div>
                                        )
                                    })
                                    setProducts(allProducts)
                                }
                                    
                                })
                                
                        }
                    
                })

               
               
            })

    },[selectedCategory])

    function searchThis(e){
        e.preventDefault()
        fetch(`https://magic-aliexpress1.p.rapidapi.com/api/products/search?name=${search}&minSalePrice=5&shipToCountry=FR&sort=NEWEST_DESC&page=1&maxSalePrice=20&shipFromCountry=CN&fastDelivery=true`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "5ca54c03b3msh8baf688928daeb6p1ca073jsn2c184cd3f98c",
            "x-rapidapi-host": "magic-aliexpress1.p.rapidapi.com"
          }
        })
        .then(response => response.json())
        .then( data => {
          console.log(data)
          let allSearch = data.docs.map(i => {
            function viewSpecific(e){
              e.preventDefault()
              localStorage.setItem('viewThis', i.product_id)
              router.push('/product')
            }
            return(
            <div className='col-md-4'>
            <Card style={{ width: '100%' }} className='my-3' key={i.product_title}>
              <Card.Img variant="top" src={i.product_main_image_url} />
              <Card.Body>
                  <Card.Title>{i.product_title}</Card.Title>
                  <Card.Text>
                      Price: {i.app_sale_price_currency} {i.app_sale_price}
                  </Card.Text>
              </Card.Body>
              <Card.Footer>
                  <Form onSubmit = { e => viewSpecific(e)} className="">
                     
                    <Button variant="warning" type="submit" className='w-100'>View</Button>
                      
                  </Form>
              </Card.Footer>
            </Card>
            </div>
            )
          })
          setSearchDisplay(allSearch)
        })
      }
   
  return (
    <>
        <div className='container'>
            <div className='minHeightAdjust'>
                <h1 className='text-center mt-5 firstFont'>Catalog</h1>
                <Form.Group controlId="categoryName">
                    <Form.Label className='colorWhite'>Category name:</Form.Label>
                    <Form.Control as="select"  value={selectedCategory} 
                            onChange={e => setSelectedCategory(e.target.value)} required>
                                <option></option>
                                {categoryName}
                    </Form.Control>
                </Form.Group>

                <div className='row'>
                    {products}
                </div>
            </div>
            <div className='minHeightAdjust'>
                <h2 className='text-center firstFont my-5'>Looking for?</h2>
                <Form onSubmit = { e => searchThis(e)} className='mt-5'>
                    <Form.Group controlId="search">
                        <Form.Label className='colorWhite'>Search a product</Form.Label>
                        <Form.Control type="text" placeholder="Type product name here" value={search} 
                            onChange = { e => setSearch(e.target.value)} required/>
                    </Form.Group>
                    <Button type="submit" variant="warning" block>Search</Button>
                </Form>
                <div className='row'>
                {searchDisplay}
                </div>
            </div>
        </div>
        
    </>
  )
}

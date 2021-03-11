import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { Form, Card } from 'react-bootstrap'

export default function Home() {
    const [categoryName, setCategoryName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [products, setProducts] = useState("")

    useEffect(() => {
        let urlAll = 'https://magic-aliexpress1.p.rapidapi.com/api/v2/categories'
        let keyAll = 'c4db595d79mshdb043f2c97baa54p1f8995jsn444c2d1492f9'
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
                    return(
                        <option>{index.category_name}</option>
                    )
                   
                })
               setCategoryName(allCategories)
            })
    },[])

    useEffect(() => {
        console.log(selectedCategory)
        let urlAll = 'https://magic-aliexpress1.p.rapidapi.com/api/v2/categories'
        let keyAll = 'c4db595d79mshdb043f2c97baa54p1f8995jsn444c2d1492f9'
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
                            let urlAll = `https://magic-aliexpress1.p.rapidapi.com/api/category/${i.api_category_id}/products?shipFromCountry=&shipToCountry=&sort=&maxSalePrice=&minSalePrice=&keywords=`
                            let keyAll = 'c4db595d79mshdb043f2c97baa54p1f8995jsn444c2d1492f9'
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
                                    let allProducts = data.docs.map(i => {
                                        return(
                                            <div className='col-4'>
                                            <Card style={{ width: '18rem' }} className='my-3'>
                                            <Card.Img variant="top" src={i.product_main_image_url} />
                                            <Card.Body>
                                                <Card.Title>{i.product_title}</Card.Title>
                                                <Card.Text>
                                                    Price: {i.app_sale_price_currency} {i.app_sale_price}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <>
                                               <a href={i.product_detail_url} className='btn btn-secondary w-100 mb-2'>View Details</a>
                                               <a href='#' className='btn btn-secondary w-100'>Checkout</a>
                                               </>
                                            </Card.Footer>
                                            </Card>
                                            </div>
                                        )
                                    })
                                    setProducts(allProducts)
                                })
                        }
                    
                })

               
               
            })

    },[selectedCategory])
   
  return (
    <>
        <div className='container'>
        <h1 className='text-center mt-5'>Catalog</h1>
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
        
    </>
  )
}

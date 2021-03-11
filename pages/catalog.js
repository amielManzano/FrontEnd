import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'

export default function Home() {
    const [categoryName, setCategoryName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

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
                                })
                        }
                    
                })

               
               
            })

    },[selectedCategory])
   
  return (
    <>
        <h1 className='text-center mt-5'>Catalog</h1>
        <Form.Group controlId="categoryName">
            <Form.Label className='colorWhite'>Category name:</Form.Label>
            <Form.Control as="select"  value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)} required>
                        <option></option>
                        {categoryName}
            </Form.Control>
        </Form.Group>
    </>
  )
}

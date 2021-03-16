import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Jumbotron, Container, Card, Form, Button, Carousel} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [featured, setFeatured] = useState("")
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    let urlAll = 'https://magic-aliexpress1.p.rapidapi.com/api/bestSales/products?page=1&priceMax=20&priceMin=5&sort=EVALUATE_RATE_ASC&searchName=playstation'
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
          let allfeatured = data.docs.map(i => {

            //view specific product
            function viewSpecific(e){
              e.preventDefault()
              localStorage.setItem('viewThis', i.product_id)
              router.push('/product')
            }

            return(
             
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={i.product_main_image_url}
                    alt="First slide"
                  />
                  <Carousel.Caption className='glass'>
                    <h5 className='cBlack mx-5'>{i.product_title}</h5>
                    <p className='mx-5 cBlack'>Price: {i.app_sale_price_currency} {i.app_sale_price}</p>
                    <Form onSubmit = { e => viewSpecific(e)} className="">
                      <Button variant="warning" type="submit" className='w-100'>View</Button>
                    </Form>
                  </Carousel.Caption>
                </Carousel.Item>
              
            )
            
          })
          setFeatured(allfeatured)

        })
  },[])

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
        
      })
    })
  }

  return (
    <>
    <Jumbotron fluid className='bgJumbo text-center'>
        <div className='glass adjustJumbo'>
          <h1 className='text-center mt-5 mb-0 headingFont pt-5 font-weight-bold'>NEXSTORE</h1>
          <p className='text-center secondFont subHeading'>
            Online shopping app, for everyone, everywhere!
          </p>
          <a href='/catalog' className='btn btn-warning mb-5 w-30'>Open Shop</a>
        </div>
     
    </Jumbotron>
    <div className='container'>
      <div className='row'>
        <div className='col-5'>
          <h2 className='text-center firstFont my-5'>Best Sale</h2>
          <Carousel>
            {featured}
          </Carousel>
        </div>
        <div className='col-7'>
          <h2 className='text-center firstFont my-5'>Looking for?</h2>
          <Form onSubmit = { e => searchThis(e)} className=''>
            <Form.Group controlId="search">
                <Form.Label className='colorWhite'>Search a product</Form.Label>
                <Form.Control type="text" placeholder="Type product name here" value={search} 
                    onChange = { e => setSearch(e.target.value)} required/>
            </Form.Group>
            <Button type="submit" variant="warning" block>Search</Button>
            </Form>
        </div>
      </div>
    </div>
    
    </>
  )
}

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Jumbotron, Container, Card, Form, Button, Carousel} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [featured, setFeatured] = useState("")
  const [checkUser, setCheckUser] = useState("")

  const router = useRouter()

  useEffect(() => {
    setCheckUser(localStorage.getItem('userId'))
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
            if(checkUser != null){
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
            }else{
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
                  </Carousel.Caption>
                </Carousel.Item>
              
              )
            }
            
            
          })
          setFeatured(allfeatured)

        })
  },[])

  

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

    <div className='container mb-5'>
      <div className='row'>

          <div className='row mt-5'>
            <div className='col-md-4 mb-5'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src="https://www.kinexmedia.com/wp-content/uploads/2017/04/Search-bar.gif" style={{ height: '300px' }}/>
              <Card.Body>
                <Card.Title>Search</Card.Title>
                <Card.Text>
                  Look for your desired products. Everything you need are all present at Nexstore.
                </Card.Text>
              </Card.Body>
            </Card>
            </div>

            <div className='col-md-4 mb-5'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src="https://media.giphy.com/media/jtECu4KjK3cqiAUMyR/giphy.gif" style={{ height: '300px' }} />
              <Card.Body>
                <Card.Title>Add to cart</Card.Title>
                <Card.Text>
                  After finding your product, click add to cart then view your cart in the cart page.
                </Card.Text>
              </Card.Body>
            </Card>
            </div>


            <div className='col-md-4 mb-5'>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src="https://th.bing.com/th/id/Re04209f877cd25fe2fb933f6b06b2b3d?rik=MDP4h%2fbuGRy6oQ&riu=http%3a%2f%2fgreatist.com%2fsites%2fdefault%2ffiles%2fstyles%2farticle_main%2fpublic%2fEatMe_Save_on_Groceries_Illustration_Cart_sm_Compressed.gif%3fitok%3dKiFWZ2k9&ehk=cWidzEptZyQ6JLFHTJ8CI2b5rkx7DteIHVxyzF0zlVc%3d&risl=&pid=ImgRaw" style={{ height: '300px' }}/>
              <Card.Body>
                <Card.Title>Checkout</Card.Title>
                <Card.Text>
                  Checkout your product from the cart and wait for it to be delivered on your doorstep.
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
          </div>
        
        <div className='col-mb-5 col-sm-12 col-lg-5 mt-5'>
          <h2 className='text-center firstFont my-5 firstFont'>Best Selling Products</h2>
          <Carousel>
            {featured}
          </Carousel>
        </div>

        <div className='col-mb-7 col-lg-7 mt-5'>
          <h2 className='my-5 text-center firstFont'>What is NEXSTORE?</h2>
          <p className='secondFont p-3'>Nexstore is an e-commerce web application created by the engineers at seed tech lab, Nexseed. This e-commerce application was made in preparation for the engineer's training before starting to develop using Shopify.</p>
          <hr></hr>
          <p className='secondFont p-3'>This project was made by integrating a third party api from RapidApi wherein it will generate all the products present in the store of Ali express. Only products in the Ali express are present in the catalog of this website.</p>
          <hr></hr>
          <p className='secondFont p-3'>The techonologies used in this website includes the following. For the front end: NextJS, bootstrap, rapidApi, github and heroku. For the backend: Node/ExpressJS, mongoDB, github, heroku</p>
        </div>
        
      </div>
    </div>
    </>
  )
}

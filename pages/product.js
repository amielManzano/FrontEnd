import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { Image, Form, Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import swal from 'sweetalert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCartPlus, faComments, faBackward } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [product, setProduct] = useState("")
    const [allFeedback, setAllFeedback] = useState("")
    const [user, setUser] = useState('')

    const router = useRouter()

    useEffect(() => {
        setUser(localStorage.getItem('userId'))
        let keyAll = '9f094294ccmsh9ecb032fcfc6d57p10148fjsn1c0c75c47fce'
        let hostAll = 'magic-aliexpress1.p.rapidapi.com'
        let urlSpecific = `https://magic-aliexpress1.p.rapidapi.com/api/product/${localStorage.getItem('viewThis')}`
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

                //add to cart function
                function addToCart(e){
                    e.preventDefault()
                    console.log(data.product_id)
                    
                    let urlSpecific = `https://mighty-garden-47499.herokuapp.com/add-to-cart`
                    fetch(urlSpecific, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: localStorage.getItem('userId'),
                            productId: data.product_id,
                            product_title: data.product_title,
                            product_main_image_url: data.product_main_image_url,
                            app_sale_price: data.app_sale_price
                        })
                        })
                        .then(response => response.json())
                        .then(data => { 
                            console.log(data)
                            swal({
                                title: "Success!",
                                text: `You added a product to cart`,
                                icon: "success",
                                button: "continue",
                            });
                        })
                }


                setProduct(
                    <>
                        <h1 className='text-center my-5 firstFont'>{data.product_title}</h1>
                        <Image src={data.product_main_image_url} className='w-100'></Image>
                        <p className='text-right mt-3'>Price: {data.app_sale_price_currency} {data.app_sale_price}</p>
                        <span  className='btn btn-secondary w-100 mb-2' onClick={() => router.back()}>Back <FontAwesomeIcon icon={faBackward} /></span>
                        {
                            (user != null) ? <Form onSubmit = { e => addToCart(e)} className="">
                            <Button variant="warning" type="submit" className='w-100'>Add to cart <FontAwesomeIcon icon={faCartPlus} /></Button>
                            </Form>
                            :
                            <Form onSubmit = { e => addToCart(e)} className="">
                            <Button variant="warning" type="submit" className='w-100' disabled>Add to cart <FontAwesomeIcon icon={faCartPlus} /></Button>
                            </Form>
                        }
                        <Form onSubmit = { e => feedback(e)} className=" my-2">
                            <Button variant="danger" type="submit" className='w-100'>View Feedbacks <FontAwesomeIcon icon={faComments} /></Button>
                        </Form>
                        
                    </>
                )
            })
    },[user])

    //feedback
    function feedback(e){
        e.preventDefault()
        let keyAll = '9f094294ccmsh9ecb032fcfc6d57p10148fjsn1c0c75c47fce'
        let hostAll = 'magic-aliexpress1.p.rapidapi.com'
        let urlFeedback = `https://magic-aliexpress1.p.rapidapi.com/api/product/${localStorage.getItem('viewThis')}/feedbacks?page=1`
            fetch(urlFeedback, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": keyAll,
                    "x-rapidapi-host": hostAll
                }
                })
                .then(response => response.json())
                .then(data => { 
                    console.log(data)
                    let feedbacks = data.docs.map(i => {
                        let date = new Date(i.date);
                        let year = date.getFullYear();
                        let month = date.getMonth()+1;
                        let dt = date.getDate();

                        switch(month){
                            case 1: 
                                month='January' 
                                break
                            case 2:
                                month='February'
                                break
                            case 3: 
                                month='March' 
                                break
                            case 4:
                                month='April'
                                break
                            case 5: 
                                month='May' 
                                break
                            case 6:
                                month='June'
                                break
                            case 7: 
                                month='July' 
                                break
                            case 8:
                                month='August'
                                break
                            case 9: 
                                month='September' 
                                break
                            case 10:
                                month='October'
                                break
                            case 11: 
                                month='November' 
                                break
                            case 12:
                                month='December'
                                break
                        }

                        let finalDate = month+' '+dt+' '+year
                        console.log(finalDate)
                        return(
                            // <li>
                            //     <p>Name: {i.name}</p>
                            //     <p>Comment: {i.content}</p>
                            //     <p>Rating: {i.rating}</p>
                            //     <p>Date: {i.date}</p>

                            // </li>

                            <Card className='my-1'>
                            <Card.Header>{i.name}</Card.Header>
                            <Card.Body>
                            <Card.Title>{i.content}</Card.Title>
                            <Card.Text>
                               {finalDate}
                            </Card.Text>
                            </Card.Body>
                            </Card>
                        )
                    })
                    setAllFeedback(feedbacks)
                })
    }
   
  return (
    <>
        <div className='container'>
            {product}
            <div className='my-5'>
                <h2 className='firstFont text-center'>Feedbacks</h2>
                {allFeedback}
            </div>
        </div>
        
    </>
  )
}

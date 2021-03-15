import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import { Image } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function Home() {
    const [product, setProduct] = useState("")

    const router = useRouter()

    useEffect(() => {
        let keyAll = '5ca54c03b3msh8baf688928daeb6p1ca073jsn2c184cd3f98c'
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

                setProduct(
                    <>
                        <h1 className='text-center my-5'>{data.product_title}</h1>
                        <Image src={data.product_main_image_url} className='w-100'></Image>
                        <span  className='btn btn-secondary w-100 my-2' onClick={() => router.back()}>Back</span>
                    </>
                )
                
            })

    },[])
   
  return (
    <>
        <div className='container'>
            {product}
        </div>
        
    </>
  )
}

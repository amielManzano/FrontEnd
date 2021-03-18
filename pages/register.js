import React,{useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import swal from 'sweetalert'
import { Router } from 'next/router'
import { useRouter } from 'next/router'

export default function Home() {
    let [firstName, setFirstName]=useState("")
    let [lastName, setLastName]=useState("")
    let [password, setPassword]=useState("")
    let [verifyPassword, setVerifyPassword]=useState("")
    let [email, setEmail]=useState("")
    let [address,setAddress]=useState("")

    const router = useRouter()
    
    async function registerUser(e){
        e.preventDefault()
        console.log(`${firstName} ${lastName} ${password} ${email} ${address}`)

        fetch(`https://mighty-garden-47499.herokuapp.com/register`, {
            method: 'POST',
            headers:{
                'content-type': 'Application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
                address: address,
                loginType:'email'
            })
        })
		.then(result=>result.json())
		.then(data => {
			console.log(data)
            swal({
                title: "Success!",
                text: `You are now registered to NEXSTORE`,
                icon: "success",
                button: "continue",
            });
            router.push('/login')

		})

    }


  return (
    <>
    <Container>
    <Container>
    <div className='adjustLocation2 glass shadow-lg p-5'>
    <h2 className='text-center thirdFont mb-4 mt-4'>Register</h2>
    <Form onSubmit={e=>registerUser(e)}>
    <div className="row">
        <div className="col">
            <Form.Group controlId="">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="First Name" value = {firstName} onChange={e=>setFirstName(e.target.value)} />
            </Form.Group>
        </div>
        <div className="col">
        <Form.Group controlId="">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" placeholder="First Name" value = {lastName} onChange={e=>setLastName(e.target.value)}/>
        </Form.Group>
        </div>
    </div>

    <Form.Group controlId="">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email} onChange={e=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="">
        <Form.Label>Address:</Form.Label>
        <Form.Control type="text" placeholder="Present Address" value = {address} onChange={e=>setAddress(e.target.value)}/>
    </Form.Group>


    <div className="row">
        <div className="col">
            <Form.Group controlId="">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value = {password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
        </div>
        <div className="col">
            <Form.Group controlId="">
                <Form.Label>Verify Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value = {verifyPassword} onChange={e=>setVerifyPassword(e.target.value)}/>
            </Form.Group>
        </div>
    </div>


    <Button variant="danger" type="submit" block className='mb-5'>
        Submit
    </Button>
</Form>
</div>
</Container>
</Container>
</>
  )
}

import React, { useState, useContext, useEffect, useRef } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import swal from 'sweetalert'
// import Swal from 'sweetalert2';
//import UserContext from '../UserContext';
//  import View from '../components/View';
import AppHelper from '../Apphelper';


export default function index(){

	return(
		// <View title={ 'Login' }>
			<Row className="justify-content-center">
				<Col xs md="6">
					<LoginForm />
				</Col>
			</Row>
		// </View>
	)
}


const LoginForm = () => {

	
	//const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState('')
	

	useEffect(() => {
		setUser(localStorage.getItem('userId'))
		console.log(user)
	},[user])

	async function authenticate(e){

		e.preventDefault();

		console.log(email);
        console.log(password);

        let loginUrl=await fetch(`https://mighty-garden-47499.herokuapp.com/login`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                
                email: email,
                password: password
            })

        })

        //console.log(await loginUrl.json())
       let qwer=await loginUrl.json()

       localStorage.setItem('userId', qwer._id)
       localStorage.setItem('isAdmin', qwer.isAdmin)

	   setUser(googleUser._id)
		// windows.replace.location('/catalog')
		
	
			console.log(user)
			// swal({
			// 	title: "Success!",
			// 	text: `You added a product to cart`,
			// 	icon: "success",
			// 	button: "continue",
			// });
			window.location.replace('/')
			// Router.push('/')

	}

	const authenticateGoogleToken = async (response) => {
	        
        console.log(response.tokenId)

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tokenId: response.tokenId })
        }

          let googleLoginUrl = await fetch('https://mighty-garden-47499.herokuapp.com/google-log-in',options)
		 // console.log(await googleLoginUrl.json())
		  let googleUser = await googleLoginUrl.json()

		  localStorage.setItem('userId',googleUser._id)
		  setUser(googleUser._id)
		  localStorage.setItem('isAdmin',googleUser.isAdmin)

		 console.log(user)
		
		//  swal({
		// 	title: "Success!",
		// 	text: `You added a product to cart`,
		// 	icon: "success",
		// 	button: "continue",
		// });
		 window.location.replace('/');
		// Router.push('/')
    };

	return(
	
		<React.Fragment>
			<Head>
				<title>Authentication</title>
			</Head>
			<Container>
				<div className='adjustLocation glass p-4 shadow-lg'>
			    <h3 className='text-center firstFont'>Login</h3>
				<Form onSubmit={e => authenticate(e)}>

					<Form.Group controlId="email">
						<Form.Label>Email:</Form.Label>
						<Form.Control type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required/>
					</Form.Group>

					<Form.Group controlId="password">
		                <Form.Label>Password:</Form.Label>
		                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
		            </Form.Group>

		            <Button variant="danger" type="submit" block>Login</Button>

		            <GoogleLogin 
		            	clientId="572311522502-le83vksl2pnmp7k6rjkkeht3e7qgjbsf.apps.googleusercontent.com"
		            	buttonText="Login"
		            	onSuccess={ authenticateGoogleToken }
		            	onFailure={ authenticateGoogleToken }
		            	cookiePolicy={ 'single_host_origin' }
		            	className="w-100 text-center d-flex justify-content-center"
		            />
		            <p>No Account yet?<a href="/register"> Create an account</a></p>

				</Form>
				</div>
			</Container>
		</React.Fragment>
	)
}
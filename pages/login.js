import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
// import Swal from 'sweetalert2';
//import UserContext from '../UserContext';
//  import View from '../components/View';
import AppHelper from '../Apphelper';


export default function index(){

	return(
		// <View title={ 'Login' }>
			<Row className="justify-content-center">
				<Col xs md="6">
					<h3>Login</h3>
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

	async function authenticate(e){

		e.preventDefault();

		console.log(email);
        console.log(password);

        let loginUrl=await fetch(`http://localhost:3000/login`,{
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


		


	}

	const authenticateGoogleToken = (response) => {
	        
        console.log(response.tokenId)

      
    };



	// const retrieveUserDetails = (accessToken) => {

	// 	const options = {
	// 		headers: { Authorization: `Bearer ${ accessToken }` }
	// 	}

	// 	fetch(`${ AppHelper.API_URL }/users/details`, options)
	// 	.then(AppHelper.toJSON)
	// 	.then(data => {

	// 		console.log(data)

	// 		setUser({ id: data._id, isAdmin: data.isAdmin });
	// 		Router.push('/expense-tracker');

	// 	})

	// }

	return(
	
		<React.Fragment>
			<Head>
				<title>Authentication</title>
			</Head>
			<Container>
				<Form onSubmit={e => authenticate(e)}>

					<Form.Group controlId="email">
						<Form.Label>Email:</Form.Label>
						<Form.Control type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required/>
					</Form.Group>

					<Form.Group controlId="password">
		                <Form.Label>Password:</Form.Label>
		                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
		            </Form.Group>

		            <Button variant="primary" type="submit" block>Submit</Button>

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
			</Container>
		</React.Fragment>
	)
}

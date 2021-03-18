import React, {useEffect, useState} from 'react'
import {Card, Table, Image, Container, Button, Form} from 'react-bootstrap'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function userProfile(){
	

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [address, setAddress] = useState('')

    const [info, setInfo] = useState('')
	
	useEffect(() => {
	// 	let userDetailUrl= fetch('https://mighty-garden-47499.herokuapp.com/user-details', {
	// 		method: 'POST',
	// 		headers: { 'CONTENT-TYPE': 'APPLICATION/JSON'},
	// 		body: JSON.stringify({
	// 			userId: localStorage.getItem('userId')
	// 		})
	// 	})
		
    // let userDetails=await userDetailUrl.json()

    fetch('https://mighty-garden-47499.herokuapp.com/user-details', {
        method: "POST",
        headers: { 'CONTENT-TYPE': 'APPLICATION/JSON'},
			body: JSON.stringify({
				userId: localStorage.getItem('userId')
			})
        })
        .then(response => response.json())
        .then(data => { 
            setInfo(data)
            setfirstName(data.firstName),
            setlastName(data.lastName),
            setAddress(data.address)
        })

    // console.log(info)
	}, [])

    function updateProfile(e){
        e.preventDefault()
        console.log(`${firstName} ${lastName} ${address}`)

        fetch('https://mighty-garden-47499.herokuapp.com/update-profile', {
        method: "POST",
        headers: { 'CONTENT-TYPE': 'APPLICATION/JSON'},
			body: JSON.stringify({
                userId: localStorage.getItem('userId'),
				firstName: firstName,
                lastName: lastName,
                address: address
			})
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            swal({
				title: "Success!",
				text: `You updated your profile`,
				icon: "success",
				button: "continue",
			});
        })
    }
	
	return(
		<>
            <Container>
            <Container>
            <div className='glass p-5 adjustLocation2 shadow-lg'>
			<h1 className='text-center my-4 thirdFont'>Profile</h1>
            <Form onSubmit = { e => updateProfile(e)} className="mb-5">
                <Form.Group controlId="firstName">
                    First Name:
                    <Form.Control type="text" placeholder={firstName} value={firstName} onChange={e => setfirstName(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="lastName">
                    Last Name:
                    <Form.Control type="text" placeholder={lastName} value={lastName} onChange={e => setlastName(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="address">
                    Address: (house no, brgy, city)
                    <Form.Control type="text" placeholder={address} value={address} onChange={e => setAddress(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="address">
                    Email:
                    <Form.Control type="text" placeholder={info.email} disabled/>
                </Form.Group>
                <Button variant="danger" type="submit" className='w-100'>Update</Button>
            </Form>
            </div>
            </Container>
            </Container>
        
		</>
	)
}
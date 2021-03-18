import React, {useEffect, useState} from 'react'
import {Card, Table, Image, Container, Button} from 'react-bootstrap'
import swal from 'sweetalert'

export default function userProfile(){
	
	const [purchase, setPurchase]= useState("")
	const [user, setUser]=useState("")
	const [order, setOrder]=useState("")
	const [change, setChange] = useState(true)

	useEffect(async function(){
		
		let userDetailUrl= await fetch('https://mighty-garden-47499.herokuapp.com/user-details', {
			method: 'POST',
			headers: { 'CONTENT-TYPE': 'APPLICATION/JSON'},
			body: JSON.stringify({
				userId: localStorage.getItem('userId')
			})
		})
		
		let userDetails=await userDetailUrl.json()
		
		/* IDENTIFY IF THE USER CURRENTLY LOGGED IN IS AN ADMIN OR NOT */
		let userIdentifier=localStorage.getItem('isAdmin')
		
		let productsPurchased = userDetails.purchasedProduct.map(items=> {

			async function receivedProduct(e){
				e.preventDefault()
				 let prodReceivedLinkUrl = await fetch('https://mighty-garden-47499.herokuapp.com/product-received',{
					 method: 'POST',
					 headers:{'Content-type': 'Application/JSON'},
					 body: JSON.stringify({
						 orderId:items._id,
						 userId: localStorage.getItem('userId'),
						 productId: items.productId,
						 product_title: items.product_title,
						 product_main_image_url: items.product_main_image_url,
						 app_sale_price: items.app_sale_price
					 })
				 })
			setChange(!change)
			console.log(await prodReceivedLinkUrl.text())
			swal({
				title: "Success!",
				text: `You received the product`,
				icon: "success",
				button: "continue",
			});
			}

			return(
				<tr key={items.productId}>
					<td className='text-center'>{items.product_title}</td>
					<td className='text-center'>{items.app_sale_price}</td>
					<td className='text-center'> <Image src={items.product_main_image_url} thumbnail style={{height: '40px'}, {width: '40px'}}/></td>
					
					<td className='text-center'>
						{
							items.status === 'PENDING' 
							?
							<Button  variant='danger' block type="submit" onClick={e=>{receivedProduct(e)}}>Receive</Button>
							:
							<Button  variant='secondary' type="submit" block onClick={e=>{receivedProduct(e)}} disabled>Received</Button>
						}
						
					</td>
				</tr>
			)
		})
		
		setPurchase(productsPurchased)	
		setUser(userIdentifier)
		
		
	}, [change])
	
	
	useEffect(async function(){
		let getAllOrder=await fetch('https://mighty-garden-47499.herokuapp.com/get-all-orders')
		let allOrders=await getAllOrder.json()
		
		let ordersBoughtByBuyers=allOrders.map(items=>{
			// console.log(items)
			return(
				<tr key={items.productId}>
					<td className='text-center'>{items.product_title}</td>
					<td className='text-center'>{items.app_sale_price}</td>
					<td className='text-center'> <Image src={items.product_main_image_url} thumbnail style={{height: '40px'}, {width: '40px'}}/></td>
					{/* {
						items.status == 'PENDING' ? */}

						{/* <button type="submit" onClick={e=>{receivedProduct(e)}}>Received</button> */}

					{/* } */}
					<td className='text-center'>{items.status}</td>
				</tr>
			)
		})
		
		setOrder(ordersBoughtByBuyers)
	}, [])
	
	return(
		<>
			<Container>
				<h2 className='text-center thirdFont mt-5 mb-3'>Transactions</h2>
				{user == 'true' 
				? 
					<Table striped bordered hover>
					<thead>
						<tr>
							<th className='text-center'>PRODUCT</th>
							<th className='text-center'>PRICE (USD)</th>
							<th className='text-center'>IMAGE</th>
							<th className='text-center'>STATUS</th>
						</tr>
					</thead>
					<tbody>
						{order}
					</tbody>
					</Table>
				: 
					<Table striped bordered hover>
						<thead>
							<tr>
								<th className='text-center'>PRODUCT</th>
								<th className='text-center'>PRICE (USD)</th>
								<th className='text-center'>IMAGE</th>
								<th className='text-center'>STATUS</th>
							</tr>
						</thead>
						<tbody>
							{purchase}
						</tbody>
					</Table>
				}
				
			</Container>
			
		</>
	)
}
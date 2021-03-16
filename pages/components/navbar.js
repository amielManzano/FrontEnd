import { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'



export default function navHome() {
  const [user, setUser] = useState("")

  const [active, setActive] = useState("")
 

  useEffect(()=>{

    let refId=localStorage.getItem('userId')
    // console.log(typeof refId)
    console.log(refId)
    setUser(refId)
    if(localStorage.getItem('userId') != null){
     let urlssssss= 
            <>
                <Nav.Link href="../catalog">Catalog</Nav.Link>
                <Nav.Link href="../cart">Cart</Nav.Link>
                <Nav.Link href="../logout">Logout</Nav.Link>
                <Nav.Link href ="../sample">Sample</Nav.Link>
                <Nav.Link href ="../librengpage">Libre</Nav.Link>
            </>
          

          setActive(urlssssss)
      
    }else{
      let urlssssss=
        <>
            <Nav.Link href="../register">Register</Nav.Link>
              <Nav.Link href="../login">Login</Nav.Link>
        </>
      
      setActive(urlssssss)
    }

  
    
    
  },[user])
 return (
    <>

   
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="../">NexStore</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {
          active
        }
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    
    </>
  )
}

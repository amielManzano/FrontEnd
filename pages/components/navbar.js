import { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'



export default function navHome() {
  const [user, setUser] = useState("")

  const [active, setActive] = useState("")
 

   useEffect(() => {
    setUser(localStorage.getItem('userId'))
  },[])

  useEffect(()=>{
    if(localStorage.getItem('userId') != null){
     let urlssssss= 
            <>
                <Nav.Link href="../catalog" className='secondFont'>Catalog</Nav.Link>
                <Nav.Link href="../cart" className='secondFont'>Cart</Nav.Link>
                <Nav.Link href="../logout" className='secondFont'>Logout</Nav.Link>
                <Nav.Link href ="../sample" className='secondFont'>Sample</Nav.Link>
                <Nav.Link href ="../librengpage" className='secondFont'>Libre</Nav.Link>
            </>
          

          setActive(urlssssss)
      
    }else{
      let urlssssss=
        <>
            <Nav.Link href="../register" className='secondFont'>Register</Nav.Link>
              <Nav.Link href="../login" className='secondFont'>Login</Nav.Link>
        </>
      
      setActive(urlssssss)
    }
  },[user])

 
 return (
    <>

   
    <Navbar className='bgColor' expand="lg">
    <Navbar.Brand href="../" className='firstFont'>NexStore</Navbar.Brand>
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
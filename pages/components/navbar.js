import { Navbar, Nav } from 'react-bootstrap'

export default function Home() {
  return (
    <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="../">NexStore</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="../catalog">Catalog</Nav.Link>
        <Nav.Link href="../cart">Cart</Nav.Link>
        <Nav.Link href="../login">Login</Nav.Link>
      <Nav.Link href="../register">Register</Nav.Link>
      <Nav.Link href="../logout">Logout</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    </>
  )
}

import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
const LayoutComponent = ({ children }: { children: JSX.Element }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  let links = [
    {
      url: "notas",
      text: "Notas",
    },
  ];

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    return navigate("/", { replace: true });
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Sistema Gestion Academica</Navbar.Brand>
          <Nav className="me-auto">
            {links.map((item) => (
              <LinkContainer to={`/Docente/${item.url}`}>
                <Nav.Link>{item.text}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
export default LayoutComponent;

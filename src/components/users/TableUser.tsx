import { Table, Button, Stack } from "react-bootstrap";
import { UserEntity } from "../../types/types";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import styled from "styled-components";
interface Props {
  loading: Boolean;
  users: UserEntity[];
  deleteUser: (username: string) => void;
}
const TableUser = ({ loading, users, deleteUser }: Props) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Username</th>
          <th>Password</th>
          <th>Perfil</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* !!false !false => true !!false =>  false !!true => true  */}
        {!loading ? (
          users.map((item, key) => (
            <tr>
              <td>{key}</td>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.username}</td>
              <td>****</td>
              <td>
                <Image
                  url={item.img_url}
                  // className="img-thumbnail rounded-circle"
                />
              </td>
              <td>
                <Stack direction="horizontal" gap={2} className="">
                  <Button
                    className="mr-2"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUser(item.username)}
                  >
                    <HiOutlineTrash size="18px" />
                  </Button>
                  <Button variant="success" size="sm">
                    <HiOutlinePencil />
                  </Button>
                </Stack>
              </td>
            </tr>
          ))
        ) : (
          <h2>loading...</h2>
        )}
      </tbody>
    </Table>
  );
};
const Image = styled.div`
  ${({ url }) => (url ? `background-image: url(${url})` : null)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export default TableUser;

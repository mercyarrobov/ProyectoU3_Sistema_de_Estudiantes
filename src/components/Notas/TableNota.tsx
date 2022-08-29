import { Table, Stack, Button } from "react-bootstrap";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { NotasResponseServer, NotasEntity } from "../../types/types";
import { Badge } from "react-bootstrap";
interface Props {
  notas: NotasEntity[];
  loading: Boolean;
  handleClickDelete: (id: string) => void;
}
const TableNotasComponent = ({ notas, loading, handleClickDelete }: Props) => {
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ciclo Academico</th>
            <th>N. inicial</th>
            <th>N.final</th>
            <th>Paralelo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* !!false !false => true !!false =>  false !!true => true  */}
          {!loading ? (
            notas.map((item, key) => (
              <tr>
                <td>{key}</td>

                <td>
                  <div style={{ width: "150px" }} className="text-truncate">
                    {item.id_ciclo}
                  </div>
                </td>
                <td>{item.nota_inicial}</td>
                <td>{item.nota_final}</td>
                <td>{item.paralelo}</td>
                <td>
                  <Badge bg={item.estado ? "primary" : "secondary"}>
                    {item.estado ? "Active" : "Desactive"}
                  </Badge>
                </td>
                <td>
                  <Stack direction="horizontal" gap={2} className="">
                    <Button
                      className="mr-2"
                      variant="danger"
                      size="sm"
                      onClick={() => handleClickDelete(item._id.$oid)}
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
    </>
  );
};

export default TableNotasComponent;

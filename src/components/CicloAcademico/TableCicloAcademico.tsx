import { Table, Stack, Button } from "react-bootstrap";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { CliclosAcademicosEntity } from "../../types/types";
import { Badge } from "react-bootstrap";
interface Props {
  ciclosAcademicos: CliclosAcademicosEntity[];
  loading: Boolean;
  ChangeState: (id: string) => void;
}
const TableCicloAcademicoComponent = ({
  ciclosAcademicos,
  loading,
  ChangeState,
}: Props) => {
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Orden</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* !!false !false => true !!false =>  false !!true => true  */}
          {!loading ? (
            ciclosAcademicos.map((item, key) => (
              <tr>
                <td>{key}</td>
                <td>
                  <div
                    className="text-truncate"
                    title={item.descripcion}
                    style={{ width: "200px" }}
                  >
                    {item.descripcion}
                  </div>
                </td>

                <td>{item.orden}</td>

                <td>
                  <Badge
                    className="d-block mt-1"
                    pill
                    bg={item?.estado ? "primary" : "secondary"}
                  >
                    {item?.estado ? "Active" : "Desactive"}
                  </Badge>
                </td>
                <td>
                  <Stack direction="horizontal" gap={2} className="">
                    <Button className="mr-2" variant="danger" size="sm">
                      <HiOutlineTrash size="18px" />
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => ChangeState(item._id.$oid)}
                    >
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

export default TableCicloAcademicoComponent;

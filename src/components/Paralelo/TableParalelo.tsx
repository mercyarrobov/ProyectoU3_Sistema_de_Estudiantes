import { Table, Stack, Button } from "react-bootstrap";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { MateriaEntity, ParalelosEntity } from "../../types/types";
import { Badge } from "react-bootstrap";
interface Props {
  paralelos: ParalelosEntity[];
  loading: Boolean;
  handleClickDelete: (id: string) => void;
}
const TableMateriaComponent = ({
  paralelos,
  loading,
  handleClickDelete,
}: Props) => {
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ciclo Academico</th>
            <th>Materia</th>
            <th>Docente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* !!false !false => true !!false =>  false !!true => true  */}
          {!loading ? (
            paralelos.map((item, key) => (
              <tr>
                <td>{key}</td>

                <td>
                  {" "}
                  <div style={{ width: "200px" }} className="text-truncate">
                    {item.descripcion_ciclo}
                  </div>
                </td>
                <td>{item.descripcion_materia}</td>
                <td>{item.nombre_docente}</td>
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

export default TableMateriaComponent;

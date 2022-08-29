import { Table, Stack, Button } from "react-bootstrap";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { MateriaEntity, MateriaResponseServer } from "../../types/types";
import { Badge } from "react-bootstrap";
interface Props {
  materias: MateriaResponseServer[];
  loading: Boolean;
}
const TableMateriaComponent = ({ materias, loading }: Props) => {
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Hora Inicio</th>
            <th>Hora Final</th>
            <th>Dias</th>
            <th>Aula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* !!false !false => true !!false =>  false !!true => true  */}
          {!loading ? (
            materias.map((item, key) => (
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
                <td>{item.hora_inicio}</td>
                <td>{item.hora_final}</td>
                <td>
                  {item.dias.map((dias) => (
                    <Stack gap={3}>
                      <Badge className="d-block mt-1" pill bg="primary">
                        {dias}
                      </Badge>
                    </Stack>
                  ))}
                </td>
                <td>{item.aula}</td>
                <td>
                  <Stack direction="horizontal" gap={2} className="">
                    <Button className="mr-2" variant="danger" size="sm">
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

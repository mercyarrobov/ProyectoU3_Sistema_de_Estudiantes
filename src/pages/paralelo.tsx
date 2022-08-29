import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CreateParalelo from "../components/Paralelo/CreateParalelo";
import TableParalelo from "../components/Paralelo/TableParalelo";

//Redux
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";
import { GetUsers } from "../features/usuarios";
import { GetCiclosAcademicos } from "../features/ciclo_academico";
import { GetUsersDocentes } from "../features/Docentes";
import { GetMaterias } from "../features/materia";
import { GetParalelos } from "../features/Paralelo";
import { deleteAssignParalelo } from "../api/users";

export default function Paralelo() {
  const dispatch = useAppDispatch();
  const { loading, error, users } = useAppSelector(
    (state) => state.userStudent
  );
  const { ciclosAcademicos } = useAppSelector((state) => state.cicloAcademico);
  const cicloAcademicoLoading = useAppSelector(
    (state) => state.cicloAcademico.loading
  );
  //Docente

  const usersDocentes = useAppSelector((state) => state.usersDocentes.users);

  //Materia
  const materias = useAppSelector((state) => state.materias.materias);

  const paralelos = useAppSelector((state) => state.paralelos.paralelos);

  useEffect(() => {
    dispatch(GetUsers());
    dispatch(GetCiclosAcademicos());
    dispatch(GetUsersDocentes());
    dispatch(GetMaterias());
    dispatch(GetParalelos());
  }, [dispatch]);

  const handleClickDelete = async (id: string) => {
    console.log("### TEXT");
    let response = await deleteAssignParalelo(id);
    console.log(response);
  };

  return (
    <>
      <h2>Paralelo</h2>
      <Row>
        <Col sx={3}>
          <CreateParalelo
            users={users}
            loading={loading}
            cicloAcademico={
              ciclosAcademicos?.filter((i) => i.estado == true)[0]
            }
            cicloAcademicoLoading={cicloAcademicoLoading}
            userDocentes={usersDocentes}
            materias={materias}
          />
        </Col>
        <Col>
          {" "}
          <TableParalelo
            paralelos={paralelos}
            handleClickDelete={handleClickDelete}
          />
        </Col>
      </Row>
    </>
  );
}

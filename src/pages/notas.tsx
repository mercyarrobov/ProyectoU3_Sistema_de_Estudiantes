import React, { useEffect } from "react";
import CreateNota from "../components/Notas/CreateNota";
import { GetCiclosAcademicos } from "../features/ciclo_academico";
import { GetNotasAdmin } from "../features/notasAdmin";
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";
import { Row, Col } from "react-bootstrap";
import TableNotes from "../components/Notas/TableNota";

export default function Notas() {
  const dispatch = useAppDispatch();
  const { ciclosAcademicos, loading } = useAppSelector(
    (state) => state.cicloAcademico
  );

  const loadingNotes = useAppSelector((state) => state.notasAdmin.loading);
  const notasAdmin = useAppSelector((state) => state.notasAdmin.notas);

  useEffect(() => {
    dispatch(GetCiclosAcademicos());
    dispatch(GetNotasAdmin());
    return () => {};
  }, []);

  const handleClickDelete = (id: string) => {};

  return (
    <>
      <h2>Notas</h2>
      <Row>
        <Col>
          <CreateNota
            cicloAcademico={
              ciclosAcademicos?.filter((e) => e.estado == true)[0]
            }
            cicloAcademicoLoading={loading}
          />
        </Col>
        <Col>
          <TableNotes
            notas={notasAdmin}
            loading={loadingNotes}
            handleClickDelete={handleClickDelete}
          />
        </Col>
      </Row>
    </>
  );
}

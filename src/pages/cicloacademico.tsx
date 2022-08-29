import React, { useEffect } from "react";
import CicloAcademicoForm from "../components/CicloAcademico/FormCicloAcademico";
import TableCicloAcademicoComponent from "../components/CicloAcademico/TableCicloAcademico";
import { Container, Row, Col } from "react-bootstrap";
import { GetCiclosAcademicos } from "../features/ciclo_academico";
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";

export default function CicloAcademico() {
  const dispatch = useAppDispatch();
  const { loading, error, ciclosAcademicos } = useAppSelector(
    (state) => state.cicloAcademico
  );
  useEffect(() => {
    dispatch(GetCiclosAcademicos());
    return () => {};
  }, [dispatch]);

  const ChangeState = async (id: string) => {
    let URI = "http://localhost:5000/api";
    let response = await fetch(`${URI}/updateEstadoClicloAcademico/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    console.log(data);
  };

  return (
    <>
      <h2>Ciclo Academico </h2>
      <Container>
        <Row>
          <Col md={"5"}>
            <CicloAcademicoForm />
          </Col>
          <Col>
            <TableCicloAcademicoComponent
              ciclosAcademicos={ciclosAcademicos}
              loading={loading}
              ChangeState={ChangeState}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

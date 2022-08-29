import React, { useEffect } from "react";
import FormMateria from "../components/Materia/CrateMateria";
import TableMateria from "../components/Materia/TableMateria";
import { Col, Row } from "react-bootstrap";
import { GetMaterias } from "../features/materia";
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";

export default function Materia() {
  const dispatch = useAppDispatch();
  const materias = useAppSelector((state) => state.materias.materias);
  const loading = useAppSelector((state) => state.materias.loading);

  useEffect(() => {
    dispatch(GetMaterias());
    return () => {};
  }, [dispatch]);

  return (
    <>
      <h2>Materia</h2>
      <Row>
        <Col sm={5}>
          <FormMateria />
        </Col>
        <Col>
          <TableMateria materias={materias} loading={loading} />
        </Col>
      </Row>
    </>
  );
}

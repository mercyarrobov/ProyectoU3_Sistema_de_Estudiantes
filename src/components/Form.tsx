import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  username: string;
  password: string;
};

interface PropsForm {
  submitData: (value: FormValues) => void;
  error?: boolean;
  message?: string;
}

function BasicExample({ submitData, error, message }: PropsForm) {
  const schema = yup.object().shape({
    username: yup.string().required("Field required"),
    password: yup.string().min(8).max(32).required("Field required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched", resolver: yupResolver(schema) });
  return (
    <>
      {error && (
        <p className="bg-danger opacity-4 text-light p-2 rounded bg-opacity-75">
          {message}
        </p>
      )}
      <Form onSubmit={handleSubmit(submitData)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username")}
            type="text"
            placeholder="Enter username"
          />
          <Form.Text className="text-danger">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary " type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default BasicExample;

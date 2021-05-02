import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { POST_POST_URL, IMAGES_KEY_NAME } from '../utils/constants';
import '../assets/styles/Publishes.css';

const cookies = new Cookies();

const Publishes = (props) => {
  const userId = cookies.get('userId');

  if (!userId) {
    props.history.push('/login');
  }

  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    for (const key in data) {
      if (key !== IMAGES_KEY_NAME) {
        formData.append(key, data[key]);
      } else {
        for (const img of data[key]) {
          formData.append(key, img);
        }
      }
    }

    formData.append('authorId', userId);

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    const options = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    let response;
    try {
      response = await axios.post(POST_POST_URL, formData, options);
      if (response.status === 201) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Creación Correcta',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Error creando la publicación',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(response);
  };

  return (
    <Container className="publishes py-5">
      <h2>Publicar Mi Servicio</h2>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue={''}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  {...field}
                  type="text"
                  placeholder="Título del servicio a publicar"
                />
              )}
            />
            <Form.Row className="my-2">
              <Col>
                <Controller
                  name="price"
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      type="number"
                      placeholder="Precio del servicio"
                    />
                  )}
                />
              </Col>
              <Col>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      type="number"
                      placeholder="Teléfono"
                    />
                  )}
                />
              </Col>
            </Form.Row>

            <Form.Row className="my-2">
              <Col>
                <p className="text-white font-weight-bold">Locación</p>
                <Controller
                  name="location"
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control {...field} as="select">
                      <option>Bogotá</option>
                      <option>Cali</option>
                      <option>Medellín</option>
                    </Form.Control>
                  )}
                />
              </Col>
              <Col>
                <p className="text-white font-weight-bold">Categoría</p>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control {...field} as="select">
                      <option>Informatica</option>
                      <option>Electricidad</option>
                      <option>Hogar</option>
                      <option>Otro</option>
                    </Form.Control>
                  )}
                />
              </Col>
            </Form.Row>
            <Form.Row className="my-2">
              <Col>
                <Controller
                  name="desc"
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      as="textarea"
                      rows={4}
                      placeholder="Descripción"
                    />
                  )}
                />
              </Col>
            </Form.Row>

            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="images_selector"
                multiple
                accept=".png, .jpg, .jpeg, .gif"
                {...register(IMAGES_KEY_NAME, { required: true })}
              />
              <label className="custom-file-label" htmlFor="images_selector">
                Elige Imagenes (max cant. 4 tamaño 8mb)
              </label>
            </div>

            <Button variant="primary" className="my-2" type="submit">
              Publicar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Publishes;

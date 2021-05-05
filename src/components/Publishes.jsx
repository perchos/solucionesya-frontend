import React, { useState } from 'react';
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
import Loader from 'react-loader-spinner';
import IsLogin from './IsLogin';
import { POST_POST_URL, IMAGES_KEY_NAME } from '../utils/constants';
import '../assets/styles/Publishes.css';
import Logo from '../assets/img/consejo.svg';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

const IMAGE_NUM_LIMIT = 4;
const IMAGE_TOTAL_SIZE_LIMIT = 8000000;

const Publishes = (props) => {
  const userId = cookies.get('userId');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImagesData, setLoadedImagesData] = useState({
    numFiles: 0,
    totalSize: 0,
    disabled: false,
  });

  if (!userId) {
    props.history.push('/login');
  }

  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    // setIsLoading(true);
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
        await Swal.fire({
          icon: 'success',
          title: 'Creación Correcta',
          showConfirmButton: false,
          timer: 1500,
        });
        props.history.goBack();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        cookies.remove('userId', { path: '/' });
        props.history.push('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error creando la publicación',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to={`/`}>
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
            alt=""
          />
          Soluciones YA!
        </Link>
        {userId && <IsLogin notHome={true} />}
      </nav>
      <Container className="publishes my-5 p-5 bg-white border rounded shadow-lg">
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#1DCDA0"
            height={100}
            width={100}
            className="text-center"
          />
        )}

        {!isLoading && (
          <>
            <div className="text-right">
              <Button
                variant="secondary"
                onClick={() => props.history.goBack()}
              >
                Regresar
              </Button>
            </div>
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
                      <p className="mt-2 font-weight-bold">Locación</p>
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
                      <p className="mt-2 font-weight-bold">Categoría</p>
                      <Controller
                        name="category"
                        control={control}
                        defaultValue={''}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Control {...field} as="select">
                            <option>Informática</option>
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

                  <div className="custom-file mt-2">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="images_selector"
                      multiple
                      accept=".png, .jpg, .jpeg, .gif"
                      {...register(IMAGES_KEY_NAME, { required: true })}
                      onChange={(value) => {
                        const files = value.target.files;
                        const numFiles = files.length;
                        let totalSize = 0;
                        for (let file of files) {
                          totalSize += file.size;
                        }

                        let disabled = true;

                        const validateLimits =
                          numFiles <= IMAGE_NUM_LIMIT &&
                          totalSize < IMAGE_TOTAL_SIZE_LIMIT;

                        if (validateLimits) disabled = false;

                        setLoadedImagesData({ numFiles, totalSize, disabled });
                      }}
                    />
                    <label
                      className="custom-file-label "
                      htmlFor="images_selector"
                    >
                      Imagenes (máx número 4, máx tamaño 8mb)
                    </label>

                    <div className="mt-1">
                      <p className="my-2">
                        ◾{' '}
                        {loadedImagesData.numFiles === 0
                          ? 'No hay'
                          : loadedImagesData.numFiles}{' '}
                        {loadedImagesData.numFiles === 1
                          ? 'imagen'
                          : 'imagenes'}{' '}
                        cargada{loadedImagesData.numFiles === 1 ? '' : 's'}
                      </p>
                      {loadedImagesData.numFiles > IMAGE_NUM_LIMIT && (
                        <p className="my-2">🛑 Superado # límite de imagenes</p>
                      )}
                      {!(
                        loadedImagesData.totalSize < IMAGE_TOTAL_SIZE_LIMIT
                      ) && <p className="my-2">⛔ Superado límite de tamaño</p>}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="my-3"
                    type="submit"
                    disabled={loadedImagesData.disabled}
                  >
                    Publicar
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Publishes;

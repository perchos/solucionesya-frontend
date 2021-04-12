import React from 'react';
import { Container, Row, Col, Form, CardGroup, Card } from 'react-bootstrap';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Form>
          <Form.Row className='align-items-center'>
            <Col xs='auto' className='my-1'>
              <Form.Label className='mr-sm-2' htmlFor='firstFilter' srOnly>
                Preference
              </Form.Label>
              <Form.Control
                as='select'
                className='mr-sm-2'
                id='firstFilter'
                custom
              >
                <option value='0'>Filtrar...</option>
                <option value='1'>Menor Precio</option>
                <option value='2'>Mayor Precio</option>
                <option value='3'>Mejor Calificación</option>
              </Form.Control>
            </Col>
            <Col xs='auto' className='my-1'>
              <Form.Label className='mr-sm-2' htmlFor='secondFilter' srOnly>
                Preference
              </Form.Label>
              <Form.Control
                as='select'
                className='mr-sm-2'
                id='secondFilter'
                custom
              >
                <option value='0'>Ubicación...</option>
                <option value='1'>Ciudad</option>
                <option value='2'>Localidad</option>
                <option value='3'>Más cercano</option>
              </Form.Control>
            </Col>
            <Col xs='auto' className='my-1'>
              <Form.Control type='search' placeholder='Buscar servicios' />
            </Col>
          </Form.Row>
        </Form>
      </Row>
      <Row className='justify-content-center'>
        <CardGroup>
          <Card style={{ width: '18rem' }}>
            <Card.Header>
              <Card.Title>Servicio 1</Card.Title>
            </Card.Header>
            <Card.Img
              variant='top'
              src='https://dummyimage.com/600x400/000/fff'
            />
            <Card.Body>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quidem quos eaque sed aperiam ipsum cupiditate odio
                deserunt in perspiciatis labore earum dolor rerum expedita amet
                dolorum, accusamus inventore. Doloribus.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Header>
              <Card.Title>Servicio 2</Card.Title>
            </Card.Header>
            <Card.Img
              variant='top'
              src='https://dummyimage.com/600x400/000/fff'
            />
            <Card.Body>
              <Card.Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                magnam dolor recusandae itaque voluptas, accusamus natus
                quibusdam sapiente incidunt distinctio aperiam quia illo fuga
                totam vero cum quod suscipit perspiciatis.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Header>
              <Card.Title>Servicio 3</Card.Title>
            </Card.Header>
            <Card.Img
              variant='top'
              src='https://dummyimage.com/600x400/000/fff'
            />
            <Card.Body>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus rem deserunt dolore, doloribus alias ipsum quisquam
                officiis minus, in laborum fugit libero iste? Consequatur
                tempore voluptate reiciendis fugiat ea voluptas.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </Container>
  );
};

export default Home;

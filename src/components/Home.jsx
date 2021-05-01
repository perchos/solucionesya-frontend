import React from 'react';
import { Container, Row, CardGroup, Card } from 'react-bootstrap';
import '../assets/styles/Home.css';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header />
      <Container className='my-4'>
        <Row className='justify-content-center'>
          <CardGroup>
            <Card className='mx-5' style={{ width: '18rem' }}>
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
                  deserunt in perspiciatis labore earum dolor rerum expedita
                  amet dolorum, accusamus inventore. Doloribus.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className='mx-5' style={{ width: '18rem' }}>
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
            <Card className='mx-5' style={{ width: '18rem' }}>
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
    </>
  );
};

export default Home;

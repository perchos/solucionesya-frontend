import '../assets/styles/Home.css';
import axios from 'axios';
import Header from './Header';
import React, { useEffect, useState } from 'react';
import { Container, Row, CardGroup, Card } from 'react-bootstrap';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get('http://localhost:5000/api/posts'),
        json = await res.data;
      setData(json.data);
    };
    getAll();
  }, []);
  //console.log(data);

  return (
    <>
      <Header />
      {data && (
        <Container className='my-4'>
          <Row className='justify-content-center'>
            <CardGroup>
              {data.docs.map((el) => (
                <Card key={el._id} style={{ width: '18rem' }}>
                  <Card.Header>
                    <Card.Title>{el.title}</Card.Title>
                  </Card.Header>
                  <Card.Img
                    variant='top'
                    src='https://dummyimage.com/600x400/000/fff'
                  />
                  <Card.Body>
                    <Card.Text>{el.desc}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;

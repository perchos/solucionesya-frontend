import { Container, Row, Col, Carousel, Media } from 'react-bootstrap';
import '../assets/styles/Publishes.css';
import React from 'react';

const Service = () => {
  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='https://dummyimage.com/600x400/000/fff'
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='https://dummyimage.com/600x400/000/fff'
                alt='Second slide'
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='https://dummyimage.com/600x400/000/fff'
                alt='Third slide'
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <h1>Descripción del servicio</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
            distinctio at fugiat iusto eaque quis inventore quia iure. Quaerat
            magnam nobis dignissimos ipsum, odit eveniet voluptatum modi ea
            consequuntur sed!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            aliquam quibusdam labore autem nulla, ab explicabo, illum repellat
            necessitatibus maxime atque! Suscipit, quia repellat nobis itaque
            nihil nostrum laborum deserunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            repellat, asperiores vel fuga nostrum hic repudiandae magnam
            suscipit dicta saepe ex recusandae? Facere, nam dolorem molestias
            quis autem dolore pariatur?
          </p>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Media>
            <img
              width={64}
              height={64}
              className='mr-3'
              src='https://dummyimage.com/64x64/000/fff'
              alt='Generic placeholder'
            />
            <Media.Body>
              <h5>Pepito Pérez</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin commodo.
              </p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  );
};

export default Service;

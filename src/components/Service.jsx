import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Media } from 'react-bootstrap';
import { DiscussionEmbed } from 'disqus-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Publishes.css';
import Logo from '../assets/img/consejo.svg'

const DOMAIN = 'http://localhost:5000';
const GET_POST_URL = `${DOMAIN}/api/posts`;
const GET_USER_URL = `${DOMAIN}/users`;

const DISQUS_SHORT_NAME = 'solucionesya';

const DISQUS_URL = 'https://solucionesya.disqus.com/';

const Service = (props) => {
  const { postId } = props.match.params;
  const disqusShortname = DISQUS_SHORT_NAME;

  const [post, setPost] = useState({ data: { images: [] } });
  const [user, setUser] = useState({ data: {} });

  const disqusConfig = {
    url: `${DISQUS_URL}/${postId}`,
    identifier: postId,
    title: `Article ${postId}`,
  };

  const getPost = async () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    };

    try {
      const response = await axios.get(`${GET_POST_URL}/${postId}`, options);
      if (response.status === 200) {
        if (response.data.data) {
          const userId = response.data.data.authorId;
          getUser(userId);
          setPost(response.data);
        }

        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (user_id) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    };

    try {
      const response = await axios.get(`${GET_USER_URL}/${user_id}`, options);
      if (response.status === 200) {
        setUser(response.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to={`/`}>
          <img
            src={ Logo }
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
            alt=""
          />
          Soluciones YA!
        </Link>
      </nav>
    <Container className="bg-white my-4 p-5 border rounded box-shadow ">
      <Row className="my-5">
        <Col>
          <Carousel>
            {post.data.images.map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`${DOMAIN}/${image}`}
                    alt={`Imagen #${index + 1}`}
                  />
                  <Carousel.Caption>
                    <h3>Imagen #{index + 1}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col>
          <h3>{post.data.title}</h3>
          <p className="font-italic">{post.data.desc}</p>
          <p className="border rounded p-3"><span className="font-weight-bold">Telefono: </span>{post.data.phone}</p>
          <p className="border rounded p-3"><span className="font-weight-bold">Locación: </span>{post.data.location}</p>
          <p className="border rounded p-3"><span className="font-weight-bold">Precio: </span>{post.data.price}</p>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Media>
            <img
              width={64}
              height={64}
              className="mr-3 rounded-circle"
              src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
              alt="UserPhoto"
            />
            <Media.Body>
              <h5>{user.data.userName}</h5>
              {user.data._id && (
                <Link to={`/user/${user.data._id}`}>
                  <p>Perfil</p>
                </Link>
              )}
            </Media.Body>
          </Media>
        </Col>
      </Row>
      <Row></Row>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Container>
    </>
  );
};

export default Service;

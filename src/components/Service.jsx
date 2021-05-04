import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Media, Button } from 'react-bootstrap';
import { DiscussionEmbed } from 'disqus-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DOMAIN, GET_POST_URL, GET_USER_URL } from '../utils/constants';
// import isLogin from './IsLogin';
import '../assets/styles/Publishes.css';
import Logo from '../assets/img/consejo.svg';

const DISQUS_SHORT_NAME = 'solucionesya';

const DISQUS_URL = 'https://solucionesya.disqus.com/';

const Service = (props) => {
  const { postId } = props.match.params;
  const disqusShortname = DISQUS_SHORT_NAME;

  const [post, setPost] = useState({ data: { images: [] } });
  const [user, setUser] = useState({ data: {} });
  const [showDisqus, setShowDisqus] = useState(false);

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
          setShowDisqus(true);
        }
      }
    } catch (error) {
      setPost({ data: { images: [] } });
      Swal.fire({
        icon: 'error',
        title: 'Error trayendo publicación',
        showConfirmButton: false,
        timer: 1500,
      });
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
        if (response.data.data) setUser(response.data);
      }
    } catch (error) {
      setUser({ data: {} });
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
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
            alt=""
          />
          Soluciones YA!
        </Link>
      </nav>
      <Container className="bg-white my-4 p-5 border rounded box-shadow ">
        <div className="text-right">
          <Button variant="secondary" onClick={() => props.history.goBack()}>
            Regresar
          </Button>
        </div>
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
                      <h4 className="my-0">Imagen #{index + 1}</h4>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
          <Col>
            <h3>{post.data.title}</h3>
            <p className="font-italic">{post.data.desc}</p>
            <p className="border rounded p-3">
              <span className="font-weight-bold">Telefono: </span>
              {post.data.phone}
            </p>
            <p className="border rounded p-3">
              <span className="font-weight-bold">Locación: </span>
              {post.data.location}
            </p>
            <p className="border rounded p-3">
              <span className="font-weight-bold">Precio: </span>
              {post.data.price}
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
        {showDisqus && (
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        )}
      </Container>
    </>
  );
};

export default Service;

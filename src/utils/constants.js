const DOMAIN = 'http://localhost:5000';

// Images
export const IMAGES_KEY_NAME = 'postImages';

// ENDPOINTS

// GET /posts
export const GET_POSTS_URL = `${DOMAIN}/api/posts`;

// GET /posts/:postId
export const GET_POST_URL = `${DOMAIN}/api/posts`;

// POST /post
export const POST_POST_URL = `${DOMAIN}/api/post`;

// DELETE /posts/:postId
export const DELETE_POST_URL = `${DOMAIN}/api/posts`;

//

// GET /posts/:userId
export const GET_USER_POSTS_URL = `${DOMAIN}/users/posts`;

// GET /:userId
export const GET_USER_URL = `${DOMAIN}/users`;

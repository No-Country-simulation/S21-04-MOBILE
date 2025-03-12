import instanceAxios from '../index';

interface Post {
    mediaURL: string;
    type: 'normal' | 'sample' | 'ideas';
    userId: number;
    description: string;
}

// obtener un post por id
// deberia traer información del usuario, likes y comentarios
const getPostByIdServices = ({ }: { idPost: string }) => {
    instanceAxios
        .get('')
        .then((r) => console.log(r))
        .catch((err) => console.log(err))
        .finally(() => null);
};

// obtener posts por userId
// deberia un post por id, deberìa traer información del usuario, likes y comentarios
const getPostByUserIdServices = ({ }: { idUser: string }) => {
    instanceAxios
        .get('')
        .then((r) => console.log(r))
        .catch((err) => console.log(err))
        .finally(() => null);
};

// crear publicacion
// establecer campos (formData)
const createPostServices = async ({ mediaURL, type, userId, description }: Post) => {
    await instanceAxios
        .post('posts', {
            type,
            media_url: mediaURL,
            user: userId,
            description,
        })
        .then((r) => console.log(r))
        .catch((err) => console.log(err))
        .finally(() => null);
};

// borrar publicacion
// envio el id de la publicacion
const deletePostServices = ({ }: { idPost: string }) => {
    instanceAxios
        .delete('')
        .then((r) => console.log(r))
        .catch((err) => console.log(err))
        .finally(() => null);
};

export {
    getPostByIdServices,
    getPostByUserIdServices,
    createPostServices,
    deletePostServices,
};
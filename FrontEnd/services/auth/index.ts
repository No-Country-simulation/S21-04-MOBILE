import instanceAxios from "../index";

interface LoginAuth {
    email: string,
    password: string
}

const loginAuthServices = ({ email, password }: LoginAuth) => {
    instanceAxios.post("/auth", { email, password })
        .then(r => console.log({ r }))
        .catch(err => console.log({ err }))
};

export default loginAuthServices;
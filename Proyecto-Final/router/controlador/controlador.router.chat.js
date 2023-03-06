import Chat from "../../persistencia/Chat/ChatFactory.js";

let chat = new Chat().returnDbConnection();

const getChatUser = async (req, res) => {
    const listaChatEmail = await chat.listarEmail(req.params.email);
    res.send(listaChatEmail);
};

export { getChatUser };

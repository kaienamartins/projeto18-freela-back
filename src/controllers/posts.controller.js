import { db } from "../database/database.connection.js";

export async function post(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Você não está logado(a)!" });
  }

  const { image, description } = req.body;

  if (!image || !description) {
    return res.status(400).json({ message: "Dados da postagem incompletos!" });
  }

  try {
    await db.query(`INSERT INTO posts (image, description) VALUES ($1, $2);`, [image, description]);

    res.status(201).json({ message: "Post criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

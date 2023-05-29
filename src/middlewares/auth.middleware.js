import { db } from "../database/database.connection.js";

export async function authToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Você não está logado(a)!" });
  }

  try {
    const session = await db.query("SELECT userId FROM sessions WHERE token = $1;", [token]);

    if (session.rows.length === 0) {
      return res.status(401).json({ message: "Token de autenticação inválido!" });
    }

    const userId = session.rows[0].userid;

    req.locals = {
      userId: userId,
    };

    next();
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

import { db } from "../database/database.connection.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.userData;

  const hashPass = bcrypt.hashSync(password, 10);

  try {
    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [
      name,
      email,
      hashPass,
    ]);

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.locals.loginData;

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const passMatch = bcrypt.compareSync(password, user.rows[0].password);
    if (!passMatch) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = uuidv4();
    await db.query(`INSERT INTO sessions (token, userid) VALUES ($1, $2);`, [
      token,
      user.rows[0].id,
    ]);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

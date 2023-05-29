import { db } from "../database/database.connection.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, profilePic, biography } = req.locals.userData;

  const hashPass = bcrypt.hashSync(password, 10);

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email]);

    if (user.rows.length > 0) {
      return res.status(409).json({ message: "Email já cadastrado!" });
    }

    await db.query(
      "INSERT INTO users (name, password, profilePic, biography, email) VALUES ($1, $2, $3, $4, $5);",
      [name, hashPass, profilePic, biography, email]
    );

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.locals.loginData;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const passMatch = bcrypt.compareSync(password, user.rows[0].password);
    if (!passMatch) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = uuidv4();
    await db.query("UPDATE users SET token = $1 WHERE email = $2;", [token, email]);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function getUser(req, res) {
  const { userId } = req.locals;

  try {
    const user = await db.query(
      `SELECT users.id, users.name, users.email, users.profilePic, users.biography, 
      posts.id AS postId, posts.image, posts.description, posts.likes 
      FROM users 
      LEFT JOIN posts ON users.id = posts.userId 
      WHERE users.id = $1;`,
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const userData = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      profilePic: user.rows[0].profilepic,
      biography: user.rows[0].biography,
      posts: [],
    };

    user.rows.forEach((row) => {
      if (row.postid) {
        const post = {
          id: row.postid,
          image: row.image,
          description: row.description,
          likes: row.likes,
        };
        userData.posts.push(post);
      }
    });

    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function searchUser(req, res) {
  const { search } = req.query;
  const { userId } = req.locals;

  try {
    const users = await db.query("SELECT * FROM users WHERE name ILIKE $1;", [`%${search}%`]);

    if (users.rows.length === 0) {
      return res.status(404).json({ message: "Nenhum usuário encontrado!" });
    }

    const results = users.rows.map(async (user) => {
      const { id, name, email, profilePic, biography } = user;

      const isFollowed = await db.query(
        "SELECT * FROM followers WHERE followerId = $1 AND followingId = $2",
        [userId, id]
      );

      return {
        id,
        name,
        email,
        profilePic,
        biography,
        isFollowed: isFollowed.rows.length > 0,
      };
    });

    const usersWithFollowStatus = await Promise.all(results);

    return res.status(200).json(usersWithFollowStatus);
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function visitProfile(req, res) {
  const { id } = req.params;
  const { userId } = req.locals;

  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const { id: profileId, name, email, profilePic, biography } = user.rows[0];

    const isFollowed = await db.query(
      "SELECT * FROM followers WHERE followerId = $1 AND followingId = $2",
      [userId, profileId]
    );

    const posts = await db.query("SELECT * FROM posts WHERE userId = $1;", [profileId]);

    const userWithPosts = {
      id: profileId,
      name,
      email,
      profilePic,
      biography,
      isFollowed: isFollowed.rows.length > 0,
      posts: posts.rows,
    };

    if (userId !== profileId) {
      const followStatus = await db.query(
        "SELECT * FROM following WHERE followerId = $1 AND followingId = $2",
        [userId, profileId]
      );

      userWithPosts.isFollowed = followStatus.rows.length > 0;
    }

    return res.status(200).json(userWithPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

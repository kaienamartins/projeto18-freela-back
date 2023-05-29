import { db } from "../database/database.connection.js";

export async function getFollowers(req, res) {
  const { id } = req.params;

  try {
    const followers = await db.query(
      `SELECT users.id, users.name, users.email, users.profilePic, users.biography
      FROM users
      INNER JOIN followers ON users.id = followers.followerId
      WHERE followers.followingId = $1;`,
      [id]
    );

    res.status(200).json({ followers: followers.rows });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function getFollowing(req, res) {
  const userId = req.user.id;
  try {
    const following = await db.query(
      `SELECT users.id, users.name, users.email, users.profilePic, users.biography
      FROM users
      INNER JOIN Following ON users.id = Following.followingId
      WHERE Following.followerId = $1;`,
      [userId]
    );

    res.status(200).json({ following: following.rows });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function followProfile(req, res) {
  const { id } = req.params;
  const { userId } = req.locals;

  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const { id: profileId } = user.rows[0];

    const followStatus = await db.query(
      "SELECT * FROM following WHERE followerId = $1 AND followingId = $2",
      [userId, profileId]
    );

    if (followStatus.rows.length > 0) {
      return res.status(400).json({ message: "Você já está seguindo esse perfil!" });
    }

    await db.query("INSERT INTO following (followerId, followingId) VALUES ($1, $2)", [
      userId,
      profileId,
    ]);

    return res.status(200).json();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function unfollowProfile(req, res) {
  const { id } = req.params;
  const { userId } = req.locals;

  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const { id: profileId } = user.rows[0];

    const followStatus = await db.query(
      "SELECT * FROM following WHERE followerId = $1 AND followingId = $2",
      [userId, profileId]
    );

    if (followStatus.rows.length === 0) {
      return res.status(400).json({ message: "Você não está seguindo esse perfil!" });
    }

    await db.query("DELETE FROM following WHERE followerId = $1 AND followingId = $2", [
      userId,
      profileId,
    ]);

    return res.status(200).json();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

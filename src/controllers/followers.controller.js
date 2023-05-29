import { db } from "../database/database.connection.js";

export async function getFollowers(req, res) {
  const { userId } = req.locals;

  try {
    const followers = await db.query(
      `SELECT users.id, users.name, users.email, users.profilePic, users.biography
      FROM users
      INNER JOIN followers ON users.id = followers.followerId
      WHERE followers.followingId = $1;`,
      [userId]
    );

    res.status(200).json({ followers: followers.rows });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function getFollowing(req, res) {
  const { userId } = req.locals;

  try {
    const following = await db.query(
      `SELECT users.id, users.name, users.email, users.profilePic, users.biography
      FROM users
      INNER JOIN following ON users.id = following.followingId
      WHERE following.followerId = $1;`,
      [userId]
    );

    res.status(200).json({ following: following.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function followProfile(req, res) {
  const { id } = req.params;
  const { userId } = req.locals;
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const profile = await db.query("SELECT * FROM users WHERE id = $1;", [id]);

    if (profile.rows.length === 0) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    const followerId = userId;
    const followingId = profile.rows[0].id;

    const followStatus = await db.query(
      "SELECT * FROM following WHERE followerId = $1 AND followingId = $2",
      [followerId, followingId]
    );

    if (followStatus.rows.length > 0) {
      return res.status(400).json({ message: "Você já está seguindo esse perfil!" });
    }

    await db.query("INSERT INTO following (followerId, followingId) VALUES ($1, $2)", [
      followerId,
      followingId,
    ]);

    await db.query("INSERT INTO followers (followerId, followingId) VALUES ($1, $2)", [
      followingId,
      followerId,
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
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const profile = await db.query("SELECT * FROM users WHERE id = $1;", [id]);

    if (profile.rows.length === 0) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    const followerId = userId;
    const followingId = profile.rows[0].id;

    const followStatus = await db.query(
      "SELECT * FROM following WHERE followerId = $1 AND followingId = $2",
      [followerId, followingId]
    );

    if (followStatus.rows.length === 0) {
      return res.status(400).json({ message: "Você não está seguindo esse perfil!" });
    }

    await db.query("DELETE FROM following WHERE followerId = $1 AND followingId = $2", [
      followerId,
      followingId,
    ]);

    await db.query("DELETE FROM followers WHERE followerId = $1 AND followingId = $2", [
      followingId,
      followerId,
    ]);

    return res.status(200).json();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

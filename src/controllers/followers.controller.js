import { db } from "../database/database.connection.js";

export async function getFollowers(req, res) {
  const { id } = req.params;

  try {
    const followers = await db.query(
      `SELECT * FROM users
      INNER JOIN followers ON users.id = followers.followerid
      WHERE followers.followingid = $1;`,
      [id]
    );

    res.status(200).json({ followers: followers.rows });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function getFollowing(req, res) {
  const { id } = req.params;

  try {
    const following = await db.query(
      `SELECT * FROM users
      INNER JOIN following ON users.id = following.followingid
      WHERE following.followerid = $1;`,
      [id]
    );

    res.status(200).json({ following: following.rows });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

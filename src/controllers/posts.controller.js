import { db } from "../database/database.connection.js";

export async function post(req, res) {
  const { userId } = req.locals;
  const { image, description } = req.body;

  if (!image || !description) {
    return res.status(400).json({ message: "Dados da postagem incompletos!" });
  }

  try {
    await db.query("INSERT INTO posts (userId, image, description) VALUES ($1, $2, $3);", [
      userId,
      image,
      description,
    ]);

    res.status(201).json({ message: "Post criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.locals;

  try {
    const parsedPostId = parseInt(postId);

    if (isNaN(parsedPostId)) {
      return res.status(400).json({ message: "ID do post inválido!" });
    }

    const post = await db.query("SELECT * FROM posts WHERE id = $1", [parsedPostId]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    const likedPost = await db.query("SELECT * FROM post_likes WHERE postId = $1 AND userId = $2", [
      parsedPostId,
      userId,
    ]);

    if (likedPost.rows.length > 0) {
      return res.status(400).json({ message: "Você já deu like nesse post!" });
    }

    await db.query("INSERT INTO post_likes (postId, userId) VALUES ($1, $2)", [
      parsedPostId,
      userId,
    ]);

    await db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [parsedPostId]);

    const updatedPost = await db.query("SELECT likes FROM posts WHERE id = $1", [parsedPostId]);

    return res.status(200).json({
      likes: updatedPost.rows[0].likes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor", error: err.message });
  }
}

export async function unlikePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.locals;

  try {
    const post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    const likedPost = await db.query("SELECT * FROM post_likes WHERE postId = $1 AND userId = $2", [
      postId,
      userId,
    ]);

    if (likedPost.rows.length === 0) {
      return res.status(400).json({ message: "Você não deu like nesse post!" });
    }

    await db.query("UPDATE posts SET likes = likes - 1 WHERE id = $1", [postId]);

    await db.query("DELETE FROM post_likes WHERE postId = $1 AND userId = $2", [postId, userId]);

    return res.status(200).json();
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

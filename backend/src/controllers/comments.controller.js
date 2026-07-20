import { pool } from '../config/db.js';

async function getComments(req, res) {
  try {
    const result = await pool.query(
      `SELECT c.id, c.text, c.rating, c.created_at, u.id AS user_id, u.name
       FROM comments c
       JOIN users u ON u.id = c.user_id
       ORDER BY c.created_at DESC`,
    );

    const comments = result.rows;

    const avgRating = comments.length
      ? Number(
          (
            comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
          ).toFixed(1),
        )
      : null;

    return res.json({
      comments,
      count: comments.length,
      averageRating: avgRating,
    });
  } catch (err) {
    console.error('Get comments error:', err);

    return res.status(500).json({
      message: 'Something went wrong while fetching comments.',
    });
  }
}

async function addComment(req, res) {
  try {
    const { text, rating } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: 'Comment text is required.',
      });
    }

    const ratingNum = Number(rating);

    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    const result = await pool.query(
      `INSERT INTO comments (user_id, text, rating)
       VALUES ($1, $2, $3)
       RETURNING id, text, rating, created_at`,
      [req.user.id, text.trim(), ratingNum],
    );

    const comment = {
      ...result.rows[0],
      user_id: req.user.id,
      name: req.user.name,
    };

    return res.status(201).json({ comment });
  } catch (err) {
    console.error('Add comment error:', err);

    return res.status(500).json({
      message: 'Something went wrong while adding your comment.',
    });
  }
}

export { getComments, addComment };

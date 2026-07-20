import { pool } from '../config/db.js';

// POST /api/storage  (protected)
async function createStorageItem(req, res) {
  try {
    const { productName, productDetails, description, startDate, endDate } = req.body;

    if (!productName || !productName.trim()) {
      return res.status(400).json({ message: 'Product name is required.' });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are both required.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Start date / end date is not a valid date.' });
    }
    if (end < start) {
      return res.status(400).json({ message: 'End date cannot be before the start date.' });
    }

    const result = await pool.query(
      `INSERT INTO storage_items
        (user_id, product_name, product_details, description, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, product_name, product_details, description, start_date, end_date, created_at`,
      [
        req.user.id,
        productName.trim(),
        (productDetails || '').trim() || null,
        (description || '').trim() || null,
        startDate,
        endDate,
      ],
    );

    return res.status(201).json({ item: result.rows[0] });
  } catch (err) {
    console.error('Create storage item error:', err);
    return res.status(500).json({ message: 'Something went wrong while saving your product.' });
  }
}

// GET /api/storage/my  (protected) - current user's own stored products
async function getMyStorageItems(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, product_name, product_details, description, start_date, end_date, created_at
       FROM storage_items
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id],
    );

    return res.json({ items: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Get my storage items error:', err);
    return res.status(500).json({ message: 'Something went wrong while fetching your products.' });
  }
}

export { createStorageItem, getMyStorageItems };

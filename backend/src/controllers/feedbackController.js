import pool from '../config/db.js'

export const createFeedback = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate data
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "Missing fields" })
    }

    // Insert feedback into database
    try {
        const [response] = await pool.query(`
            INSERT INTO feedback (name, email, subject, message)
            VALUES (?, ?, ?, ?)
            `, [name, email, subject, message]
        );

        // Send a success response with the database result
        res.status(201).json({
            message: "Feedback submitted successfully!",
            data: response
        })
    } catch (error) {
        // Log error for debugging and respond with error message
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
};

export const getAllFeedback = async (req, res) => {
    // Get all feedback data from database
    try {
        const [rows] = await pool.query(`
            SELECT id, name, email, subject, message, status, created_at
            FROM feedback
            `
        )

        // Send a success response with the database result
        res.status(200).json({ data: rows })
    } catch (error) {
        // Log error for debugging and respond with error message
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
};

export const getFeedbackById = async (req, res) => {
    const { id } = req.params;

    // Check for id in params
    if (!id) {
        return res.status(400).json({ message: "Feedback ID is required" })
    }

    // Get feedback data from database
    try {
        const [rows] = await pool.query(`
                SELECT id, name, email, subject, message, status, created_at
                FROM feedback
                WHERE id = ?
                `, [id]
        )

        // Check if feedback was found
        if (rows.length === 0) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Send a success response with the database result
        res.status(200).json({ data: rows[0] })
    } catch (error) {
        // Log error for debugging and respond with error message
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
import express from 'express'

import {
    createFeedback,
    getAllFeedback,
    getFeedbackById
} from '../controllers/feedbackController.js'

const router = express.Router()

router.post('/api/feedback', createFeedback)
router.get('/api/feedback', getAllFeedback)
router.get('/api/feedback/:id', getFeedbackById)

export default router
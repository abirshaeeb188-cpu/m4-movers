import { Router } from 'express'
import { createContactRequest } from '../controllers/contact.controller.js'
import { attachAuthIfPresent } from '../middleware/auth.js'

const router = Router()

router.post('/', attachAuthIfPresent, createContactRequest)

export default router

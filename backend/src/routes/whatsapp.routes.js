import { Router } from 'express'
import { logWhatsappClick } from '../controllers/whatsapp.controller.js'
import { attachAuthIfPresent } from '../middleware/auth.js'

const router = Router()

router.post('/', attachAuthIfPresent, logWhatsappClick)

export default router

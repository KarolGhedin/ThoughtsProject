import express from 'express'
import ThoughtsController from '../controllers/ThoughtsController.js'

const router = express.Router()

//helpers
import { checkAuth } from '../helpers/auth.js'

router.get('/add', checkAuth, ThoughtsController.createThought)
router.post('/add', checkAuth, ThoughtsController.createThoughtSave)
router.get('/edit/:id', checkAuth, ThoughtsController.updateThought)
router.post('/edit', checkAuth, ThoughtsController.updateThoughtSave)
router.get('/dashboard', checkAuth, ThoughtsController.dashboard)
router.post('/remove', checkAuth, ThoughtsController.removeThought)
router.get('/', ThoughtsController.showThoughts)

export default router
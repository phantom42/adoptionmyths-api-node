import express from 'express';
import path from "path";
import { verifyApiKey } from '../../middleware/verifyApiKey.js';
import { getRandomListOfMyths, getRandomMyth, getMyth, getAllMyths } from '../../controllers/mythController.js';
import { fileURLToPath } from "url";    


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

//router.use(verifyApiKey);
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/random.html"));
});
router
     .route('/random')
     .get(getRandomMyth)
router
	.route('/randomized')
	.get(getRandomListOfMyths)
router
	.route('/all')
	.get(getAllMyths)
router
	.route('/:id')
	.get(getMyth)
export default router;
import { Router } from 'express';
import { request } from 'http';

const router = Router();

// get all questions of a test
router.get('/:testId', async (req, res) => {
  const test = await req.context.models.Test.findById(
    req.params.testId,
  );
  return res.send(test);
});

router.post('/', async (req, res) => {
  
    // make a new question under a testID from the payload

  return res.send(test);
});


router.post('/submit/:questionId', async (req, res) => {
  
  //get the submitted from the body and verify with the answer.

  return res.send(200);
});

router.delete('/:questionId', async (req, res) => {

  return res.send(200);
});

export default router;

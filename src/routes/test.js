import { Router } from 'express';
import { request } from 'http';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Test.find();
  return res.send(messages);
});

router.get('/:testId', async (req, res) => {
  const test = await req.context.models.Test.findById(
    req.params.testId,
  );
  return res.send(test);
});

router.post('/', async (req, res) => {
  const test = await req.context.models.Test.create({
    name: request.body.name,
    creator: req.context.me.id,
    status: "draft",
    description: request.body.name,
  });

  return res.send(test);
});


router.post('/publish/:testId', async (req, res) => {
  
  //get the test by id and change the status

  return res.send(200);
});

router.delete('/:testId', async (req, res) => {
  const test = await req.context.models.Test.findById(
    req.params.testId,
  );

  let result = null;
  if (test) {
    result = await test.remove();
  }

  return res.send(result);
});

export default router;

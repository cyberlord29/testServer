import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

// Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('maneesh'),
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/tests', routes.test);


// Test Data 

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Test.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'maneesh',
  });

  const test1 = new models.Test({
    name: "Captials",
    creator: user1.id,
    status: "published" ,
    description: "Capitals of countries",
  });

  const question1 = new models.Question({
    question: "What is the capital of India",
    test: test1.id,
    timeLimit: "2",
    answer: "New Delhi",
  });

  const question2 = new models.Question({
    question: "What is the capital of America",
    test: test1.id,
    timeLimit: "2",
    answer: "D.C.",
  });
  
  await test1.save();

  await user1.save();

  await question1.save();
  await question2.save();

};

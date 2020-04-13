import *  as express from 'express';
import { router } from './routes/routes';
import { Mock } from './mock/mock'
import { ConnectionService } from './services/connection.service';

const app = express();
app.use(express.json());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', router);


app.listen(3000, async () => {
  console.log(`Server is listening on port 3000`);
  await ConnectionService.generateConnection()
  const mock = new Mock()
  await mock.insertMockData()
});


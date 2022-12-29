export default function headers(req, res, next) {
  try {
    const allow = ['http://localhost:3000', 'http://localhost:3001', 'https://test.com', 'http://localhost:8081'];
    if (allow.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
      // res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
  } catch (e) {
    next(e);
  }
}

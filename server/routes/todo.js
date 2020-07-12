const router = require('express').Router();

const todoContoller = require('../controllers/todoController');
const { validateRequestToken } = require('../controllers/utility');

router.post(
  '/',
  validateRequestToken,
  todoContoller.addToDo,
  todoContoller.getToDos,
  (req, res) => {
    res.status(200).send({ todos: res.locals.allToDos, status: 'success' });
  }
);

router.delete(
  '/:todoId',
  validateRequestToken,
  todoContoller.deleteToDo,
  todoContoller.getToDos,
  (req, res) => {
    res.status(200).send({ todos: res.locals.allToDos, status: 'success' });
  }
);

router.delete(
  '/delete/:userId/:todoId',
  todoContoller.deleteToDo,
  todoContoller.getToDos,
  (req, res) => {
    res.status(200).send({ todos: res.locals.allToDos, status: 'success' });
  }
);

module.exports = router;

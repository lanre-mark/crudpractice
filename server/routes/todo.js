const router = require('express').Router();

const todoContoller = require('../controllers/todoController');

router.post(
  '/add',
  todoContoller.addToDo,
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

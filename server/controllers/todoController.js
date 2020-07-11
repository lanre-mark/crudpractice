const ToDos = require('../models/ToDos');

const addToDo = async (req, res, next) => {
  try {
    let newToDo = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    };
    res.locals.userId = req.body.userId;
    let todo = await new ToDos(newToDo).save();
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

const getToDos = async (req, res, next) => {
  try {
    const allToDos = await ToDos.find(
      { userId: res.locals.userId },
      { userId: 0, updatedAt: 0, createdAt: 0 }
    );
    res.locals.allToDos = allToDos;
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

const deleteToDo = async (req, res, next) => {
  try {
    await ToDos.deleteOne({ _id: req.params.todoId });
    res.locals.userId = req.params.userId;
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addToDo, getToDos, deleteToDo };

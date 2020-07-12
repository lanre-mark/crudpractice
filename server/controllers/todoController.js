const ToDos = require('../models/ToDos');

const addToDo = async (req, res, next) => {
  try {
    let newToDo = {
      userId: res.locals.userId,
      title: req.body.title,
      description: req.body.description,
    };
    let todo = await new ToDos(newToDo).save();
    return next();
  } catch (err) {
    console.log(err.message);
    return next({ error: err });
  }
};

const getToDos = async (req, res, next) => {
  try {
    const allToDos = await ToDos.find(
      { userId: res.locals.userId },
      { userId: 0, updatedAt: 0, createdAt: 0, __v: 0 }
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
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addToDo, getToDos, deleteToDo };

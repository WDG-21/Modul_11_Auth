import ErrorResponse from '../utils/ErrorResponse.js';

const getAll = (Model) => async (req, res) => {
  const data = await Model.find().lean();
  res.json({ data });
};

const getOneByID = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findById(id).lean();
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ data });
};

const createOne = (Model) => async (req, res) => {
  const data = await Model.create(req.body);
  res.status(201).json({ message: `${Model.modelName} created successfully`, data });
};

const updateOneByID = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ message: `${Model.modelName} updated successfully`, data });
};

const deleteOneByID = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findByIdAndDelete(id);
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ message: `${Model.modelName} deleted successfully`, data });
};

export { getAll, getOneByID, createOne, updateOneByID, deleteOneByID };

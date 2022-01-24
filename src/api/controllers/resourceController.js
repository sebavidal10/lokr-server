const Resource = require('../models/resourceModel');

exports.list = async (req, res, next) => {
  try {
    const resources = await Resource.find({});

    res.json(resources);
  } catch (error) {
    next(new Error(error));
  }
};

exports.create = async (req, res, next) => {
  const resource = new Resource(req.body);
  await resource.save();
  res.json(resource);
};

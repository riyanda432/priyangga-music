const { AlbumModel } = require("../models/albumModel");

const getAllAlbums = async (req, res) => {
  try {
    let { _sort, _order, page, limit, ...rest } = req.query;
    page = +page || 1;
    limit = +limit || 6;
    const skip = (page - 1) * limit;
    let sort = { updatedAt: -1 };

    if (_order) {
      const order = _order === "asc" ? 1 : -1;
      sort = { year: order, ...sort };
    }

    let query = rest;
    if (rest.genre) {
      query = { ...query, genre: rest.genre };
    }

    const [totalAlbum, result] = await Promise.all([
      AlbumModel.countDocuments(query),
      AlbumModel.find(query).skip(skip).limit(limit).sort(sort)
    ])
    const totalPages = Math.ceil(totalAlbum / limit);
    if(!result.length) {
      return res.status(404).json({ error: { message: "No albums found", status: "error" } });
    }

    return res.status(200).json({ data: { result, totalPages } });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, status: "error" } });
  }
};

const getOneAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AlbumModel.findById({ id });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const addAlbum = async (req, res) => {
  try {
    const newAlbum = new AlbumModel(req.body);
    await newAlbum.save();
    return res.status(201).json({ data: newAlbum, message: "Album added successfully"});
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...albumData } = req.body;
    const [ foundAlbum, updatedAlbum ] = await Promise.all([
      AlbumModel.findById(id),
      AlbumModel.findByIdAndUpdate(id, albumData, { new: true })
    ])

    if (!updatedAlbum) {
      return res.status(500).json({
        error: {
          status: "error",
          message:  "Failed to update album",
        }
      });
    }
   
    if (!foundAlbum) {
      return res.status(404).json({ status: "error", message: "Album not found" });
    }

    if (foundAlbum.userId !== userId) {
      return res.status(403).json(
        {
          error: {
            status: "error",
            message: "You are not authorized to update this album",
          }
        }
      );
    }

    return res.status(200).json({ status: "success", message: "Album updated successfully", data: updatedAlbum });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const [ foundAlbum, deleteAlbum ] = await Promise.all([
      AlbumModel.findById(id),
      AlbumModel.findByIdAndDelete(id)
    ])

    if (!deleteAlbum) {
      return res
        .status(400)
        .send({ error: { message: "Album not found !" } });
    }
    
    if (foundAlbum.userId !== userId) {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to delete this album"
      });
    }

    return res
      .status(200)
      .send({ data: { status: "success" }, message: "Album Deleted Successfully"});

  } catch (err) {
    return res.status(500).json({ error: { message: err.message, status: "error" } });
  }
};

module.exports = {
  getAllAlbums,
  getOneAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};

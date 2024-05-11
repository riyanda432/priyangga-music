const { Router } = require("express");
const express = require("express");
const { getAllAlbums, getOneAlbum, addAlbum,  deleteAlbum, updateAlbum } = require("../controller/albumController");
const { checkUserAuth } = require("../middleware/authMiddleware");

const albumRouter = Router();
albumRouter.use(checkUserAuth);

albumRouter.get("/api/albums", getAllAlbums);
albumRouter.get("/api/albums/:id", getOneAlbum);
albumRouter.post("/api/albums", addAlbum);
albumRouter.put("/api/albums/:id", updateAlbum);
albumRouter.delete("/api/albums/:id", deleteAlbum);


module.exports = { albumRouter };

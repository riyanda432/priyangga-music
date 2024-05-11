const { Router } = require("express");
const { 
    getAllAlbums,
    getOneAlbum, 
    addAlbum, 
    deleteAlbum, 
    updateAlbum 
} = require("../controller/albumController");
const { checkUserAuth } = require("../middleware/authMiddleware");
const albumRouter = Router();
albumRouter.use(checkUserAuth);

albumRouter.get("/albums", getAllAlbums);
albumRouter.get("/albums/:id", getOneAlbum);
albumRouter.post("/albums", addAlbum);
albumRouter.patch("/albums/:id", updateAlbum);
albumRouter.delete("/albums/:id", deleteAlbum);

module.exports = { albumRouter };

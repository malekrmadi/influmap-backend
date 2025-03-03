const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/authMiddleware");

// CRUD Avis
router.post("/",  reviewController.createReview);
router.put("/:id",  reviewController.updateReview);
router.delete("/:id",  reviewController.deleteReview);
router.get("/place/:placeId", reviewController.getReviewsByPlace);

module.exports = router;

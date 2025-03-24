
const express = require("express");
const router = express.Router();
const Movie = require("./MovieSchema");

router.post("/", async (req, res) => {
    try {
        const { title, director, genre, releaseYear, availableCopies } = req.body;

        if (!title || !director || !genre ||!availableCopies) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const movie = new Movie({ title, director, genre, releaseYear, availableCopies });
        await movie.save();
        res.status(201).json({ message: "Movie created successfully!", movie });
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found." });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, genre, releaseYear, availableCopies } = req.body;

        if (!title || !director || !genre || availableCopies === undefined) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { title, director, genre, releaseYear, availableCopies },
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Movie updated successfully!", movie: updatedMovie });
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Movie deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

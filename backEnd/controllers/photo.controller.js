const Photo = require('../models/photos'); // Adjust the path according to your project structure

// Get all photos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos' });
  }
};


// Upload a new photo
exports.uploadPhoto = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    // Validate data
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const photo = new Photo({ imageUrl, description });
    await photo.save();

    res.status(201).json({ message: 'Photo uploaded successfully', photo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
         
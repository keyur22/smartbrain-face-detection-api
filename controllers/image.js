const handleImage = (clarifaiApp) => (req, res) => {
    const { image } = req.body;

    clarifaiApp.models.predict('a403429f2ddf4b49b307e318f00e528b', image)
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Error parsing image'));
}

module.exports = { handleImage }
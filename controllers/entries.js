const handleEntries = (db) => (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(401).json('Invalid UserID');

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(id => {
            if (id.length) {
                return res.status(200).json(id[0]);
            } else {
                return res.status(400).json('User not found');
            }
        })
        .catch(err => res.status(400).json('Error retrieving the user'));
}

module.exports = { handleEntries }
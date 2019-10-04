const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(401).json('User not found');

    db.select().table('users').where({ id })
        .then(user => {
            if (user.length) {
                return res.json(user[0]);
            } else {
                return res.status(400).json('User not found');
            }
        })
        .catch(err => res.status(400).json('Error finding user'));
}

module.exports = { handleProfileGet }
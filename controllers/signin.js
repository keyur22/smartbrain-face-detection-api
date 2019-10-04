const handleSignin = (bcrypt, db) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json('Invalid credentials');

    db.select('email', 'hash').from('login').where({ email: email.toLowerCase() })
        .then(user => {
            if (user.length) {
                const isValid = bcrypt.compareSync(password, user[0].hash);
                if (isValid) {
                    db.select().from('users').where({ email: user[0].email })
                        .then(user => res.json(user[0]))
                        .catch(err => res.status(400).json('Unable to login. Please try again later.'));
                } else {
                    return res.status(401).json('Invalid credentials');
                }
            } else {
                return res.status(401).json('Invalid credentials');
            }
        })
        .catch(err => {
            res.status(400).json('Unable to login. Please try again later.')
        });
}

module.exports = { handleSignin }
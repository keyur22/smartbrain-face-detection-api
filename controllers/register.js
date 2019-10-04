const handleRegister = (bcrypt, db, saltRounds) => (req, res) => {
    const { name, password } = req.body;
    const email = req.body.email.toLowerCase();
    if (!email || !password || !name) return res.status(401).json('Invalid credentials');

    const hash = bcrypt.hashSync(password, saltRounds);

    db.transaction(trx => {
        trx.insert({
            email, hash
        }).into('login').returning('email')
            .then(loginEmail => {
                return trx.insert({
                    name,
                    email: loginEmail[0],
                    joined: new Date()
                }).into('users').returning('*')
                    .then(user => res.status(200).json(user[0]))
                    .catch(err => res.status(401).json('Unable to register. Please try again later.'));

            })
            .catch(err => {
                let msg = '';
                if (err.code == 23505) {
                    msg = 'User with this email already exists!!';
                } else {
                    msg = 'Unable to register. Please try again later.';
                }
                res.status(400).json(msg);
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .then(res => res.json(res))
        .catch(err => res.status(400).json('Unable to register. Please try again later.'));
}

module.exports = { handleRegister }
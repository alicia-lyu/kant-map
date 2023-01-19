module.exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}

module.exports.userAccess = (req, res) => {
    res.status(200).send("User Content.");
}

module.exports.adminAccess = (req, res) => {
    res.status(200).send("Admin Content.");
}


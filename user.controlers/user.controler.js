const fs = require("fs");
const data = fs.readFileSync("./user.json")

module.exports.getAUser = (req, res, next) => {
    const generateIndex = Math.floor(Math.random() * 10);
    const parseData = JSON.parse(data)
    const randomData = parseData[generateIndex]

    res.status(200).json(randomData)
}

module.exports.getAllUser = (req, res, next) => {
    const parseData = JSON.parse(data)
    const { limit } = req.query
    if (limit) {

        if (Number(parseData.length) >= limit) {
            res.send(parseData.slice(0, limit))
        }
        else {
            res.status(417).json(" There is not so much data, for now the limit is up to 10")
        }

    }

    else {
        res.json(parseData)

    }
}

module.exports.saveAuser = (req, res, next) => {
    const existing = JSON.parse(data)
    const { id,
        gender,
        name,
        contact,
        address,
        photoUrl } = req.body;

    const obj = {
        id,
        gender,
        name,
        contact,
        address,
    }
    const checkId = existing.find(data => data.id == id)


    if (!checkId) {
        if (id && gender && name && contact && address && photoUrl) {
            existing.push(obj)
            const newObj = JSON.stringify(existing)
            fs.writeFileSync("user.json", newObj)
            // console.log(newObj)
            res.status(200).send("saved")
        }

        else {
            res.status(501).send("Faild! some property are blank ")
        }
    }

    else {
        res.send("This id already Exist")
    }

}

module.exports.updateAUser = (req, res, next) => {
    // Update a user's information in the .json file using its id
    // BONUS: validate the user id

    const params = req.params.id;
    const { gender, name, contact, address, photoUrl } = req.body

    const existing = JSON.parse(data)
    const checkedId = existing.find(data => data.id === Number(params))

    if (checkedId) {

        checkedId.name = name ? name : checkedId.name;
        checkedId.contact = contact ? contact : checkedId.contact;
        checkedId.address = address ? address : checkedId.address;
        checkedId.photoUrl = photoUrl ? photoUrl : checkedId.photoUrl;
        checkedId.gender = gender ? gender : checkedId.gender;

        const newobj = JSON.stringify(existing)
        fs.writeFileSync("user.json", newobj)
        res.json(checkedId)
    }
    else {

        res.status(501).send('This id not found');
    }


}
module.exports.updateBulkUser = (req, res, next) => {
    // Update multiple users' information in the .json file
    // Take an array of user ids and assign it to the body.
    // BONUS: validate the body.
    const existingData = JSON.parse(data)
    let success = false
    req.body.map(body => {
        existingData.filter(data => {
            // console.log(data)
            if (data.id === body.id) {
                data.name = body.name ? body.name : data.name;
                data.gender = body.gender ? body.gender : data.gender;
                data.address = body.naaddressme ? body.address : data.address;
                data.contact = body.contact ? body.contact : data.contact;
                data.photoUrl = body.photoUrl ? body.photoUrl : data.photoUrl;

                success = true
            }

        })

    })
    if (success) {
        console.log(existingData);
        fs.writeFileSync("user.json", JSON.stringify(existingData))
        res.json("bulk data update success")
    }
    else {
        res.status(501).send("invalid data")
    }

}

module.exports.deleteUser = (req, res, next) => {
    const params = req.params.id;
    const existing = JSON.parse(data)
    const findId = existing.find(data => data.id === Number(params))
    if (findId) {
        const checkedId = existing.filter(data => data.id !== Number(params))
        const newobj = JSON.stringify(checkedId)
        fs.writeFileSync("user.json", newobj)
        res.json("delete success")
    }
    else {

        res.status(502).send('No id found');
    }


}


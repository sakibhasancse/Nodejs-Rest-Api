exports.success = (res, message, data) => {
    const resdata = {

        success: true,
        message,
        data

    }
    return res.status(200).json(resdata)
}

exports.errorResponse = (res, message) => {
    const resdata = {

        success: false,
        message,
    }
    return res.status(500).json(resdata)
}


exports.notFound = (res, message) => {
    const resdata = {

        success: false,
        message,
    }
    return res.status(404).json(resdata)
}

exports.validationError = (res, message) => {
    const resdata = {

        success: false,
        message,
    }
    return res.status(400).json(resdata)
}
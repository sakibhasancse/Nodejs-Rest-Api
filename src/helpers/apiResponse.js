exports.success = (res, message) => {
    const resdata = {

        success: true,
        message,


    }
    return res.status(200).json(resdata)
}

exports.successWithData = (res, message, data) => {
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
        message
    }
    return res.status(400).json(resdata)
}
exports.validationErrorWithData = (res, message, errors) => {
    let array = []
    errors.forEach(e => array.push(e.msg))
    const resdata = {

        success: false,
        message,
        error: array
    }
    return res.status(400).json(resdata)
}
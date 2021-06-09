exports.handler = async (event, context, callback) => {
    const subject = event.queryStringParameters.name || 'World'
    callback(null, {
        statusCode: 200,
        body: `Hello, ${subject}`
    })
}
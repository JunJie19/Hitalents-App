const s3Client = {
    // prod: {
    //     // key & access for IAM users: nodeapp.fs3.user
    //     accessKeyId: 'AKIA2QPN3HU6MOFF7ENN',
    //     secretAccessKey: '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',
    //     region: 'eu-west-2' // region eu-west-2c not available
    // },
    // dev: {
    //     // key & access for IAM users: nodeapp.fs3.user
    //     accessKeyId: 'AKIA2QPN3HU6MOFF7ENN',
    //     secretAccessKey: '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',
    //     region: 'eu-west-2' // region eu-west-2c not available
    // }
}

const bucket = {
    prod: 'expert.cv',
    dev: 'expert.cv'
}

module.exports = {
    s3Client,
    bucket
}
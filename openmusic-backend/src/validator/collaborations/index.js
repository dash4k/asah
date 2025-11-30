const InvariantError = require('../../exceptions/InvariantError');
const {
    PostCollaborationPayloadSchema,
    DeleteCollaborationPayloadSchema,
} = require('./schema');

const CollaborationsValidator = {
    validatePostCollaboratorPayload: (payload) => {
        const validationResult = PostCollaborationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateDeleteCollaboratorPayload: (payload) => {
        const validationResult = DeleteCollaborationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
}

module.exports = CollaborationsValidator;

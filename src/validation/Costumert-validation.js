import Joi from "joi";

const createCostumertValidation = Joi.object({
    name: Joi.string().max(100).required(),
    nikname: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
});

const getCostumertValidation = Joi.number().positive().required();

const updateCostumertValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    nikname: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
});

const searchCostumertValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    nikname: Joi.string().max(100).optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
})

export {
    createCostumertValidation,
    getCostumertValidation,
    updateCostumertValidation,
    searchCostumertValidation
}

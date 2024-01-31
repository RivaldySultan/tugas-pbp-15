import {validate} from "../validation/validation.js";
import {
    createCostumertValidation,
    getCostumertValidation, searchCostumertValidation,
    updateCostumertValidation
} from "../validation/Costumert-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const Costumert = validate(createCostumertValidation, request);
    Costumert.username = user.username;

    return prismaClient.costumert.create({
        data: Costumert,
        select: {
            id: true,
            name: true,
            nikname: true,
            email: true,
            phone: true
        }
    });
}

const get = async (user, CostumertId) => {
    CostumertId = validate(getCostumertValidation, CostumertId);

    const Costumert = await prismaClient.costumert.findFirst({
        where: {
            username: user.username,
            id: CostumertId
        },
        select: {
            name: true,
            nikname: true,
            email: true,
            phone: true
        }
    });

    if (!Costumert) {
        throw new ResponseError(404, "Costumert is not found");
    }

    return Costumert;
}

const update = async (user, request) => {
    const Costumert = validate(updateCostumertValidation, request);

    const totalCostumertInDatabase = await prismaClient.costumert.count({
        where: {
            username: user.username,
            id: Costumert.id
        }
    });

    if (totalCostumertInDatabase !== 1) {
        throw new ResponseError(404, "Costumert is not found");
    }

    return prismaClient.costumert.update({
        where: {
            id: Costumert.id
        },
        data: {
            name: Costumert.name,
            nikname: Costumert.nikname,
            email: Costumert.email,
            phone: Costumert.phone,
        },
        select: {
            id: true,
            name: true,
            nikname: true,
            email: true,
            phone: true
        }
    })
}

const remove = async (user, CostumertId) => {
    CostumertId = validate(getCostumertValidation, CostumertId);

    const totalInDatabase = await prismaClient.costumert.count({
        where: {
            username: user.username,
            id: CostumertId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Costumert is not found");
    }

    return prismaClient.costumert.delete({
        where: {
            id: CostumertId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchCostumertValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }

    const Costumerts = await prismaClient.costumert.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.costumert.count({
        where: {
            AND: filters
        }
    });

    return {
        data: Costumerts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}

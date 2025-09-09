"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wine_reviews_service_1 = require("./wine-reviews.service");
const create_wine_dto_1 = require("./dto/create-wine.dto");
let WineController = class WineController {
    wineService;
    constructor(wineService) {
        this.wineService = wineService;
    }
    create(createWineDto) {
        return this.wineService.create(createWineDto);
    }
    findAll(filterDto) {
        return this.wineService.findAll(filterDto);
    }
    getStats() {
        return this.wineService.getStats();
    }
    getCountriesStats() {
        return this.wineService.getCountriesStats();
    }
    getVarietiesStats() {
        return this.wineService.getVarietiesStats();
    }
    getTopRatedWines(limit = '10') {
        return this.wineService.getTopRatedWines(parseInt(limit));
    }
    findOne(id) {
        return this.wineService.findOne(id);
    }
    update(id, updateWineDto) {
        return this.wineService.update(id, updateWineDto);
    }
    remove(id) {
        return this.wineService.remove(id);
    }
};
exports.WineController = WineController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new wine review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Wine review created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wine_dto_1.CreateWineDto]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all wine reviews with filters and pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of wine reviews' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wine_dto_1.FilterWineDto]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get general statistics about wines' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'General wine statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WineController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('stats/countries'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics by country' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wine statistics by country' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WineController.prototype, "getCountriesStats", null);
__decorate([
    (0, common_1.Get)('stats/varieties'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics by wine variety' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wine statistics by variety' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WineController.prototype, "getVarietiesStats", null);
__decorate([
    (0, common_1.Get)('top-rated'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top-rated wines' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top-rated wines' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "getTopRatedWines", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a wine review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wine review found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Wine review not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a wine review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wine review updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Wine review not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a wine review' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Wine review deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Wine review not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WineController.prototype, "remove", null);
exports.WineController = WineController = __decorate([
    (0, swagger_1.ApiTags)('wines'),
    (0, common_1.Controller)('wines'),
    __metadata("design:paramtypes", [wine_reviews_service_1.WineService])
], WineController);
//# sourceMappingURL=wine-reviews.controller.js.map
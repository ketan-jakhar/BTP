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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carpool = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Carpool = class Carpool extends _1.BaseResource {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Carpool.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Carpool.prototype, "publisher_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.id, {
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'publisher_id' }),
    __metadata("design:type", _1.User)
], Carpool.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.User, (user) => user.id),
    (0, typeorm_1.JoinTable)({ name: 'carpool_companion_details' }),
    __metadata("design:type", Array)
], Carpool.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Carpool.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Carpool.prototype, "estimated_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Carpool.prototype, "additional_remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Carpool.prototype, "departure_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Carpool.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Carpool.prototype, "rider_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Carpool.prototype, "publisher_rider_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Carpool.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Carpool.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Carpool.prototype, "mapping", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Carpool.prototype, "is_completed", void 0);
Carpool = __decorate([
    (0, typeorm_1.Entity)('carpool_details')
], Carpool);
exports.Carpool = Carpool;

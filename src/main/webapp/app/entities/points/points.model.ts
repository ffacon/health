import { BaseEntity, User } from './../../shared';

export class Points implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
    ) {
    }
}

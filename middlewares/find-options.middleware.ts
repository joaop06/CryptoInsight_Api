import { FindDto } from '../dto/find.dto';
import { Response, Request, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

interface CustomRequest<T> extends Request {
    optionsQuery?: FindDto<T>
}

@Injectable()
export class FindOptionsMiddleware<T> implements NestMiddleware {
    use(req: CustomRequest<T>, res: Response, next: NextFunction) {
        try {
            req.optionsQuery = new FindDto<T>(req.query);
            next();

        } catch (e) {
            next(e);
        }
    }
}
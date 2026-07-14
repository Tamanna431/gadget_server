import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
export declare const getAllGadgets: (req: Request, res: Response) => Promise<void>;
export declare const getGadgetById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createGadget: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGadget: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyGadgets: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=gadgetController.d.ts.map
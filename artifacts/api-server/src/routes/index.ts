import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import submissionsRouter from "./submissions";
import productsRouter from "./products";
import recommendationsRouter from "./recommendations";
import cartRouter from "./cart";
import contactRouter from "./contact";
import faqsRouter from "./faqs";
import retailersRouter from "./retailers";
import brandsRouter from "./brands";
import checkoutRouter from "./checkout";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(submissionsRouter);
router.use(productsRouter);
router.use(recommendationsRouter);
router.use(cartRouter);
router.use(contactRouter);
router.use(faqsRouter);
router.use(retailersRouter);
router.use(brandsRouter);
router.use(checkoutRouter);

export default router;

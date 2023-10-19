import categoryRouter from "./category/category.router.js";
import subcategoryRouter from "./subcategory/subCategory.router.js";
import brandRouter from "./brand/brand.router.js";
import productRouter from "./product/product.router.js";
import userRouter from "./user/user.router.js";
import authRouter from "./auth/auth.router.js";
import reviewRouter from "./review/review.router.js";
import wishListRouter from "./wishlist/wishlist.router.js";
import addressRouter from "./address/address.router.js";
import { HttpStatus } from "../../enums/httpStatus.js";
import cartRouter from "./cart/cart.router.js";
import { AppError } from "../../utils/appError.js";

export function init(app) {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subCategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/cart", cartRouter);

  app.all("*", (req, res, next) => {
    next(
      new AppError(
        `can't find this route ${req.originalUrl}`,
        HttpStatus.NotFound
      )
    );
  });
}

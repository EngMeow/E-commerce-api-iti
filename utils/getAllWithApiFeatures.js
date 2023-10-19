import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ApiFeature } from "./AppFeatures.js";

export const getAllWithApiFeatures = (Model) =>
  catchAsyncError(async (req, res) => {
    const apiFeatures = new ApiFeature(Model.find(), req.query)
      .paginate()
      .fields()
      .filter()
      .sort()
      .search();

    const result = await apiFeatures.query;
    res.json({ message: "Success", page: apiFeatures.page, result });
  });

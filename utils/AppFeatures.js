export class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.query = mongooseQuery;
    this.queryString = queryString;
  }

  paginate() {
    let page = parseInt(this.queryString.page) || 1;
    if (page <= 0) {
      page = 1;
    }
    this.page = page;
    const skip = (page - 1) * 5;
    this.query.skip(skip).limit(5);
    return this;
  }

  filter() {
    const filters = { ...this.queryString };
    const excludedFields = ["page", "sort", "fields", "keyword"];

    excludedFields.forEach((field) => {
      delete filters[field];
    });

    const filterString = JSON.stringify(filters);
    const filterObject = JSON.parse(
      filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    this.query.find(filterObject);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortFields);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.query.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query.select(selectedFields);
    }
    return this;
  }
}

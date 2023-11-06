class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //1) filtering
    const queryObj = { ...this.queryString };
    const excludeFields = ["sort", "limit", "field", "page"];
    excludeFields.forEach((field) => delete queryObj[field]);

    //2) Advance filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.queryquery.sort(sortBy);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  field() {
    if (this.queryString.field) {
      const fieldBy = this.queryString.field.split(",").join(" ");
      this.query.select(fieldBy);
    } else {
      this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

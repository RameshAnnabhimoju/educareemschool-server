import homeItem from "../models/homeItems.model.js";

export const addItem = (request, response) => {
  try {
    const image = request.file;
    const data = { ...request.body, itemImage: image?.path };
    homeItem
      .create(data)
      .then((value) => {
        response.json({
          message: "Item added successfully!",
          data: data,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error?.message);
        response.status(400).json({
          message: error?.message || "Error saving data",
          data: {},
          type: "fail",
        });
      });
  } catch (error) {
    console.log("saveData ", error.message);
    response.status(400).json({ message: error.message });
  }
};

export const getItemsByCategory = (request, response) => {
  try {
    const { category } = request.query;
    homeItem
      .findAll({ category })
      .then((value) => {
        response.json({
          message: "Items fetched successfully!",
          data: value,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error?.message);
        response.status(400).json({
          message: error?.message || "Error fetching data",
          data: {},
          type: "fail",
        });
      });
  } catch (error) {
    console.log("Fetch Data ", error.message);
    response.status(400).json({ message: error.message });
  }
};

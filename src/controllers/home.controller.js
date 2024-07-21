import homeItem from "../models/homeItems.model.js";
export const home = (request, response) => {
  response.send("Welcome to educare em school");
};
export const getHomeId = (request, response) => {
  const id = request.params.id;
  if (!!id && id == "100") {
    return response.json({ message: "Got the correct ID" });
  }
  response.status(400).send("got the wrong ID");
};
export const paylod = (request, response) => {
  try {
    const { id } = request.body;
    if (!!id && id === "200") {
      return response.json({ message: "got the payload" });
    }
    response.json({ message: "invalid payload" });
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: error.message });
  }
};

export const saveData = (request, response) => {
  try {
    const { message } = request.body;
    const image = request.file;
    if (!!message && !!image && !!image?.path) {
      return response.json({
        status: "Got the data successfully",
        message: message,
        file: image,
      });
    }
    response.json({ message: "error while uploading image" });
  } catch (error) {
    console.log("saveData ", error.message);
    response.status(400).json({ message: error.message });
  }
};

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

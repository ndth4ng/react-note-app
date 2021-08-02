export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://ndth4ng-learnit.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";
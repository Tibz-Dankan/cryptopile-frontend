export const log = (value) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log(value);
  }
};

const base = {
  api: "",
};
if (process.env.NODE_ENV === "production") {
  base.api = "https://client.elevenscore.com/api/football";
} else {
  base.api = "https://client.elevenscore.com/api/football";
}
export const baseUri = base;

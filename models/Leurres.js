const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  image: { type: String, required: true, match: /^https?:\/\/.+$/i },
  colorName: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
});

const leurreDurSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  marque: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: Number, required: true },
  weight: { type: Number, required: true },
  swimDepth: { type: String, required: true },
  famille: { type: String, required: true },
  colors: { type: [colorSchema], default: [], required: true },
});

module.exports = mongoose.model("LeurreDur", leurreDurSchema);

const leurreMetalliqueSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  marque: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: Number, required: true },
  size: { type: Number, required: true },
  famille: { type: String, required: true },
  colors: { type: [colorSchema], default: [], required: true },
});

module.exports = mongoose.model("LeurreMetallique", leurreMetalliqueSchema);

const leurreSoupleSchema = mongoose.Schema({
  name: { type: String, required: true },
  marque: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  famille: { type: String, required: true },
  colors: { type: [colorSchema], default: [], required: true },
});

module.exports = mongoose.model("LeurreSouple", leurreSoupleSchema);

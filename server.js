const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require('./routes/apiRoutes');
// Testing port will be 5000
const PORT = process.env.PORT || 5000;

// Initialize express server
const app = express();
// cors
// app.use(cors({ origin: "*" }));

// Serve static files from public
// app.use(express.static("public"));

app.use("/", htmlRoutes);
// app.use('/api', apiRoutes);

// EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

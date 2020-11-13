import html_to_pdf from "html-pdf-node";

import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 3000;

const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
    );

    html_to_pdf
      .generatePdf(
        { content: html },
        {
          format: "Letter",
          printBackground: true,
        }
      )
      .then((buffer) =>
        fs.promises.writeFile(path.join(__dirname, "data.pdf"), buffer)
      );

    return res.send(html);
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on http://localhost:${PORT}`);
});
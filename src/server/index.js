import React from "react";
import App from "./src/App";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import express from "express";
import html_to_pdf from 'html-pdf-node';
import fs from 'fs';
import path from 'path';

function renderFullPage(meta, html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    ${meta}
      <style id="jss-server-side">
    ${css}
    body {
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      }
    </style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

const app = express();

app.use(express.static("public"));

app.get("**", (req, res) => {

  const sheets = new ServerStyleSheets();

  const context = {};
  const meta = `
  <title>Hello this is meta</title> 
  `;
  const app = renderToStaticMarkup(
    sheets.collect(
      <ThemeProvider>
        {/* <StaticRouter location={req.url} context={context}> */}
        <App />
        {/* </StaticRouter> */}
      </ThemeProvider>
    )
  );

  const css = sheets.toString();
  const renderedData = renderFullPage(meta, app, css);

  html_to_pdf
  .generatePdf(
    { content: renderedData },
    {
      format: "Letter",
      printBackground: true,
    }
  )
  .then((buffer) =>
    fs.promises.writeFile(path.join(__dirname, "data.pdf"), buffer)
  );

  return res.send(renderedData);
});

app.listen(3000, () => console.log("Exapmple app started!"));

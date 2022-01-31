exports.html = text => {
  return `
    <!doctype html>
      <html>
        <head>
          <title>qr4fun</title>
          <meta charset="UTF-8">
          <style>
            html, body {
            margin: 0;
            height: 100%;
            overflow: hidden
            }
            * {
              box-sizing: border-box;
              padding: 0 12px;
            }
            .text {
              margin: calc(100vh/2) auto;
              width: 100%;
              font-size: 48px;
              text-align: center;
              overflow-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="text">
            <h1>${text}</h1>
          </div>
        </body>
    </html>
  `
}

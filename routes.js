const fs = require("fs");


const requestHandler = (req, res) => {
  const method = req.method;
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>First nodejs page with routing</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input name='message' type='text'> <button type='submit'>Submit</button></form> </body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("NewHello1.txt", message, (err) => {
        res.writeHead(302, { Location: "/" });
        // res.statusCode = 302;
        // res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write("<html>");
  res.write("<head><title>First nodejs page</title></head>");
  res.write("<body><h1>This is first html page written in nodejs</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
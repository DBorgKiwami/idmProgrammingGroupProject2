class TestController {
  async getPostData(req, res) {
    console.log(req.body.title)

    res.render("testpost/", {
    });
  }
}

module.exports = new TestController();
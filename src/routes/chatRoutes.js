import express from 'express'

const chatRouter = express.Router()

chatRouter.get("/", async (req, res) => {
  return res.render('chat', {})
});

export default chatRouter;
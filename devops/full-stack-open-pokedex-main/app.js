/* eslint-disable no-undef */
const express = require('express')
const app = express()


const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('1')
})

app.get('/tp', (req, res) => {
  res.send('Test app working...!!!')
})

app.get('/health', (req, res) => {
  // eslint-disable-next-line no-constant-condition
  res.send('ok')
})

app.listen(PORT, () => {
  // console.log(`server started on port ${PORT}`);
})
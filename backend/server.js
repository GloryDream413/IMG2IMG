const express = require('express')
const app = express()
const port = 7777
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

async function getPredictionStatus (id) {
  const response = await axios.get(
    'https://api.replicate.com/v1/predictions/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token 57b5717e8632693a79f0747038512564a640764c`
      }
    }
  )
  const prediction = response.data
  return prediction
}

async function createPrediction (image, text) {
  const image_original = image.replace('blob:', 'uri:');
  const image_mask = URL.createObjectURL("./mask_image");
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '5deb8e4d829cba7939dde1640cc4e4e0d4ba460bd1645895133406f4922a20f8',
      input: { image : image_original, prompt: text, mask_image : image_mask,
      n_predictions:1 }
    },
    {
      headers: {
        Authorization: `Token r8_0Jmnu7vefvCDRiRVtsAGKYwKdgfBhPe4GzWfV`,
        'Content-Type': 'application/json'
      }
    }
  )
  const prediction = response.data
  return prediction
}

app.post('/getImage', async (req, res) => {
  let image = req.body.image
  let prompt = req.body.prompt

  const prediction = await createPrediction(image, prompt)
  let response = null
  let nCount = 0
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(1000)
    nCount++
    if (nCount >= 60) {
      break
    }
    response = await getPredictionStatus(prediction.id)
    if (response.err || response.output) {
      break
    }
  }

  if (response.output) {
    return res.status(200).send({ response: response })
  } else {
    return res.status(201).send({ response: 'fail' })
  }
})

app.listen(port, () => {
  console.log(`connected on port ${port}`)
})

module.exports = app

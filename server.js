const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { url, api } = require('./lightning-variables')
const charge = require('lightning-charge-client')(url, api)
const requestIp = require('request-ip');
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')));

app.post('/createInvoice', async (req, res, next) => {
  let invoice = await charge.invoice({
    msatoshi: 100000,
    description: `Lightning Wifi - 1 Hour Access`
  });
  return res.json({ data: invoice });
});

app.get('/fetchInvoice/:id/wait', async (req, res, next) => {
  let invoice = req.params.id;
  const { authaction, redir, tok } = req.query;
  const paid = null;
  // const clientIp = requestIp.getClientIp(req);
  try {
    const paid = await charge.wait(
      invoice,
      600 /* timeout in seconds */
    );
    do {
      if (paid) {
        if (authaction && tok && redir) {
          handleAuthentication(authaction, tok, redir, (status) => {
            if (status === 200) {
              return res.json({ success: true, data: 'Success. You are now connected to the internet!' });
            }
            else {
              return res.json({ success: false, data: 'Error Authenticating with Captive Portal Software' })
            }
          });

        } else {
          return res.json({ success: true, data: 'Success. Demo payment was received!' });
        }
      }
      else if (paid === false) {
        return res.json({ success: false, data: 'Invoice expired and can no longer be paid. Please try again.' });
      }
      else if (paid === null) {
        return res.json({ success: false, data: 'Timeout reached without payment. Please try again.' });
      }
    } while (paid === null);
  } catch (error) {
    console.error(error);
  }
});


async function handleAuthentication(authaction, tok, redir, callback) {

  try {
    const response = await axios.get(`${authaction}&tok=${tok}&redir=${redir}`);
    callback(response.status);
  } catch (error) {
  }
}

app.listen(3000, function () {
  console.log('Listening on port: ' + 3000);
});
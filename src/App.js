import React, { Component } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { Jumbotron, Button, Modal, Alert, InputGroup, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './App.css';

const queryString = require('query-string');
var QRCode = require('qrcode.react');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQr: false,
      invoice: null,
      showNode: false
    }
  }


  copyText = (text) => {
    copy(text);
  }

  // componentDidMount = () => {

  // }

  authorizeUser = () => {
    const { authaction, tok, redir } = queryString.parse(this.props.location.search);
    axios.get(
      `${authaction}&tok=${tok}&redir=${redir}`, { crossdomain: true })
      .then((response) => {
        console.log('response: ', response)
      })
      .catch((error) => {
        console.log('error: ', error)
      });
  }

  waitForPayment = (invoiceId) => {
    axios.get(
      `http://localhost:3001/fetchInvoice/${invoiceId}/wait`)
      .then((response) => {
        console.log('success')
        this.authorizeUser();
      })
      .catch((error) => {

      });
  }

  generateInvoice = () => {
    axios.post('http://localhost:3001/createInvoice')
      .then((response) => {
        console.log(response.data.data.payreq);
        this.setState({
          showQr: true,
          invoice: response.data.data.payreq
        });
        this.waitForPayment(response.data.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron className="jumbotron-ctn">
          <h1>Lightning Wifi Portal</h1>
          <p>
            Pay 100 sats for 1 hour of Wifi Access
          </p>
          <p>
            <Button variant="primary" onClick={this.generateInvoice}>Generate Invoice</Button>
          </p>
          {!this.state.showNode && <Button variant="primary" onClick={() => this.setState({ showNode: true })}>Open a Direct Channel</Button>}
          <>
            <Alert show={this.state.showNode}>
              <Alert.Heading>Node Information:</Alert.Heading>
              <div className="qr-ctn">
                <QRCode size={200} value="033ee894cc60f0b496761ea2e22452a21dd4f117d41522f7401da00994a2173766@172.81.178.191:9735" />

                <div className="input-ctn">
                  <InputGroup className="mb-3">
                    <FormControl placeholder="033ee894cc60f0b496761ea2e22452a21dd4f117d41522f7401da00994a2173766@172.81.178.191:9735" />
                    <InputGroup.Append>
                      <OverlayTrigger
                        trigger="click"
                        delay={{ show: 250, hide: 400 }}
                        placement="right"
                        overlay={<Tooltip id={`tooltip-right`}>Copied!</Tooltip>}
                      >
                        <InputGroup.Text onClick={this.copyText.bind(this, '033ee894cc60f0b496761ea2e22452a21dd4f117d41522f7401da00994a2173766@172.81.178.191:9735')}>Copy</InputGroup.Text>
                      </OverlayTrigger>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={() => this.setState({ showNode: false })}>Close</Button>
              </div>
            </Alert>
          </>
        </Jumbotron>

        <Modal show={this.state.showQr} onHide={() => this.setState({ showQr: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Lightning Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="qr-ctn">
              <QRCode size={200} value={this.state.invoice} />

              <div className="input-ctn">
                <InputGroup className="mb-3">
                  <FormControl placeholder={this.state.invoice} />
                  <InputGroup.Append>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id={`tooltip-right`}>Copied!</Tooltip>}
                    >
                      <InputGroup.Text onClick={this.copyText.bind(this, this.state.invoice)}>Copy</InputGroup.Text>
                    </OverlayTrigger>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;

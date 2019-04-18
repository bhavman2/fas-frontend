import React, { Component } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { Jumbotron, Button, Alert } from 'react-bootstrap';
import InvoiceModal from '../Modal/InvoiceModal';
import NodeAlert from '../Alert/NodeAlert';
import SuccessModal from '../Modal/SuccessModal';
import './App.css';

const queryString = require('query-string');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQr: false,
      invoice: null,
      showNode: false,
      demoAlert: false,
      showSuccess: false,
      message: '',
      authaction: '',
      tok: '',
      redir: ''
    }
  }

  componentDidMount = () => {
    const { authaction, tok, redir } = queryString.parse(this.props.location.search);
    if (!authaction && !tok && !redir) {
      this.setState({ demoAlert: true });
    } else {
      this.setState({
        tok, redir, authaction
      })
    }
  }

  copyText = (text) => {
    copy(text);
  }

  authorizeUser = (res) => {
    if (!res.data.success) {
      this.setState({
        showQr: false,
        showSuccess: true,
        message: res.data.data
      });
    } else {
      this.setState({
        showQr: false,
        showSuccess: true,
        message: res.data.data
      });
    }
  }

  waitForPayment = (invoiceId) => {
    axios.get(
      `/fetchInvoice/${invoiceId}/wait?authaction=${this.state.authaction}&tok=${this.state.tok}&redir=${this.state.redir}`
    )
      .then((res) => {
        this.authorizeUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  generateInvoice = () => {
    axios.post('/createInvoice')
      .then((res) => {
        this.setState({
          showQr: true,
          invoice: res.data.data.payreq
        });
        this.waitForPayment(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeQr = () => this.setState({ showQr: false });
  closeNode = () => this.setState({ showNode: false });
  closeSuccess = () => this.setState({ showSuccess: false });

  render() {
    return (
      <div className="App">
        {this.state.demoAlert &&
          <Alert className="demo-alert-ctn" variant="warning">
            You were not redirected from the Lightning Wifi Captive Portal, any payments sent will only be for demo purposes and are non-refundable
          </Alert>}
        <Jumbotron className="jumbotron-ctn">
          <h1><span role="img" aria-label="HighVoltage">⚡</span> Lightning Wifi Portal</h1>
          <p>
            Pay 100 sats for 1 hour of Wifi Access
          </p>
          <p>
            <Button variant="primary" onClick={this.generateInvoice}>Generate Invoice</Button>
          </p>
          {!this.state.showNode &&
            <Button variant="primary" onClick={() => this.setState({ showNode: true })}>
              Open a Direct Channel
          </Button>}
          <NodeAlert showNode={this.state.showNode} copyText={this.copyText} closeNode={this.closeNode} />
          <InvoiceModal showQr={this.state.showQr} invoice={this.state.invoice} copyText={this.copyText} closeQr={this.closeQr} />
          <SuccessModal message={this.state.message} showSuccess={this.state.showSuccess} closeSuccess={this.closeSuccess} />
        </Jumbotron>
      </div>
    );
  }
}

export default App;

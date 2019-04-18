import React from 'react';
import { Modal, InputGroup, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';
var QRCode = require('qrcode.react');

const InvoiceModal = (props) => {
  return (
    <Modal show={props.showQr} onHide={props.closeQr}>
      <Modal.Header closeButton>
        <Modal.Title>Lightning Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="qr-ctn">
          <QRCode size={200} value={props.invoice} />
          <div className="input-ctn">
            <InputGroup className="mb-3">
              <FormControl placeholder={props.invoice} />
              <InputGroup.Append>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id={`tooltip-right`}>Copied!</Tooltip>}
                >
                  <InputGroup.Text onClick={props.copyText.bind(this, props.invoice)}>Copy</InputGroup.Text>
                </OverlayTrigger>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

}
export default InvoiceModal;
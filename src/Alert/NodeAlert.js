import React from 'react';
import { Button, Alert, InputGroup, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';
var QRCode = require('qrcode.react');

function NodeAlert(props) {
  return (
    <Alert show={props.showNode}>
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
                <InputGroup.Text onClick={props.copyText.bind(this, '033ee894cc60f0b496761ea2e22452a21dd4f117d41522f7401da00994a2173766@172.81.178.191:9735')}>Copy</InputGroup.Text>
              </OverlayTrigger>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={props.closeNode}>Close</Button>
      </div>
    </Alert>
  );

}
export default NodeAlert;
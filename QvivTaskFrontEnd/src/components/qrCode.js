import React from 'react';
import QRCode from 'qrcode.react';

const Qr = ({ userProfileURL }) => {

    // console.log("userProfileUrl->",userProfileURL);
  return (
    <div className="qr-code">
      <QRCode value={userProfileURL} />
    </div>
  );
};

export default Qr;

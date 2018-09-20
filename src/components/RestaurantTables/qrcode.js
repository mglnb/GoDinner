import React from "react";

const RestaurantTableQRCode = ({ match }) => (
    <div class="qrcode">
        <h1 class="qrcode__title">
            Imprima este QR Code e cole na mesa número: {match.params.id}
        </h1>
        <img src={sessionStorage.getItem('base64')} />
    </div>
);

export default RestaurantTableQRCode;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import mystore from './redux/store';
import { ToastContainer } from 'react-toastify';
import { css } from "@emotion/core";
import { ClipLoader } from 'react-spinners';
const override = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	zindex: 10000;
`;
window.store=mystore;
ReactDOM.render(
    <Provider store={mystore}>
        <ToastContainer />
        <App />
        <div className='loader'>
			<ClipLoader css={override} size={50} color={'#ffc107'} loading={true} />
	    </div>
    </Provider>, 
    document.getElementById('root')
);


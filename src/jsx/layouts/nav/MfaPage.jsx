import React, {useState} from 'react';
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';
import Switch from "react-switch";
import { verification2FaAuth } from '../../../store/actions/AuthActions';
import { mfaEnablePost } from '../../../utils/api';
import base32Decode from 'base32-decode';
import base32Encode from 'base32-encode';
import util from 'util';
import crypto from 'crypto';


function MfaPage(props){
    const dispatch = useDispatch();
    const [mfaEnabled, setMfaEnabled] = useState(props.auth.vendor.mfaEnabled ? true : false);
    const handleMfa = async (e) => {
        setMfaEnabled(!mfaEnabled);
        //makeApi for MFA
        //await mfaEnablePost(mfaEnabled);
        const buffer = await util.promisify(crypto.randomBytes)(14);
        const mfaSecret = props.auth.vendor.mfa ? props.auth.vendor.mfa : base32Encode(buffer, 'RFC4648', { padding: false })

        const payload = {
            mfa:mfaSecret,
            mfaEnabled:!mfaEnabled
        }
        //console.log('pa',payload);
        dispatch(verification2FaAuth(payload, props.history));
    }
    return(
        <div className="align-items-center justify-content-between">
            <label className="mb-0 mr-3">MFA Enabled</label>
            <Switch
                onColor="#B3005E"
                onChange={(e) => {handleMfa(e)}}
                checked={mfaEnabled}
                name="deviceTime"
                id="deviceTime"
                className="react-switch"
            />
        </div>
    )
} 
const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        auth:state.auth.auth
    };
};

export default withRouter(connect(mapStateToProps)(MfaPage));
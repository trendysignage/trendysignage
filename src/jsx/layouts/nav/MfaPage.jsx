import React, {useState} from 'react';
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';
import Switch from "react-switch";
import { verification2FaAuth } from '../../../store/actions/AuthActions';
import { mfaEnablePost } from '../../../utils/api';


function MfaPage(props){
    const dispatch = useDispatch();
    const [mfaEnabled, setMfaEnabled] = useState(false);
    const handleMfa = async (e) => {
        setMfaEnabled(!mfaEnabled);
        //makeApi for MFA
        //await mfaEnablePost(mfaEnabled);
        dispatch(verification2FaAuth(!mfaEnabled, props.history));
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
    };
};

export default withRouter(connect(mapStateToProps)(MfaPage));
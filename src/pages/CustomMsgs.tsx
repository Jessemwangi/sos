import React from 'react';
import CustomTextView from '../Components/CustomTextView';
import CustomTextEntryForm from '../Registration/CustomTextForm';
import { connect } from 'react-redux';

type Props = {
    reload: boolean
}


const CustomMsgs = ({ reload }: Props) => {
    //For managing custom messages


    return (
        <div style={{ padding: '2rem' }}>
            <CustomTextView />
            <CustomTextEntryForm />
        </div>
    );

};
const mapStateToProps = function (state: any) {
    return {
        customText: state.customText.customText,
        reload: state.customText.reload
    }
}
export default connect(mapStateToProps)(CustomMsgs);
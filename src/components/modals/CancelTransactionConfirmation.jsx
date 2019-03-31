import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import numeral from 'numeral';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import baseHoc from './hoc';
import {execApiAction} from "../../actions/base";
import auth from "../../config/api/endpoints";


class CancelTransactionConfirmation extends Component {

    requestObject() {
        const playerId = this.props.currentUser.playerId;

        return {
            "ActionName": "BitGlu.Slots2.Actions.POS.GetCancelTransactionDetails",
            "InParameters": {
                "PlayerId": playerId
            }
        };
    }

    requestHeaders() {
        const data = JSON.parse(localStorage.getItem("authToken"));
        const token = data.token.access_token;

        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.loadStateFromServer();
    }

    onAgreeWrapper(onAgree) {
        return () => onAgree(this.state.transactionId);
    }

    loadStateFromServer() {

        if (this.state.isLoading) {
            return;
        }


        this.state.isLoading = true;

        fetch(auth.actions.execute, {
            method: 'POST',
            headers: this.requestHeaders(),
            body: JSON.stringify(this.requestObject())
        })
            .then(response => response.json())
            .then(obj => {
                if (obj && obj.outParameters && obj.outParameters.cantCancel) {
                    this.state.cantCancel = true;
                    this.state.messageColor = 'warning';
                    this.state.explanation = obj.outParameters.cantCancel;

                } else if (!obj || (obj.outParameters && obj.outParameters.failure)) {
                    this.state.cantCancel = true;
                    this.state.messageColor = 'danger';
                    this.state.explanation = 'Unexpected error while canceling transaction. Please contact your administrator.';

                } else {
                    const t = obj.outParameters.transaction;
                    const amount = parseInt(t.amount);
                    const comps = parseInt(t.compAmount);
                    const timestamp = new Date(t.timestamp).toLocaleString();
                    const total = amount + comps;
                    const transactionId = t.entityId;

                    this.state.cantCancel = false;
                    this.state.messageColor = 'primary';
                    this.state.explanation = 'Upon confirmation, the below transaction will be canceled; The customer\'s entries will be reduced by ' + total + ', and a new transaction will be created to record the cancel operation. Details of canceled transaction:'
                    this.state.transactionTime = timestamp;
                    this.state.transactionAmount = amount;
                    this.state.transactionComps = comps;
                    this.state.transactionId = transactionId;
                }
                this.state.isLoading = false;
                this.forceUpdate();
            })
            .catch(err => {
                this.state.cantCancel = true;
                this.state.messageColor = 'danger';
                this.state.explanation = 'Unexpected GUI error while canceling transaction. Please contact your administrator.';
                console.warn("Failed to fetch data for cancel transaction " + err);
                this.state.isLoading = false;
                this.forceUpdate();
            });
    }

    render() {
        return this.state.isLoading
                ? this.loadingPage()
                : this.mainPage();
    }

    loadingPage() {
        return <CustomCard
            mainClass="mb-0"
            header={{
                title: "Cancel Transaction",
                class: "justify-content-between"
            }}
        >
            <Alert color='primary' className="m-3">
                <h1>Loading...</h1>
            </Alert>
        </CustomCard>

    }

    closeButton() {
        const { onRefuse } = this.props;
        return <div className="text-center">
            <Button
                color="light"
                type="button"
                onClick={onRefuse}
                size="lg"
                className="py-4 px-5 mr-5 mobile_mr-3"
            >
                Close
            </Button>
        </div>
    }

    mainPage() {
        const { onRefuse, onAgree } = this.props;
        return <CustomCard
            mainClass="mb-0"
            header={{
                title: "Cancel Transaction",
                class: "justify-content-between"
            }}
        >
            <Alert color={this.state.messageColor} className="m-3">
                <h1>Cancel Transaction</h1>
                <p className="text-left">{this.state.explanation}</p>
                {this.state.cantCancel
                    ? this.closeButton()
                    : <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>Time</td>
                                <td>{this.state.transactionTime}</td>
                            </tr>
                            <tr>
                                <td>Amount</td>
                                <td>{this.state.transactionAmount}</td>
                            </tr>
                            <tr>
                                <td>Comps Amount</td>
                                <td>{this.state.transactionComps}</td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td><strong>{this.state.transactionAmount + this.state.transactionComps}</strong></td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="text-center">Are you sure you want to cancel this transaction?</p>
                        <p className="text-center"><strong>Once you click "Yes", you cannot undo this operation.</strong></p>
                        <div className="text-center">
                            <Button
                                color="light"
                                type="button"
                                onClick={onRefuse}
                                size="lg"
                                className="py-4 px-5 mr-5 mobile_mr-3"
                            >
                                No
                            </Button>
                            <Button
                                color="primary"
                                type="button"
                                onClick={this.onAgreeWrapper(onAgree)}
                                size="lg"
                                className="py-4 px-5"
                            >
                                Yes
                            </Button>
                        </div>
                    </div>}
            </Alert>
        </CustomCard>
    }
}

export default baseHoc(CancelTransactionConfirmation);
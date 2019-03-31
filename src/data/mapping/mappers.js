import interfaces from './interfaces';
import map from 'object-mapper';

export default {
  [interfaces.iAuthSignInDto]: m => map(m, {
    "client": "client_id",
    "username": "username",
    "password": "password",
    "grantType": "grant_type"
  }),

  [interfaces.iExecuteActionRequestDto]: m => map(m, {
    "action": "ActionName",
    "params": "InParameters"
  }),

  [interfaces.iGetUserActionParamsDto]: m => map(m, {
    "playerNum": "PlayerNum"
  }),

  [interfaces.iCreateUserActionParamsDto]: m => map(m, {
    "password": "Password",
    "email": "Email",
    "phoneNum": "PhoneNum",
    "firstName": "FirstName",
    "lastName": "LastName" ,
    "driverLicense": "DLicense"
  }),

  [interfaces.iUpdateUserActionParamsDto]: m => map(m, {
    "playerNum": "PlayerNum",
    "password": "Password",
    "email": "Email",
    "phoneNum": "PhoneNum",
    "firstName": "FirstName",
    "lastName": "LastName" ,
    "driverLicense": "DLicense"
  }),

  [interfaces.iGetUserListActionParamsDto]: m => map(m, {
    "page": "Page",
    "number": "PerPage"
  }),

  [interfaces.iSearchUserActionParamsDto]: m => map(m, {
    term: "Term"
  }),

  [interfaces.iAddBalanceActionParamsDto]: m => map(m, {
    "playerNum": "PlayerNum",
    "amount": "Amount"
  }),

  [interfaces.iRedeemBalanceActionParamsDto]: m => map(m, {
    "playerNum": "PlayerNum",
    "amount": "Amount"
  }),

  [interfaces.iActionResponseModelDto]: m => map(m, {
    "data.outParameters.Response": "data"
  }),

  [interfaces.iCreateCachierActionParamsDto]: m => map(m, {
    "password": "Password",
    "username": "Username",
    "cachierName": "Label"
  }),

  [interfaces.iUpdateCachierActionParamsDto]: m => map(m, {
    "password": "Password",
    "username": "Username",
    "cachierName": "Label"
  }),

  [interfaces.iGetEmployeeActionParamsDto]: m=> map(m, {
    "username": "Username"
  }),

  [interfaces.iGetCachierListActionParamsDto]: m=> map(m, {
    "page":"Page",
    "number": "PerPage"
  }),

  [interfaces.iSearchCachiersActionParamsDto]: m=> map(m, {
    "term":"Term"
  }),

  [interfaces.iGetAdminSumActionParamsDto]: m=> map(m, {
    "from":"From",
    "to":"To"
  }),
  [interfaces.iGetCashierSumActionParamsDto]: m=> map(m, {
    "from":"From",
    "to":"To"
  }),
  [interfaces.iGetAdminTransactionsParamsDto]: m=> map(m, {
    "from":"From",
    "to":"To",
    "page": "Page",
    "number": "PerPage"
  }),
  [interfaces.iGetCashierTransactionsParamsDto]: m=> map(m, {
    "from":"From",
    "to":"To",
    "page": "Page",
    "number": "PerPage"
  }),
  [interfaces.iGetUserTransactionsParamsDto]: m=> map(m, {
    "playerId": "PlayerId",
    "from":"From",
    "to":"To",
    "page": "Page",
    "number": "PerPage"
  }),
  [interfaces.iGetUserGamesParamsDto]: m=> map(m, {
    "playerId": "PlayerId",
    "from":"From",
    "to":"To",
    "page": "Page",
    "number": "PerPage"
  }),
  [interfaces.iAddCompsActionParamsDto]: m=> map(m, {
    "playerNum": "PlayerNum",
    "amount": "Amount",
    "isComps": "IsComps"
  }),
  [interfaces.iAuthRefreshTokenDto]: m => map(m, {
    "client": "client_id",
    "refreshToken":"refresh_token",
    "grantType": "grant_type"
  }),
};
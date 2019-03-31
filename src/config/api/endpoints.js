const nginxPlaceholder = '__' + 'NGINX_REPLACE_ASSEMBLY_VERSION__'; // this value will NOT be replaced by nginx
const beAssemblyVersionConfig = '__NGINX_REPLACE_ASSEMBLY_VERSION__'; // this value will be replaced by nginx
const assemblyVersion = beAssemblyVersionConfig === nginxPlaceholder
  ? ''
  : '?version=' + beAssemblyVersionConfig;

export default {
  auth: {
    //signIn: '/identity/connect/token'
    //signIn: 'https://skyline-qa.bitglu.io:2053/identity/connect/token'
    signIn: 'https://skyline-dev.bitglu.io:8443/identity/connect/token'
  },
  actions:{
    //execute: '/backend/api/Actions/execute' + assemblyVersion
    //execute: 'https://skyline-qa.bitglu.io:2053/api/Actions/execute'
    execute: 'https://skyline-dev.bitglu.io:8443/api/Actions/execute'
  }
};
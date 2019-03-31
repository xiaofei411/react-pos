import mappers from './mappers';

export default {
  resolve: interfaceName => {
    return mappers[interfaceName];
  }
};
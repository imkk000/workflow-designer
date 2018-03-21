import _ from 'lodash';
import stringHash from 'string-hash';

export default () => {
  return _.toString(stringHash(new Date() + _.random(999990, true)));
};

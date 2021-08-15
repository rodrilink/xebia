import { combineReducers } from 'redux';

import topicReducer from '../topic/topic.reducer';

export default combineReducers({
    topic: topicReducer
});

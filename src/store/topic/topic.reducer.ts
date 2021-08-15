import { CHANGE_TOPIC, TopicState, ChangeTopicAction } from './topic.action';

const initialState: TopicState = {
    name: ''
}

const topicReducer = (state = initialState, action: ChangeTopicAction): TopicState => {
    switch (action.type) {
        case CHANGE_TOPIC:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}

export default topicReducer;
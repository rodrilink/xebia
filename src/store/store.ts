import { createStore } from 'redux';
import reducers from './base/reducers';
import { TopicState } from './topic/topic.action';

export interface ApplicationState {
    topic: TopicState
}

export default function configureStore() {
    const store = createStore(
        reducers,
    );

    return store;
}
export const CHANGE_TOPIC = 'CHANGE_TOPIC';

export interface ChangeTopicAction {
    type: typeof CHANGE_TOPIC,
    name: string
}

export interface TopicState {
    name: string
}

export function changeTopic(name: string = ''): ChangeTopicAction {
    return { type: CHANGE_TOPIC, name };
}

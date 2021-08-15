import { createSelector } from 'reselect';
import IStore from '../base/IStore';

const topicState = (state: IStore) => state.topic;

export const selectName = (): any =>
  createSelector(topicState, ({ name }) => name);
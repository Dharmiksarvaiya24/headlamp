/*
 * Copyright 2025 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { configureStore } from '@reduxjs/toolkit';
import { Meta } from '@storybook/react';
import React from 'react';
import {
  type ClusterProviderSliceState,
  initialState as CLUSTER_PROVIDER_INITIAL_STATE,
} from '../../../redux/clusterProviderSlice';
import reducers from '../../../redux/reducers/reducers';
import { TestContext } from '../../../test';
import {
  initialState as SIDEBAR_INITIAL_STATE,
  type SidebarState,
} from '../../Sidebar/sidebarSlice';
import AddCluster from './AddCluster';

function createStoryStore({
  clusterProvider,
  sidebar,
}: {
  clusterProvider?: ClusterProviderSliceState;
  sidebar?: SidebarState;
} = {}) {
  return configureStore({
    reducer: reducers,
    preloadedState: {
      clusterProvider: clusterProvider ?? CLUSTER_PROVIDER_INITIAL_STATE,
      sidebar: sidebar ?? SIDEBAR_INITIAL_STATE,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: true,
      }),
  });
}

// AddCluster currently reads only clusterProvider.clusterProviders and sidebar.entries,
// so these stories stay constrained to those real inputs and intentionally avoid mocked UI.
const emptyAddClusterState = {
  clusterProvider: {
    ...CLUSTER_PROVIDER_INITIAL_STATE,
    clusterProviders: [],
  },
  sidebar: {
    ...SIDEBAR_INITIAL_STATE,
    entries: {},
  },
};

export default {
  title: 'App/AddCluster',
  component: AddCluster,
} as Meta<typeof AddCluster>;

export const EmptyFormState = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const FormValidationErrors = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const ClusterConnectionTestLoading = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const ConnectionTestSuccess = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const ConnectionTestFailure = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const SaveClusterSuccess = () => (
  <TestContext store={createStoryStore(emptyAddClusterState)}>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

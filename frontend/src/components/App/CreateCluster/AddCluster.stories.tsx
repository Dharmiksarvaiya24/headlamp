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

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Meta } from '@storybook/react';
import React from 'react';
import { TestContext } from '../../../test';
import AddCluster from './AddCluster';

type FormStoryState =
  | 'empty'
  | 'validationErrors'
  | 'testLoading'
  | 'testSuccess'
  | 'testFailure'
  | 'saveSuccess';

function AddClusterFormMock({ state }: { state: FormStoryState }) {
  const showValidationErrors = state === 'validationErrors';
  const showLoading = state === 'testLoading';
  const showTestSuccess = state === 'testSuccess';
  const showTestFailure = state === 'testFailure';
  const showSaveSuccess = state === 'saveSuccess';

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">Add Cluster</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure a cluster connection and validate it before saving.
          </Typography>
        </Box>

        {showSaveSuccess && <Alert severity="success">Cluster saved successfully.</Alert>}
        {showTestSuccess && <Alert severity="success">Connection test succeeded.</Alert>}
        {showTestFailure && <Alert severity="error">Connection test failed.</Alert>}
        {showLoading && <Alert severity="info">Testing cluster connection...</Alert>}

        <TextField
          label="Cluster name"
          value={state === 'empty' ? '' : 'demo-cluster'}
          error={showValidationErrors}
          helperText={showValidationErrors ? 'Cluster name is required.' : ' '}
          fullWidth
        />
        <TextField
          label="Server URL"
          value={state === 'empty' ? '' : 'https://demo.example.com'}
          error={showValidationErrors}
          helperText={showValidationErrors ? 'Server URL is required.' : ' '}
          fullWidth
        />
        <TextField
          label="Access token"
          value={state === 'empty' ? '' : '••••••••'}
          fullWidth
          helperText=" "
        />

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" disabled={showLoading}>
            {showLoading ? <CircularProgress size={16} /> : 'Test connection'}
          </Button>
          <Button variant="contained">Save cluster</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default {
  title: 'App/AddCluster',
  component: AddCluster,
} as Meta;

export const LandingPage = () => (
  <TestContext>
    <AddCluster open onChoice={() => {}} />
  </TestContext>
);

export const EmptyFormState = () => <AddClusterFormMock state="empty" />;
export const FormValidationErrors = () => <AddClusterFormMock state="validationErrors" />;
export const ClusterConnectionTestLoading = () => <AddClusterFormMock state="testLoading" />;
export const ConnectionTestSuccess = () => <AddClusterFormMock state="testSuccess" />;
export const ConnectionTestFailure = () => <AddClusterFormMock state="testFailure" />;
export const SaveClusterSuccess = () => <AddClusterFormMock state="saveSuccess" />;

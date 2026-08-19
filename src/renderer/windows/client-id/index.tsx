import { ipcRenderer } from 'electron';
import React, { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components';

import { ApplicationUrl, AUTH_REDIRECT_URI, IpcMessage } from '../../../constants';
import { Input, Row, StyledWindow } from '../../components';
import { StyledTextInput } from '../../components/mantine.styled';
import { WindowHeader } from '../window-header';

const ClientIdWindowWrapper = styled(StyledWindow)`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 0 0.5rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 100%;
`;

const Steps = styled.ol`
  padding-left: 1.25rem;
  margin: 0.5rem 0;
`;

const Step = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const RedirectUri = styled.code`
  background-color: #222222;
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
  word-break: break-all;
`;

const DashboardLink = styled.button`
  color: rgb(214, 146, 255);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
`;

const ClientIdInput = styled(StyledTextInput)`
  width: 100%;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
  margin-top: auto;
`;

interface Props {
  initialValue: string;
  onSave: (clientId: string) => void;
  onClose?: () => void;
}

export const ClientIdWindow: FunctionComponent<Props> = ({ initialValue, onSave, onClose }) => {
  const [clientId, setClientId] = useState(initialValue);

  const openDashboard = useCallback(() => {
    ipcRenderer.send(IpcMessage.OpenLink, ApplicationUrl.SpotifyDashboard);
  }, []);

  const handleSave = useCallback(() => {
    if (clientId.trim()) {
      onSave(clientId.trim());
      onClose?.();
    }
  }, [clientId, onClose, onSave]);

  return (
    <ClientIdWindowWrapper className="client-id-window">
      {onClose ? (
        <WindowHeader title="Spotify Setup" onClose={onClose} />
      ) : (
        <Title className="draggable-window">Connect Lofi to Spotify</Title>
      )}
      <Content>
        <p>Lofi needs a Spotify app Client ID to control playback. This is free and takes about a minute to set up:</p>
        <Steps>
          <Step>
            Open the{' '}
            <DashboardLink type="button" onClick={openDashboard}>
              Spotify Developer Dashboard
            </DashboardLink>{' '}
            and log in with your Spotify account.
          </Step>
          <Step>
            Click <strong>Create app</strong>, give it any name/description, and select the Web API.
          </Step>
          <Step>
            In the app&apos;s <strong>Settings</strong>, add this exact Redirect URI:
            <br />
            <RedirectUri>{AUTH_REDIRECT_URI}</RedirectUri>
          </Step>
          <Step>
            Save the app, then copy its <strong>Client ID</strong> and paste it below.
          </Step>
        </Steps>
        <Row>
          <ClientIdInput
            size="xs"
            placeholder="Spotify Client ID"
            value={clientId}
            onChange={(event) => setClientId(event.currentTarget.value)}
          />
        </Row>
      </Content>
      <ButtonsGroup>
        <Input type="button" value="Save" onClick={handleSave} disabled={!clientId.trim()} />
        {onClose && <Input type="button" value="Cancel" onClick={onClose} />}
      </ButtonsGroup>
    </ClientIdWindowWrapper>
  );
};

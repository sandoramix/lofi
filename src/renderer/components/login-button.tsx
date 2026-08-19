import React, { FunctionComponent, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { getAuthUrl, startAuthServer } from '../../main/auth';

const Link = styled.a`
  margin: auto;
  background-color: black;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transition: transform 0.2s;
  vertical-align: middle;
  font-size: 12px;

  i {
    color: #84bd00;
  }

  &:hover {
    background-color: #222;
    transform: scale(1.05);
    border: 1px solid #000;
  }

  &:active {
    background-color: #000;
    border: 1px solid rgb(65, 65, 65);
  }
`;

const SpotifyLogo = styled.i`
  margin-right: 0.5rem;
`;

interface Props {
  clientId: string;
}

export const LoginButton: FunctionComponent<Props> = ({ clientId }) => {
  const authUrl = useMemo(() => getAuthUrl(clientId), [clientId]);
  const handleClick = useCallback(() => startAuthServer(clientId), [clientId]);

  return (
    <Link className="login-btn" target="auth" href={authUrl} onClick={handleClick}>
      <SpotifyLogo className="fab fa-spotify" />
      <span>Log in</span>
    </Link>
  );
};

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function extractInitials(fullName) {
  const words = fullName?.split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase());
  const result = initials.join('');
  return result;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: extractInitials(name),
  };
}


export default function AvatarWithLetters({ fullName }) {
  return (
    <Avatar {...stringAvatar(fullName)} />
  );
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringToAvatar(name: string) {
  if (!name) {
    name = 'Who the fuck are you?'
  }

  const [first, second] = name.split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 36,
      height: 36,
    },
    children: `${first[0].toUpperCase()}${second?.[0].toUpperCase() || ''}`,
  };
}
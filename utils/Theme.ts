export interface Theme {
  background: {
    primary: string,
    secondary: string
  },
  container: {
    primary: string,
    secondary: string,
    border: string
  },
  font: {
    primary: string,
    secondary: string
  },
  button: {
    primary: string,
    secondary: string
  },
  disabled: string,
  checkbox: string
}

export const light: Theme = {
  background: {
    primary: '#F5FCFF',
    secondary: '#daebf7'
  },
  container: {
    primary: '#fff',
    secondary: '#ffffff',
    border: '222222'
  },
  font: {
    primary: '#222222', // Black
    secondary: '#ffffff' // White
  },
  button: {
    primary: '#0f96f7',
    secondary: '#74c1f7'
  },
  disabled: '#d2d4d3',
  checkbox: '#012138'
};

export const dark: Theme = {
  background: {
    primary: '#222222',
    secondary: '#6e6e6e'
  },
  container: {
    primary: '#6e6e6e',
    secondary: '#ffffff',
    border: 'ffffff'
  },
  font: {
    primary: '#ffffff', // White
    secondary: '#222222' // Black
  },
  button: {
    primary: '#007260',
    secondary: '#39B68D'
  },
  disabled: '#d2d4d3',
  checkbox: '#d3e6f5'
};

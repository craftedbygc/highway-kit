# Highway Kit
Contains files needed to quick start a Highway setup

## Install:
`npm i --save @ashthornton/highway-kit`

You'll be prompted to choose a directory to copy the files to after installation.

Make sure this directory already exists.

## Usage:
```
import H from './highway'

window.addEventListener('DOMContentLoaded', () => {
    new H()
})
```

Where `'./highway` is the directory you chose in the installation process.

Look inside the copied files to see the Highway setup
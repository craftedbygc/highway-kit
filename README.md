# Highway Kit
Contains files needed to quick start a Highway setup

## Features
- Automatic execution of scripts loaded via Highway (with caching)
- Wait for images and videos to load to more finely control when pages are initialised
- "onFirstLoad" renderer function which allows you to run scripts once only on site load
- Promise-based example "PageLoader" animation hooked into the default transtion and renderer
- Change querySelector for selecting links to attach Highway navigate event to

## Install
`npm i --save @ashthornton/highway-kit`

You'll be prompted to choose a directory to copy the files to after installation.

Make sure this directory already exists.

Run the npm install command shown after installation to install the required dependencies.

## Usage
```
import H from './highway'

window.addEventListener('DOMContentLoaded', () => {
    new H()
})
```

Where `'./highway'` is the directory you chose in the installation process.

Look inside the copied files to see the Highway setup.

You will need to apply this to the standard Highway HTML structure.

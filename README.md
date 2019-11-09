# sentence-mosaics

## Initial Setup

1. Ensure you have Xcode installed from the AppStore. 
2. Open terminal. 
3. Type `xcode-select --install`. 
4. Move to where you want to store this project (`cd`).  
5. Type `git clone https://github.com/DFAxCMU/sentence-mosaics.git`
3. Type `cd sentence-mosaics/SentenceMosaics`. 
4. Type `npm install` and wait for a bit! 

## Running 

Type `npm run simulator`!

## Troubleshooting 

![instruments not found](docs/troubleshooting/command_line_tools_failed.png)

Open Xcode. Go to Xcode->Preferences->Locations and select an installation for command line tools. 

![simulator not found](docs/troubleshooting/simulator_not_found.png)

Use `npm run simulator-updated` instead. 

![no dimension set for key window](docs/troubleshooting/no_dimension_set_for_key_window.png)

Close terminal, delete ios/build ('sudo rm -rf ios/build' in the SentenceMosaics directory), then try running again.